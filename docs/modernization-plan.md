# Airportfolio modernization plan

Date: 2026-10-29. Baseline: `112d70e` (2022-10-18).

## Review and release rules

- Do not commit or push until Tommy has visually inspected the changes and authorized the next action.
- Work in small, reviewable stages. Do not deploy production changes during baseline work.
- Preserve the existing lockfile and baseline screenshots until rendering changes are accepted.
- Keep each stage independently reversible. Recheck package compatibility when implementing each stage.

## 1. Establish a reproducible baseline

- Pin Node and Yarn; install using the existing Yarn lockfile with frozen resolution.
- Repair CI's `npm ci` / Yarn lockfile mismatch.
- Record development and production build behavior, warnings, and errors.
- Capture desktop/mobile views and check Start, orbit/zoom, About, Projects/carousel, Skills, Credits, Escape/back, audio, and tab switching.
- Record evidence and outstanding checks in `docs/baseline.md`.
- Gate: repeatable build and documented current behavior; user visual review before commits or pushes.

## 2. Fix existing bugs and add focused checks

Local implementation and verification are recorded in [step-two.md](step-two.md); visual approval is pending.

- Fix the visibility listener's callback cleanup and repeated subscriptions.
- Replace loading readiness based on Suspense fallback cleanup with explicit readiness.
- Make audio activation consistent with Start and test hidden-tab behavior.
- Add focused lifecycle tests and a browser navigation smoke test.
- Remove confirmed unused dependencies (`react-router-dom`, `web-vitals`), dead imports, missing HTML asset references, and boilerplate.
- Gate: checks pass and appearance matches the baseline.

## 3. Replace Create React App with Vite

- Keep application dependency versions stable during the tooling migration.
- Move the HTML entry point, replace `%PUBLIC_URL%`, and handle JSX in `.js` files.
- Configure explicit linting and testing; preserve Firebase's `build` output directory initially.
- Retain a supported pinned Node runtime and one package manager/lockfile.
- Repeat the vulnerability audit; classify findings by runtime/build exposure.
- Gate: development/production builds and asset loading work, followed by an authorized Firebase preview check.

## 4. Modernize UI libraries

- Upgrade styled-components separately; handle transient styling props such as `isMobile`.
- Migrate Ant Design through its major-version guides; replace old CSS imports and validate carousel/button styling.
- Update icons, spinner and test libraries with compatible peers.
- Gate: desktop/mobile overlays match the baseline with no new DOM warnings.

## 5. Upgrade React and the 3D stack

- Use React 18.3 to expose migration warnings before React 19.
- Upgrade React/React DOM, Fiber, Drei and Three as compatible sets, checking peer dependencies.
- Reference registry snapshot: React 19.3.1, Fiber 9.8.2, Drei 10.7.9, Three 0.186.1; these are not automatic upgrade commands.
- Review Three's intervening lighting/color-management changes and the old `physicallyCorrectLights` usage.
- Validate GLTF materials, animations, positional audio, controls, lifecycle cleanup and mobile performance.
- Gate: visual and interaction parity accepted by Tommy.

## 6. Finish maintenance and release verification

- Finish action upgrades, update setup documentation, and propose automated dependency updates.
- Review remaining security findings by exposure and remediation options.
- Verify a preview before any authorized production deployment; retain the known-good release for rollback.

## Audit evidence and sources

The initial lockfile audit found 157 distinct advisories: 7 critical, 77 high, 58 moderate, 15 low. Repeated paths produced 561 findings, 513 through react-scripts. These counts do not establish deployed-site exploitability.

- https://react.dev/blog/2025/02/14/sunsetting-create-react-app
- https://react.dev/blog/2024/04/25/react-19-upgrade-guide
- https://github.com/mrdoob/three.js/wiki/Migration-Guide
- https://styled-components.com/docs/faqs
- https://5x-ant-design.antgroup.com/docs/react/migration-v5

Other findings: no checked-in tests; missing favicon/manifest/touch icon; CRA boilerplate README; unpinned Node; old checkout action; visibility listener leak; readiness/audio lifecycle risks.
