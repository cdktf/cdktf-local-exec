import * as path from "path";
import * as fs from "fs";
import { App, TerraformStack, Testing } from "cdktf";
import { Construct } from "constructs";
import { LocalExec, Provider } from "../src";
import { execSync } from "child_process";
import * as rand from "@cdktf/provider-random";

const EOL_CHARS = 1;
const apply = (addConstructs: (scope: Construct) => void) => {
  const app = new App();
  const stack = new TerraformStack(app, "test");
  new Provider(stack, "null", {});
  addConstructs(stack);
  const synthDir = Testing.fullSynth(stack);
  const outdir = path.join(synthDir, "stacks", "test");

  execSync(`terraform init && terraform apply -auto-approve`, {
    cwd: outdir,
  });

  return outdir;
};

const workingDirectoryForAsset = (
  manifestPath: string,
  name: string,
  stackName = "test"
) => {
  const dir = path.resolve(manifestPath, "cdk.tf.json");
  const manifest = JSON.parse(fs.readFileSync(dir, "utf8"));
  const assetPath = Object.entries<any>(manifest.resource.null_resource).find(
    ([key]) => key.startsWith(`${stackName}_${name}`)
  )![1].provisioner[0]["local-exec"].working_dir;

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
  });

  test("runs command inside copy of working directory", () => {
    // Create a file in the stack directory
    const outdir = apply((stack) => {
      new LocalExec(stack, "myresource", {
        command: `cp ${__filename} test.txt`,
        cwd: __dirname,
        copyBeforeRun: false,
      });
    });

    console.log(outdir);

    const workingDir = workingDirectoryForAsset(outdir, "myresource");

    expect(fs.existsSync(path.resolve(workingDir, "test.txt"))).toBe(true);
    expect(fs.existsSync(path.resolve(__dirname, "test.txt"))).toBe(false);
  });

  test("runs command inside working directory if copyBeforeRun is true", () => {
    // Create a file in the working directory
    apply((stack) => {
      new LocalExec(stack, "test", {
        command: `cp origin.txt test.txt`,
        cwd: testdir,
        copyBeforeRun: true,
      });
    });

    expect(fs.existsSync(path.resolve(testdir, "test.txt"))).toBe(true);
  });

  test("runs command in correct order with dependencies", () => {
    apply((stack) => {
      const dep = new LocalExec(stack, "dep", {
        command: `sleep 1 && echo "dep" > dep.txt`,
        cwd: testdir,
        copyBeforeRun: true,
      });

      new LocalExec(stack, "test", {
        command: `cp dep.txt test.txt`,
        cwd: testdir,
        copyBeforeRun: true,
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
    const outdir = apply((stack) => {
      new rand.RandomProvider(stack, "random");

      const waiter = new LocalExec(stack, "timer", {
        command: `sleep 3`,
        cwd: __dirname,
        copyBeforeRun: false,
      });
      const password = new rand.Password(stack, "password", {
        length: passwordLength,
        dependsOn: [waiter],
      });

      new LocalExec(stack, "passwordwriter", {
        command: `echo "${password.result}" > test.txt`,
        cwd: __dirname,
        copyBeforeRun: false,
      });
    });

    const workingDir = workingDirectoryForAsset(outdir, "passwordwriter");

    expect(fs.existsSync(path.resolve(workingDir, "test.txt"))).toBe(true);
    expect(
      fs.readFileSync(path.resolve(workingDir, "test.txt"), "utf8").length
    ).toBe(passwordLength + EOL_CHARS);
  });
});
