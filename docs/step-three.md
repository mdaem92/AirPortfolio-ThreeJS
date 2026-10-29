# Step three: Vite migration

Status: visually approved by Tommy on 2026-10-29; committing and pushing authorized. Step two was approved and pushed as `d999a2b`. No deployment.

## Changes

- Removed Create React App/react-scripts and its bundled webpack/Jest/lint toolchain.
- Added Vite 8.3.5 with the React plugin 6.1.2, Vitest 5.0.5, jsdom 30.1.3, ESLint 10.13.0 and explicit Hooks rules.
- Moved the HTML entry point to the root and renamed JSX entry files to `src/index.jsx` and `src/App.jsx`.
- Migrated Jest mocks to Vitest and made test cleanup explicit.
- Moved the existing Testing Library packages to development dependencies without updating their resolved versions.
- Retained the resolved versions of all application dependencies (React, Three, Fiber, Drei, Ant Design, styles and audio).
- Kept Node 24.16.0 and Yarn 1.22.22; the only dependency lockfile remains `yarn.lock`.
- Production output remains `build/`, matching the existing Firebase public directory and SPA rewrite. Updated the PR workflow's test command.
- `npm run build` explicitly runs ESLint with zero warnings allowed before bundling. ESLint 10 handles JSX references directly; Hooks linting retains the lifecycle checks without bringing back CRA's obsolete config.
- Replaced CRA's implicit Browserslist handling with explicit Vite targets: Chrome/Edge 111, Firefox 114 and Safari 16.4. Older browsers are outside this migration's declared build target and require a separate compatibility decision.

## Validation

- Vitest: all five tests in four suites pass.
- ESLint/build: pass. Vite reports a 1.76-second production bundle step on this machine, excluding install/lint.
- Frozen offline Yarn install: passes; react-scripts is absent from node_modules.
- All 21 public assets (model, audio and images) have matching bytes when served from development port 3000 and production-preview port 4173. Copied build assets also match source.
- Production gzip output: JavaScript 327.76 kB, CSS 66.27 kB; before migration: JavaScript 340.78 kB, CSS 67.91 kB. Model/audio/images are additional payload.
- Vite reports a bundle-size warning for the main JavaScript chunk. Kept it visible; code splitting is a later performance task.
- Browser production-preview checks cover Start, About and its back arrow, Projects and carousel selection/back, plus home/Skills/back at a 390×844 mobile viewport. The scene's lighting and materials appear consistent with the saved baseline.
- Development server: http://127.0.0.1:3000. Built application preview: http://127.0.0.1:4173.

## Dependency security audit

Snapshot: 2026-10-29. Detailed package names, advisory URLs and dependency paths are in [step-three-audit.json](step-three-audit.json).

| Distinct advisories | Initial baseline | After Vite migration |
| --- | ---: | ---: |
| Critical | 7 | 1 |
| High | 77 | 3 |
| Moderate | 58 | 8 |
| Low | 15 | 0 |
| Total | 157 | 12 |

Counting repeated paths, findings fell from 561 to 44. Yarn reports 461 dependencies versus 1,394 in the original audit. These are advisory/dependency counts, not proof of deployed-site exploitability.

- Remaining critical: `styled-components > @babel/traverse`, a compilation-tool vulnerability. The static site does not provide a service compiling untrusted source. Review/remediate the old styled-components tree in step four; do not treat the static website as exposing that compiler solely from its package-tree presence.
- Runtime-library paths include Ant Design/icons, Fiber/Drei and styled-components: Babel runtime, lodash/lodash.pick, picomatch, fflate and moment advisories need their individual input/exposure review during the library updates. In particular, asset parsing should continue using trusted bundled assets.
- Test-only paths through Testing Library/jest-dom include old css-tools and DOM helpers. These do not belong in the deployed application entry; update the test libraries in their planned stage.
- Existing peer warnings for react-is and Testing Library DOM remain; no forced overrides or bulk application-library upgrades were applied.

## Remaining acceptance

Tommy's visual/audio review is pending. Local preview checks do not replace real-device or Firebase-hosted verification. No Firebase preview was deployed during uncommitted review; that check remains pending review and authorization. Baseline screenshots are preserved; new review captures are kept outside the repository.

Implementation references:

- https://vite.dev/guide/migration.html
- https://vitest.dev/guide/migration/
- https://eslint.org/docs/latest/use/migrate-to-10.0.0
