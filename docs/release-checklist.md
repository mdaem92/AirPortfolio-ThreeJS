# Release acceptance

## Verified locally

- [x] Tests, lint and production build pass through `npm run verify`.
- [x] Built model/audio/images match source; bundled asset references exist.
- [x] Firebase output directory and SPA rewrite match the build.
- [x] Current dependency audit reports zero known findings.
- [x] Earlier desktop/mobile-viewport navigation and visual checks are recorded in steps four/five.

## Manual and hosted acceptance

- [x] Tommy confirmed on 2026-10-29: audible sound begins only after Start, stops when the tab is hidden, and resumes on return.
- [x] Tommy confirmed on 2026-10-29 that the hosted preview works well on his device when asked to check loading, navigation, animation and audio. Device model/browser and individual interaction results were not recorded. The current build requires WebGL2.
- [x] Firebase CLI sign-in completed; temporary preview deployed to `modernization-review`.
- [x] Fresh browser preview check: model/image loading, Start, About/back, Projects/carousel, console and reload; all hosted asset bytes (including audio) match the verified build. Audible behavior was separately confirmed by Tommy locally.
- [x] GitHub verification passed for `2cfa65d`: https://github.com/mdaem92/AirPortfolio-ThreeJS/actions/runs/40814548091
- [x] Tommy explicitly authorized production deployment on 2026-10-29; the previous live release was recorded before promotion.
- [x] Promoted the accepted preview version to production; hosted file integrity and routing checks pass. See [production-release.md](production-release.md) for release IDs and rollback information.

Extended heat/battery behavior was not measured during this device acceptance check.

## Temporary preview

Preview: https://airportfolio-f076f--modernization-review-23gdtscn.web.app

Expires **2026-11-05 at 04:40 CET**. Hosting version: `5abd6011dc552c18`.
All 24 hosted build files match local SHA-256 values, and the SPA fallback returns the root HTML. This channel does not replace production.

To refresh the preview, use the existing authenticated Firebase CLI. Build and verify first:

```sh
npm run verify
npx --yes firebase-tools@15.34.2 hosting:channel:deploy modernization-review --project airportfolio-f076f --expires 7d
```

This command targets a temporary preview channel. Do not substitute `live` during preview verification. Once the workflow is reviewed and pushed, it can instead create a seven-day preview through manual dispatch with `deploy_preview` enabled, using the repository's existing service-account secret.

## Rollback preparation

Record the current Firebase Hosting release ID and its verified URL before a production deployment. Retain that known-good release in Firebase Hosting for rollback. Source rollback and hosted rollback are separate operations: the last approved source commit before this stage is `8368619`, which is not evidence of what Firebase currently serves. Never rewrite the shared branch history as a rollback shortcut.
