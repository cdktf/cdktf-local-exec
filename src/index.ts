import { Resource } from "@cdktf/provider-null/lib/resource";
import {
  AssetType,
  ITerraformDependable,
  Lazy,
  TerraformAsset,
  TerraformProvider,
  TerraformResourceLifecycle,
} from "cdktf";
import { Construct } from "constructs";

export interface LocalExecOptions {
  // From the null ResourceConfig
  readonly dependsOn?: ITerraformDependable[];
  readonly provider?: TerraformProvider;
  readonly lifecycle?: TerraformResourceLifecycle;
  readonly triggers?: {
    [key: string]: string;
  };

  // Specific to LocalExec
  /**
   * The command to run.
   */
  readonly command: string;

  /**
   * The working directory to run the command in.
   * Defaults to process.pwd().
   * If copyBeforeRun is set to true it will copy the working directory to an asset directory and take that as the base to run.
   */
  readonly cwd: string;

  /**
   * If set to true, the working directory will be copied to an asset directory.
   *
   * @default true
   */
  readonly copyBeforeRun?: boolean;
}

export { NullProvider as Provider } from "@cdktf/provider-null/lib/provider";

export class LocalExec extends Resource {
  public cwd: string;
  public command: string;

  constructor(scope: Construct, id: string, config: LocalExecOptions) {
    super(scope, id, config);

    const workingDir =
      config.copyBeforeRun === true
        ? new TerraformAsset(this, "workingDir", {
            path: config.cwd,
            type: AssetType.DIRECTORY,
          }).path
        : config.cwd;

    this.cwd = workingDir;
    this.command = config.command;

    this.addOverride("provisioner", [
      {
        "local-exec": {
          working_dir: workingDir,
          command: Lazy.stringValue({
            // TODO: wrap command to capture stdout and stderr
            produce: () => this.command,
          }),
        },
      },
    ]);
  }
}
