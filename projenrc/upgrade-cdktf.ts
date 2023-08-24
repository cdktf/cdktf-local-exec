/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { javascript } from "projen";
import { JobPermission } from "projen/lib/github/workflows-model";

/**
 * Checks for new versions of CDKTF and creates a PR with an upgrade change if there are changes.
 */
export class UpgradeCDKTF {
  constructor(project: javascript.NodeProject) {
    const workflow = project.github?.addWorkflow("upgrade-cdktf");

    if (!workflow) throw new Error("no workflow defined");

    workflow.on({
      schedule: [{ cron: "42 */6 * * *" }], // Runs four times a day
      workflowDispatch: {}, // allow manual triggering
    });

    (workflow.concurrency as any) = "${{ github.workflow }}-${{ github.ref }}";

    workflow.addJobs({
      upgrade: {
        name: "Upgrade CDKTF",
        runsOn: ["ubuntu-latest"],
        steps: [
          {
            name: "Checkout",
            uses: "actions/checkout@v3",
          },
          {
            name: "Install",
            run: "yarn install",
          },
          {
            name: "Get current CDKTF version",
            id: "current_version",
            run: [
              `OLD_VERSION=$(npm list cdktf --depth=0 --json | jq -r '.dependencies.cdktf.version')`,
              `OLD_VERSION_SHORT=$(cut -d "." -f 2 <<< "$OLD_VERSION")`,
              `echo "value=$OLD_VERSION" >> $GITHUB_OUTPUT`,
              `echo "short=$OLD_VERSION_SHORT" >> $GITHUB_OUTPUT`,
            ].join("\n"),
            // NOTE: No, there is no good way to do this in Yarn, until (if) we upgrade to Yarn 2+ (see below)
          },
          {
            name: "Get latest CDKTF version",
            id: "latest_version",
            run: [
              `CDKTF_VERSION=$(yarn info cdktf --json | jq -r '.data.version')`,
              `CDKTF_VERSION_SHORT=$(cut -d "." -f 2 <<< "$CDKTF_VERSION")`,
              `echo "value=$CDKTF_VERSION" >> $GITHUB_OUTPUT`,
              `echo "short=$CDKTF_VERSION_SHORT" >> $GITHUB_OUTPUT`,
            ].join("\n"),
            // IMPORTANT: the above behavior changed in Yarn 2+; `yarn info` instead gives the version of the installed package
            // If/when we upgrade we'll likely want to switch to `yarn npm info`: https://yarnpkg.com/cli/npm/info
          },
          {
            name: "Run upgrade script",
            if: "steps.current_version.outputs.short != steps.latest_version.outputs.short",
            run: "scripts/update-cdktf.sh ${{ steps.latest_version.outputs.value }}",
          },
          {
            name: "Create draft pull request",
            if: "steps.current_version.outputs.short != steps.latest_version.outputs.short",
            uses: "peter-evans/create-pull-request@v3",
            with: {
              "commit-message":
                "chore!: upgrade to cdktf ${{ steps.latest_version.outputs.value }}",
              branch:
                "auto/upgrade-cdktf-${{ steps.latest_version.outputs.short }}",
              base: "main",
              title:
                "chore!: upgrade to cdktf ${{ steps.latest_version.outputs.value }}",
              body: [
                "This PR initiates the upgrade of CDKTF from version `${{ steps.current_version.outputs.value }}` to version `${{ steps.latest_version.outputs.value }}`.",
                "Unfortunately, not everything can be automated, and the following steps need to be completed manually:",
                " ",
                "- [ ] Update `@cdktf/provider-null` to a version compatible with `cdktf@${{ steps.latest_version.outputs.value }}` [here](https://github.com/cdktf/cdktf-local-exec/blob/45a35846c8c7e5bdc600d76344305b1a049ef130/.projenrc.ts#L62)",
                "- [ ] Update `@cdktf/provider-random` to a version compatible with `cdktf@${{ steps.latest_version.outputs.value }}` [here](https://github.com/cdktf/cdktf-local-exec/blob/main/.projenrc.ts#L67)", // @TODO replace with SHA url
                " ",
                "Please checkout this PR, complete the above steps, push the changes to this branch, and then mark this PR as ready for review to complete the upgrade. Thanks!",
              ].join("\n"),
              labels: "automerge,auto-approve,dependencies",
              token: "${{ secrets.PROJEN_GITHUB_TOKEN }}",
              author: "team-tf-cdk <github-team-tf-cdk@hashicorp.com>",
              committer: "team-tf-cdk <github-team-tf-cdk@hashicorp.com>",
              signoff: true,
              "delete-branch": true,
              draft: true,
            },
          },
        ],
        env: {
          CI: "true",
          CHECKPOINT_DISABLE: "1",
        },
        permissions: {
          contents: JobPermission.READ,
        },
      },
    });
  }
}
