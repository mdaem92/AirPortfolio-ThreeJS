# Step six: final maintenance and release verification

Status: local maintenance, temporary preview and device acceptance are complete. Commit `2cfa65d` was pushed and GitHub verification passed. Tommy authorized production deployment on 2026-10-29; the accepted preview version is now live. Release and rollback details are recorded in [production-release.md](production-release.md).

## Compatible security fixes

Refreshed only the affected lock entries, within their existing dependency ranges:

- Babel runtime 7.18.9/7.19.0 → 7.29.10.
- three-stdlib's fflate 0.6.10 → patched 0.6.11. The separate 0.8.3 copy stays unchanged.

No application-library major versions changed and no forced resolutions were introduced. Final Yarn audit reports **zero known advisories** across 388 reported dependencies. Snapshot details: [step-six-audit.json](step-six-audit.json). This is the registry's audit result on 2026-10-29, not an assurance against future or undisclosed issues.

## Maintenance workflow

- Update checkout to v7.0.1 and setup-node to v7.1.0, pinned to verified release commit IDs. Pin the current Firebase action v0 commit and its CLI to 15.34.2. The action metadata confirms Node 24 runtimes.
- Run verification on master pushes, all pull requests (including forks), and manual dispatch. The old workflow ran only for same-repository PRs, which left direct pushes untested.
- Run `yarn verify`: five lifecycle tests, zero-warning source lint, production bundle, and build/hosting asset checks.
- Preview deployment runs only for same-repository PRs or a manual dispatch explicitly selecting `deploy_preview`. Pushes and ordinary manual verification do not deploy.
- Preview channels use PR/run-specific names and expire after seven days. No live-channel command is configured. PR commenting is disabled.
- Checkout does not persist credentials. Default permissions are read-only; the verification job adds checks-write for the optional Firebase check integration. Fork events retain GitHub's restricted token and skip deployment.
- Add weekly Dependabot proposals for npm and GitHub Actions. Group compatible npm minor/patch updates; keep major changes separate and require review. No automatic merge configured. These proposals start only after the configuration is pushed.

## Local validation

- Frozen dependency install and the new `npm run verify` pass.
- Tests: 5 passed across 4 suites.
- ESLint: zero source warnings/errors.
- Vite build: passed; large-chunk notice remains visible.
- Build verification: all 21 public files match source SHA-256 values, the HTML references existing bundled JS/CSS, and Firebase serves `build` with the expected SPA rewrite.
- Workflow and Dependabot files parse with js-yaml 4.3.2; the temporary validator was not added as a project dependency. Action metadata/input names were checked. GitHub verification passed after the reviewed push: https://github.com/mdaem92/AirPortfolio-ThreeJS/actions/runs/40814548091
- No application UI or asset changes in this stage; the generated production JS/CSS hashes match step five's final build.

## Remaining release checks

See [release-checklist.md](release-checklist.md). The official Firebase plugin is installed, and the official CLI 15.34.2 was verified through npx. Tommy completed Firebase CLI sign-in. No global CLI installation or project credential file was added.

Tommy confirmed on 2026-10-29 that audible playback starts only after Start, stops when the tab is hidden, and resumes on return. That manual audio acceptance item is complete.

The GitHub account connection does not supply local Firebase credentials. The existing workflow references a Firebase service-account secret, whose current validity has not been verified. The approved source commit before this stage is `8368619`; its combined-status response contained no statuses (the previous workflow was PR-only).

Tommy confirmed on 2026-10-29 that the hosted preview works well on his device when asked to check loading, navigation, animation and audio. Device model/browser and individual interaction results were not recorded; extended heat/battery behavior was not measured. The Three.Clock warning originates in Fiber and remains documented in step five; no dependency code was patched to suppress it.

## Hosted preview

- URL: https://airportfolio-f076f--modernization-review-23gdtscn.web.app
- Project/site: `airportfolio-f076f`; channel: `modernization-review`.
- Hosting version: `5abd6011dc552c18`.
- Expires: 2026-11-05 at 04:40 CET (03:40 UTC).
- Fresh `npm run verify` passed before deployment. All 24 hosted files match the local build by SHA-256, including 21 public model/audio/image files and the generated HTML/JS/CSS. An unknown path returns the same HTML through the SPA rewrite.
- Fresh browser sessions loaded the scene after Start, rendered the models, and opened About; its back arrow returned to the welcome board. Projects opened and the carousel switched from Car Trades App to DBT Therapy App. Reloading the preview returned to Start and loaded the scene again. No console errors were captured; the known Three.Clock warning remains.
- After Tommy's explicit production approval, this exact preview version was promoted to the live channel on 2026-10-29. The preview remains available until its recorded expiry.

## References

- https://github.com/actions/checkout/releases/tag/v7.0.1
- https://github.com/actions/setup-node/releases/tag/v7.1.0
- https://github.com/advisories/GHSA-968p-4wvh-cqc8
- https://github.com/advisories/GHSA-px8p-9vwx-vf98
- https://firebase.google.com/docs/hosting/test-preview-deploy
