/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { ConstructLibraryCdktf } from "projen/lib/cdktf";

const project = new ConstructLibraryCdktf({
  author: "Daniel Schmidt",
  authorAddress: "danielmschmidt92@gmail.com",
  defaultReleaseBranch: "main",
  name: "cdktf-local-exec",
  repositoryUrl: "https://github.com/DanielMSchmidt/cdktf-local-exec.git",
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
  cdktfVersion: "0.16.0",
  autoApproveUpgrades: true,
  autoApproveOptions: {
    label: "auto-approve",
  },
  projenrcTs: true,
  prettier: true,
  jsiiVersion: "5.0.7",
  publishToPypi: {
    distName: "cdktf-local-exec",
    module: "cdktf_local_exec",
  },
});

project.addPeerDeps(
  "cdktf@>=0.15.0",
  "@cdktf/provider-null@>=5.0.0",
  "constructs@^10.0.25"
);

// Run copywrite tool to add copyright headers to all files
project.buildWorkflow?.addPostBuildSteps(
  {
    name: "Setup Copywrite tool",
    uses: "hashicorp/setup-copywrite@3ace06ad72e6ec679ea8572457b17dbc3960b8ce", // v1.0.0
    with: { token: "${{ secrets.GITHUB_TOKEN }}" },
  },
  { name: "Add headers using Copywrite tool", run: "copywrite headers" }
);

project.synth();
