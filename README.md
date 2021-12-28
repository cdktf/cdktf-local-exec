# CDKTF Local Exec Construct

A simple construct that executes a command locally. This is useful to run build steps within your CDKTF Program or to run a post action after a resource is created.

The construct uses the null provider to achieve this so it can be trusted to only run after all dependencies are met.

## Usage

```ts
import { LocalExec } from "cdktf-local-exec";

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
  forceLocal: true, // can not run remotely since the runner has no docker access
  command: "docker build -t foo . && docker push foo",
});
```

### Options

- `cwd`: The working directory to run the command in. It will be copied before execution to ensure the asset can be used in a remote execution environment.
- `command`: The command to execute.
- `forceLocal`: If true, the command will be executed locally without copying the working directory to a temporary directory.
