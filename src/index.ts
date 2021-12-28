import { Construct } from "constructs";
import { Resource } from "@cdktf/provider-null";
import {
  AssetType,
  IResolvable,
  ITerraformDependable,
  TerraformAsset,
  TerraformProvider,
  TerraformResourceLifecycle,
} from "cdktf";

export interface LocalExecOptions {
  // From the null ResourceConfig
  readonly dependsOn?: ITerraformDependable[];
  readonly provider?: TerraformProvider;
  readonly lifecycle?: TerraformResourceLifecycle;
  readonly triggers?:
    | {
        [key: string]: string;
      }
    | IResolvable;

  // Specific to LocalExec
  /**
   * The command to run.
   */
  readonly command: string;

  /**
   * The working directory to run the command in.
   * Defaults to process.pwd().
   * If forceLocal is unset it will copy the working directory to an asset directory.
   */
  readonly cwd: string;

  /**
   * If set to true, the working directory will be copied to an asset directory.
   *
   * @default false
   */
  readonly forceLocal?: boolean;
}

export { NullProvider as Provider } from "@cdktf/provider-null";

export class LocalExec extends Resource {
  public cwd: string;
  constructor(scope: Construct, id: string, config: LocalExecOptions) {
    super(scope, id, config);

    const workingDir =
      config.forceLocal === true
        ? config.cwd
        : new TerraformAsset(this, "workingDir", {
            path: config.cwd,
            type: AssetType.DIRECTORY,
          }).path;

    this.cwd = workingDir;
    this.addOverride("provisioner", [
      {
        "local-exec": {
          working_dir: workingDir,
          command: config.command,
        },
      },
    ]);
  }
}
