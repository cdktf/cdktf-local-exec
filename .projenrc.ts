/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { ConstructLibraryCdktf } from "projen/lib/cdktf";
import { JobStep } from "projen/lib/github/workflows-model";
import { UpgradeDependenciesSchedule } from "projen/lib/javascript";
import { AutoApprove } from "./projenrc/auto-approve";
import { Automerge } from "./projenrc/automerge";
import { CustomizedLicense } from "./projenrc/customized-license";
import { UpgradeCDKTF } from "./projenrc/upgrade-cdktf";
import { UpgradeJSIIAndTypeScript } from "./projenrc/upgrade-jsii-typescript";

const name = "cdktf-local-exec";

const githubActionPinnedVersions = {
  "actions/checkout": "11bd71901bbe5b1630ceea73d27597364c9af683", // v4.2.2
  "actions/download-artifact": "95815c38cf2ff2164869cbab79da8d1f422bc89e", // v4.2.1
  "actions/github-script": "60a0d83039c74a4aee543508d2ffcb1c3799cdea", // v7.0.1
  "actions/setup-node": "cdca7365b2dadb8aad0a33bc7601856ffabcc48e", // v4.3.0
  "actions/setup-python": "42375524e23c412d93fb67b49958b491fce71c38", // v5.4.0
  "actions/upload-artifact": "ea165f8d65b6e75b540449e92b4886f43607fa02", // v4.6.2
  "amannn/action-semantic-pull-request":
    "0723387faaf9b38adef4775cd42cfd5155ed6017", // v5.5.3
  "hashicorp/setup-copywrite": "32638da2d4e81d56a0764aa1547882fc4d209636", // v1.1.3
  "hashicorp/setup-terraform": "b9cd54a3c349d3f38e8881555d616ced269862dd", // v3.1.2
  "peter-evans/create-pull-request": "271a8d0340265f705b14b6d32b9829c1cb33d45e", // v7.0.8
};

const constructsVersion = "10.4.2";
/** JSII and TS should always use the same major/minor version range */
const typescriptVersion = "~5.7.0";

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
  cdktfVersion: "0.21.0",
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
  typescriptVersion,
  jsiiVersion: typescriptVersion,
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
new UpgradeJSIIAndTypeScript(project, typescriptVersion);

project.addPeerDeps(
  "cdktf@>=0.21.0",
  "@cdktf/provider-null@>=11.0.0",
  "constructs@>=" + constructsVersion
);
project.addDevDeps("ts-node@10.9.1", "@cdktf/provider-random@>=12.0.0");

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

const setupTerraformStep = {
  name: "Setup Terraform",
  uses: "hashicorp/setup-terraform",
  with: {
    terraform_wrapper: false,
  },
};
const buildSteps = (project.buildWorkflow as any).preBuildSteps as JobStep[];
const releaseSteps = (project.release as any).defaultBranch.workflow.jobs
  .release.steps;
buildSteps.push(setupTerraformStep);
releaseSteps.splice(1, 0, setupTerraformStep);

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
// always publish a new GitHub release, even when publishing to a particular package manager fails
releaseWorkflow?.addOverride("jobs.release_github.needs", "release");

project.synth();
