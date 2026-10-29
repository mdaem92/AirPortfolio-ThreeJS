# Airportfolio

## Reproducible baseline setup

Use Node **24.16.0** (also recorded in `.nvmrc`) and Yarn **1.22.22**.
Keep `yarn.lock`; do not generate an npm lockfile during the baseline stage.

```sh
npx --yes yarn@1.22.22 install --frozen-lockfile --non-interactive
npx --yes yarn@1.22.22 start
npx --yes yarn@1.22.22 build
```

The development server defaults to http://localhost:3000. Production files are
written to `build`, matching Firebase Hosting's configuration.

See [the modernization plan](docs/modernization-plan.md) and
[baseline results](docs/baseline.md). Changes must remain uncommitted and unpushed
until Tommy's visual review and authorization.

## Verification

Run the focused lifecycle tests without watch mode:

```sh
npm test -- --watchAll=false --runInBand
```

CI runs these tests and a strict production build. Source lint warnings fail that build.
The current build tool remains Create React App; its replacement is planned in step 3.

## Manual smoke check

Start the app, enter the scene, open About/Projects/Skills and return using Escape
or the back arrows. Change the project carousel. Press Escape on the main board,
orbit to the Credits sign, and open/close it. Check a narrow viewport too.
Confirm sound starts only after Start, stops in a hidden tab, and resumes on return.
Compare lighting and layout with the preserved baseline captures.
