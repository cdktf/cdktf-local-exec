/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import { password, provider } from "@cdktf/provider-random";
import { App, TerraformStack, Testing } from "cdktf";
import { Construct } from "constructs";
import { LocalExec, Provider } from "../src";

const EOL_CHARS = 1;
const apply = (addConstructs: (scope: Construct) => void) => {
  const app = new App();
  const stack = new TerraformStack(app, "test");
  new Provider(stack, "null", {});
  addConstructs(stack);
  const synthDir = Testing.fullSynth(stack);
  const outdir = path.join(synthDir, "stacks", "test");

  execSync("terraform init && terraform apply -auto-approve", {
    cwd: outdir,
  });

  const destroy = () => {
    execSync("terraform destroy -auto-approve", {
      cwd: outdir,
    });
  };

  return { outdir, destroy };
};

const workingDirectoryForAsset = (manifestPath: string, name: string) => {
  const dir = path.resolve(manifestPath, "cdk.tf.json");
  const manifest = JSON.parse(fs.readFileSync(dir, "utf8"));
  const assetPath =
    manifest.resource.null_resource[name]!.provisioner[0]["local-exec"]
      .working_dir;

  return path.resolve(manifestPath, assetPath);
};

const testdir = path.resolve(__dirname, "testdir");

describe("LocalExec", () => {
  beforeEach(() => {
    // Create empty dir
    fs.mkdirSync(testdir);
    fs.writeFileSync(
      path.resolve(__dirname, "testdir", "origin.txt"),
      "Hello World"
    );
  });

  afterEach(() => {
    try {
      fs.rmdirSync(testdir, { recursive: true });
    } catch (e) {}

    try {
      fs.unlinkSync(path.resolve(__dirname, "test.txt"));
    } catch (e) {}
  });

  test("runs command inside copy of working directory", () => {
    // Create a file in the stack directory
    const { outdir } = apply((stack) => {
      new LocalExec(stack, "myresource", {
        command: `cp ${__filename} test.txt`,
        cwd: __dirname,
        copyBeforeRun: true,
      });
    });

    const workingDir = workingDirectoryForAsset(outdir, "myresource");

    expect(fs.existsSync(path.resolve(workingDir, "test.txt"))).toBe(true);
    expect(fs.existsSync(path.resolve(__dirname, "test.txt"))).toBe(false);
  });

  test("runs command inside working directory if copyBeforeRun is false", () => {
    // Create a file in the working directory
    apply((stack) => {
      new LocalExec(stack, "test", {
        command: "cp origin.txt test.txt",
        cwd: testdir,
        copyBeforeRun: false,
      });
    });

    expect(fs.existsSync(path.resolve(testdir, "test.txt"))).toBe(true);
  });

  test("runs command in correct order with dependencies", () => {
    apply((stack) => {
      const dep = new LocalExec(stack, "dep", {
        command: 'sleep 1 && echo "dep" > dep.txt',
        cwd: testdir,
        copyBeforeRun: false,
      });

      new LocalExec(stack, "test", {
        command: "cp dep.txt test.txt",
        cwd: testdir,
        copyBeforeRun: false,
        dependsOn: [dep],
      });
    });

    expect(fs.existsSync(path.resolve(testdir, "test.txt"))).toBe(true);
    expect(fs.readFileSync(path.resolve(testdir, "test.txt"), "utf8")).toEqual(
      expect.stringContaining("dep")
    );
  });

  test("runs command can use token value inside a command", () => {
    const passwordLength = 4;
    const { outdir } = apply((stack) => {
      new provider.RandomProvider(stack, "random");

      const waiter = new LocalExec(stack, "timer", {
        command: "sleep 3",
        cwd: __dirname,
        copyBeforeRun: false,
      });
      const pw = new password.Password(stack, "password", {
        length: passwordLength,
        special: false,
        dependsOn: [waiter],
      });

      new LocalExec(stack, "passwordwriter", {
        command: `echo "${pw.result}" > test.txt`,
        cwd: __dirname,
        copyBeforeRun: false,
      });
    });

    const workingDir = workingDirectoryForAsset(outdir, "passwordwriter");

    console.log(fs.readFileSync(path.resolve(workingDir, "test.txt"), "utf8"));
    expect(fs.existsSync(path.resolve(workingDir, "test.txt"))).toBe(true);
    expect(
      fs.readFileSync(path.resolve(workingDir, "test.txt"), "utf8").length
    ).toBe(passwordLength + EOL_CHARS);
  });

  test("command can be overwritten", () => {
    // Create a file in the stack directory
    const { outdir } = apply((stack) => {
      const exec = new LocalExec(stack, "myresource", {
        command: "ls -la",
        cwd: __dirname,
        copyBeforeRun: true,
      });
      exec.command = `cp ${__filename} test.txt`;
    });

    const workingDir = workingDirectoryForAsset(outdir, "myresource");

    expect(fs.existsSync(path.resolve(workingDir, "test.txt"))).toBe(true);
    expect(fs.existsSync(path.resolve(__dirname, "test.txt"))).toBe(false);
  });


  test("can specify a command to run at destroy-time", () => {
    // Create a file in the working directory
    const { destroy } = apply((stack) => {
      new LocalExec(stack, "test", {
        command: "cp origin.txt test.txt",
        cwd: testdir,
        onDestroy: "rm test.txt",
      });
    });

    expect(fs.existsSync(path.resolve(testdir, "test.txt"))).toBe(true);

    destroy();

    expect(fs.existsSync(path.resolve(testdir, "test.txt"))).toBe(false);
  });

  describe("default cwd", () => {
    let oldCwd = process.cwd();

    beforeEach(() => {
      oldCwd = process.cwd();
      process.chdir(testdir);
    });

    afterEach(() => {
      process.chdir(oldCwd);
    });

    test("defaults cwd to process.cwd()", () => {
      // Create a file in the working directory
      apply((stack) => {
        new LocalExec(stack, "test", {
          command: "cp origin.txt test.txt",
          copyBeforeRun: false,
        });
      });

      expect(fs.existsSync(path.resolve(testdir, "test.txt"))).toBe(true);
    });
  });
});
