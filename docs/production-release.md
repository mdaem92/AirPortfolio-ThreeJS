# Production release: 2026-10-29

Tommy explicitly authorized production deployment on 2026-10-29 after accepting the temporary preview on his device.

## Approved source and preview

- Source commit: `2cfa65d76112ea90692966987984749cfe719fb9` on `master`.
- GitHub verification passed: https://github.com/mdaem92/AirPortfolio-ThreeJS/actions/runs/40814548091
- Preview channel: `modernization-review` on site/project `airportfolio-f076f`.
- Preview version: `5abd6011dc552c18`.
- Fresh local verification: five tests, lint, production build and asset integrity checks passed before release.
- Deployment approach: clone the accepted preview channel to `live`, preserving the tested artifact.

## Previous production release retained for rollback

Recorded from Firebase Hosting before deployment:

- URL: https://airportfolio-f076f.web.app
- Release: `projects/airportfolio-f076f/sites/airportfolio-f076f/channels/live/releases/1666104077392363`.
- Version: `163cec43e5401259`.
- Release time: 2022-10-18T14:41:17.392363803Z.
- Status: `FINALIZED`; 30 hosted files.
- The live channel reports a retained release count of 2147483647. Keep this release in Hosting history.

If rollback is required, use Firebase Console > Hosting > the live release history to roll back to the recorded release. Verify the restored site afterward. Source Git history does not need to be rewritten.

## Deployment result

- Live URL: https://airportfolio-f076f.web.app
- Alternate URL: https://airportfolio-f076f.firebaseapp.com
- Release: `projects/airportfolio-f076f/sites/airportfolio-f076f/channels/live/releases/1793303533895000`.
- Version: `5abd6011dc552c18`, identical to the accepted preview.
- Release time: 2026-10-29 at 20:52:13 CET (19:52:13 UTC).
- Firebase reports `FINALIZED` and successful promotion.
- All 24 public build files match the approved local build by SHA-256. Firebase additionally reports 26 hosted files for the version.
- Both Hosting domains serve the approved HTML; the SPA fallback matches the root document.
- Browser smoke check: Start loads the live 3D scene, About opens, and its back arrow returns to the welcome board. No console errors were captured; the previously documented Three.Clock deprecation warning remains.
