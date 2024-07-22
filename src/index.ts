/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

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

export interface LocalExecConfig {
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
   * If copyBeforeRun is set to true it will copy the working directory to an asset directory and take that as the base to run.
   *
   * @default process.cwd()
   */
  readonly cwd?: string;

  /**
   * If set to true, the working directory will be copied to an asset directory.
   *
   * @default false
   */
  readonly copyBeforeRun?: boolean;

  /**
   * Command to run at destroy-time.
   */
  readonly onDestroy?: string;
}

export { NullProvider as Provider } from "@cdktf/provider-null/lib/provider";

interface LocalExecProvisioner {
  "local-exec": {
    working_dir: string;
    command: string;
    when?: string;
  };
}

export class LocalExec extends Resource {
  public cwd: string;
  public command: string;
  public onDestroy?: string;

  constructor(scope: Construct, id: string, config: LocalExecConfig) {
    super(scope, id, config);

    const cwd = config.cwd ?? process.cwd();

    const workingDir =
      config.copyBeforeRun === true
        ? new TerraformAsset(this, "workingDir", {
            path: cwd,
            type: AssetType.DIRECTORY,
          }).path
        : cwd;

    this.cwd = workingDir;
    this.command = config.command;
    this.onDestroy = config.onDestroy;

    const overrides: LocalExecProvisioner[] = [
      {
        "local-exec": {
          working_dir: workingDir,
          command: Lazy.stringValue({
            // TODO: wrap command to capture stdout and stderr
            produce: () => this.command,
          }),
        },
      },
    ];

    if (typeof this.onDestroy === "string") {
      overrides.push({
        "local-exec": {
          when: "destroy",
          working_dir: workingDir,
          command: Lazy.stringValue({
            // TODO: wrap command to capture stdout and stderr
            produce: () => this.onDestroy,
          }),
        },
      });
    }

    this.addOverride("provisioner", overrides);
  }
}
