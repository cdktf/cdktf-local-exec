/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { ConstructLibraryCdktf } from "projen/lib/cdktf";
import { UpgradeDependenciesSchedule } from "projen/lib/javascript";
import { AutoApprove } from "./projenrc/auto-approve";
import { Automerge } from "./projenrc/automerge";
import { CustomizedLicense } from "./projenrc/customized-license";
import { UpgradeCDKTF } from "./projenrc/upgrade-cdktf";

const name = "cdktf-local-exec";

const githubActionPinnedVersions = {
  "actions/checkout": "692973e3d937129bcbf40652eb9f2f61becf3332", // v4.1.7
  "actions/download-artifact": "65a9edc5881444af0b9093a5e628f2fe47ea3b2e", // v4.1.7
  "actions/github-script": "60a0d83039c74a4aee543508d2ffcb1c3799cdea", // v7.0.1
  "actions/setup-node": "60edb5dd545a775178f52524783378180af0d1f8", // v4.0.2
  "actions/upload-artifact": "65462800fd760344b1a7b4382951275a0abb4808", // v4.3.3
  "amannn/action-semantic-pull-request":
    "0723387faaf9b38adef4775cd42cfd5155ed6017", // v5.5.3
  "hashicorp/setup-copywrite": "32638da2d4e81d56a0764aa1547882fc4d209636", // v1.1.3
  "peter-evans/create-pull-request": "c5a7806660adbe173f04e3e038b0ccdcd758773c", // v6.1.0
};

const constructsVersion = "10.3.0";

const project = new ConstructLibraryCdktf({
  author: "HashiCorp",
  authorAddress: "https://hashicorp.com",
  authorOrganization: true,
  defaultReleaseBranch: "main",
  name,
  repositoryUrl: "https://github.com/cdktf/cdktf-local-exec.git",
  description:
    "A simple construct that executes a command locally. This is useful to run build steps within your CDKTF Program or to run a post action after a resource is created." /* The description is just a string that helps people understand the purpose of the package. */,
  workflowGitIdentity: {
    name: "team-tf-cdk",
    email: "github-team-tf-cdk@hashicorp.com",
  },
  cdktfVersion: "0.20.0",
  constructsVersion,
  mergify: false,
  depsUpgradeOptions: {
    workflowOptions: {
      labels: ["auto-approve", "automerge", "dependencies"],
      schedule: UpgradeDependenciesSchedule.WEEKLY,
    },
  },
  projenrcTs: true,
  prettier: true,
  jsiiVersion: "~5.2.0",
  typescriptVersion: "~5.2.0", // should always be the same major/minor as JSII
  publishToPypi: {
    distName: name,
    module: name.replace(/-/g, "_"),
  },
  licensed: false,
  pullRequestTemplate: false,
});

new CustomizedLicense(project);
new AutoApprove(project);
new Automerge(project);
new UpgradeCDKTF(project);

project.addPeerDeps(
  "cdktf@>=0.20.0",
  "@cdktf/provider-null@>=10.0.0",
  "constructs@>=" + constructsVersion
);
project.addDevDeps("ts-node@10.9.1", "@cdktf/provider-random@>=11.0.0");

project.addPackageIgnore("scripts");
project.addPackageIgnore("projenrc");
project.addPackageIgnore("/.projenrc.ts");

project.addPackageIgnore(".copywrite.hcl");
// Run copywrite tool to add copyright headers to all files
project.buildWorkflow?.addPostBuildSteps(
  {
    name: "Setup Copywrite tool",
    uses: "hashicorp/setup-copywrite",
  },
  { name: "Add headers using Copywrite tool", run: "copywrite headers" }
);

// Use pinned versions of github actions
Object.entries(githubActionPinnedVersions).forEach(([action, sha]) => {
  project.github?.actions.set(action, `${action}@${sha}`);
});

const releaseWorkflow = project.tryFindObjectFile(
  ".github/workflows/release.yml"
);
releaseWorkflow?.addOverride("on.push", {
  branches: ["main"],
  "paths-ignore": [
    // don't do a release if the change was only to these files/directories
    "examples/**",
    ".github/ISSUE_TEMPLATE/**",
    ".github/CODEOWNERS",
    ".github/dependabot.yml",
    ".github/**/*.md",
  ],
});

project.synth();
