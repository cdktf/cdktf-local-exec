# CDKTF Local Exec Construct

![Status: Tech Preview](https://img.shields.io/badge/status-experimental-EAAA32) [![Releases](https://img.shields.io/github/release/cdktf/cdktf-local-exec.svg)](https://github.com/cdktf/cdktf-local-exec/releases)
[![LICENSE](https://img.shields.io/github/license/cdktf/cdktf-local-exec.svg)](https://github.com/cdktf/cdktf-local-exec/blob/main/LICENSE)
[![build](https://github.com/cdktf/cdktf-local-exec/actions/workflows/build.yml/badge.svg)](https://github.com/cdktf/cdktf-local-exec/actions/workflows/build.yml)

A simple construct that executes a command locally. This is useful to run build steps within your CDKTF Program or to run a post action after a resource is created.

_cdktf-local-exec_ is in technical preview, which means it's a community supported project. It still requires extensive testing and polishing to mature into a HashiCorp officially supported project. Please [file issues](https://github.com/cdktf/cdktf-local-exec/issues/new/choose) generously and detail your experience while using the library. We welcome your feedback.

By using the software in this repository, you acknowledge that: 
* _cdktf-local-exec_ is still in development, may change, and has not been released as a commercial product by HashiCorp and is not currently supported in any way by HashiCorp.
* _cdktf-local-exec_ is provided on an "as-is" basis, and may include bugs, errors, or other issues.
* _cdktf-local-exec_ is NOT INTENDED FOR PRODUCTION USE, use of the Software may result in unexpected results, loss of data, or other unexpected results, and HashiCorp disclaims any and all liability resulting from use of _cdktf-local-exec_.
* HashiCorp reserves all rights to make all decisions about the features, functionality and commercial release (or non-release) of _cdktf-local-exec_, at any time and without any obligation or liability whatsoever.

## Compatibility

- `cdktf` >= 0.20.0
- `constructs` >= 10.0.25

## How It Works

The construct uses the null provider to achieve this so it can be trusted to only run after all dependencies are met.

## Usage

```ts
import { Provider, LocalExec } from "cdktf-local-exec";

// LocalExec extends from the null provider,
// so if you already have the provider initialized you can skip this step
new Provider(this, "local-exec");

const frontend = new LocalExec(this, "frontend-build", {
  // Will copy this into an asset directory
  cwd: "/path/to/project/frontend",
  command: "npm install && npm build",
});

const pathToUpload = `${frontend.path}/dist`;

new LocalExec(this, "frontend-upload", {
  cwd: pathToUpload,
  command: `aws s3 cp --recursive ${pathToUpload} s3://${bucket.name}/frontend`,
});

new LocalExec(this, "backend-build", {
  cwd: "/path/to/project/backend",
  copyBeforeRun: false, // can not run remotely since the runner has no docker access
  command: "docker build -t foo . && docker push foo",
});
```

### Options

- `cwd`: The working directory to run the command in. It will be copied before execution to ensure the asset can be used in a remote execution environment.
- `command`: The command to execute.
- `copyBeforeRun`: If true, the command will copy the `cwd` directory into a tmp dir and run there. If false, the command will be executed in the `cwd` directory.
