/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { IResolver, License } from "projen";
import { ConstructLibraryCdktf } from "projen/lib/cdktf";
import { UpgradeDependenciesSchedule } from "projen/lib/javascript";
import { TypeScriptProject } from "projen/lib/typescript";

const SPDX = "MPL-2.0";

class CustomizedLicense extends License {
  constructor(project: TypeScriptProject) {
    super(project, { spdx: SPDX });

    project.addFields({ license: SPDX });
  }

  synthesizeContent(resolver: IResolver) {
    return (
      "Copyright (c) 2021 HashiCorp, Inc.\n\n" +
      super.synthesizeContent(resolver)
    );
  }
}

const project = new ConstructLibraryCdktf({
  author: "HashiCorp",
  authorAddress: "https://hashicorp.com",
  authorOrganization: true,
  defaultReleaseBranch: "main",
  name: "cdktf-local-exec",
  repositoryUrl: "https://github.com/cdktf/cdktf-local-exec.git",
  devDeps: ["@cdktf/provider-random", "ts-node@10.9.1"],
  description:
    "A simple construct that executes a command locally. This is useful to run build steps within your CDKTF Program or to run a post action after a resource is created." /* The description is just a string that helps people understand the purpose of the package. */,
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
  // release: undefined,      /* Add release management to this project. */
  workflowGitIdentity: {
    name: "team-tf-cdk",
    email: "github-team-tf-cdk@hashicorp.com",
  },
  cdktfVersion: "0.17.0",
  autoApproveUpgrades: true,
  autoApproveOptions: {
    allowedUsernames: ["team-tf-cdk"],
    label: "auto-approve",
  },
  depsUpgradeOptions: {
    workflowOptions: {
      labels: ["auto-approve", "dependencies"],
      schedule: UpgradeDependenciesSchedule.WEEKLY,
    },
  },
  projenrcTs: true,
  prettier: true,
  jsiiVersion: "5.0.7",
  publishToPypi: {
    distName: "cdktf-local-exec",
    module: "cdktf_local_exec",
  },
  licensed: false,
});

project.addPeerDeps(
  "cdktf@>=0.17.0",
  "@cdktf/provider-null@>=5.0.0",
  "constructs@^10.0.25"
);

new CustomizedLicense(project);

// Run copywrite tool to add copyright headers to all files
project.buildWorkflow?.addPostBuildSteps(
  {
    name: "Setup Copywrite tool",
    uses: "hashicorp/setup-copywrite@867a1a2a064a0626db322392806428f7dc59cb3e", // v1.1.2
  },
  { name: "Add headers using Copywrite tool", run: "copywrite headers" }
);

project.synth();
