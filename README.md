# Airportfolio

## Local setup

Use Node **24.16.0** (also recorded in `.nvmrc`) and Yarn **1.22.22**.
Keep `yarn.lock`; do not generate an npm lockfile for this project.

```sh
npx --yes yarn@1.22.22 install --frozen-lockfile --non-interactive
npx --yes yarn@1.22.22 start
npx --yes yarn@1.22.22 build
```

The development server uses http://127.0.0.1:3000. Production files are
written to `build`, matching Firebase Hosting's configuration.

See [the modernization plan](docs/modernization-plan.md) and
[baseline results](docs/baseline.md). Changes must remain uncommitted and unpushed
until Tommy's visual review and authorization.

## Verification

Run the focused lifecycle tests without watch mode:

```sh
npm test
```

CI runs Vitest tests and a production build. The build runs ESLint with zero warnings allowed before Vite.

- `npm start`: Vite development server (port 3000).
- `npm run lint`: source and Hooks checks.
- `npm test`: run the test suite once; `npm run test:watch` for watch mode.
- `npm run build`: lint and generate `build/`.
- `npm run preview`: serve the built app locally at http://127.0.0.1:4173.
- `npm run verify`: tests, lint/build, asset integrity and Firebase configuration checks.

Vite targets Chrome/Edge 111+, Firefox 114+, and Safari 16.4+. Check older-browser requirements before changing these targets.
Firebase continues serving `build/` with the existing SPA rewrite. Review migration evidence in [step-three.md](docs/step-three.md).

UI and renderer migration evidence is recorded in [step-four.md](docs/step-four.md)
and [step-five.md](docs/step-five.md). The current 3D renderer requires WebGL2.

Final maintenance results are in [step-six.md](docs/step-six.md). Follow the
[release checklist](docs/release-checklist.md) for audio/device and hosted-preview
acceptance. The workflow verifies master pushes and pull requests; its preview
channels expire after seven days. Dependabot proposes weekly updates for review.

## Manual smoke check

Start the app, enter the scene, open About/Projects/Skills and return using Escape
or the back arrows. Change the project carousel. Press Escape on the main board,
orbit to the Credits sign, and open/close it. Check a narrow viewport too.
Confirm sound starts only after Start, stops in a hidden tab, and resumes on return.
Compare lighting and layout with the preserved baseline captures.
