# Airport lighting update

Date: 2026-10-30. Status: local review; no commit, push or deployment authorized for this change.

## Implemented

- Centralized the nine lights in `src/components/airport-lighting/AirportLighting.jsx`, with named settings in `lighting-config.js`.
- Replaced uniform ambient fill with a cool-sky/dark-ground hemisphere light. The key, fill and rim lights now have explicit scene targets; their old rotations did not set their aim.
- Retained five warm road spotlights at the existing lamp positions. Reduced intensity from 500 to 340, broadened the cone from 0.51 to 0.61 radians, softened penumbra from 0.23 to 0.65, and bounded range at 18 scene units. Inverse-square decay remains 2.
- Added a locally generated 128px reflection environment from three light panels, captured once per mount. It does not change the visible sky and makes no HDRI/CDN request.
- Added one 1024px PCF directional shadow map on wide, fine-pointer devices. Bounded its camera and tuned bias, radius and intensity to reduce aliasing/self-shadow artifacts. Road lamps do not cast additional shadow maps.
- Added soft procedural contact shadows for 20 named aircraft/vehicle groups in one instanced draw call. They follow animated position/orientation and disappear when animation parks a vehicle outside the scene. These are inexpensive approximations, not baked AO/lightmaps.
- Enabled shadows on the opaque `SURFACE` and `metal_frame` meshes without changing cached/shared GLTF materials. Screen, glow and hit-target meshes remain excluded. Cleanup restores prior object flags.
- Devices narrower than 900 CSS pixels or without a fine pointer use contact shadows without the directional shadow map; their pixel ratio is capped at 1.5 (desktop cap remains 2).
- Preserved ACES exposure 1, sRGB output, the existing dark background and unlit billboard materials.
- During carousel verification, corrected four pre-existing image path casing errors: the DBT screenshots and Airportfolio logo have `.PNG` filenames.

## Development inspection

Use `http://127.0.0.1:3000/?lightingDebug` for frame interval, renderer draw counts and active shadow-light counts. Add `&lightHelpers` to see directional/spotlight helpers. These options are development-only; their marker strings were checked absent from the production bundle.

Add `&trafficReview` for a close road-facing camera to inspect moving headlights and police spill. This inspection camera is also development-only and leaves the normal welcome-board camera unchanged.

The development `lightingDebug` view includes a **Show shadows** checkbox in the bottom-right corner after Start. It switches both the directional shadow map and procedural vehicle contact shadows on/off live, preserving the camera, traffic, light intensities, pixel ratio and police effect. The comparison control is development-only. The static reflection environment is memoized so toggling shadows does not recapture it.

After comparing both views on 2026-10-30, Tommy preferred the version without shadows. Both directional and vehicle contact shadows are now **disabled by default**, in development and production builds. The development checkbox remains available for comparison. Hidden contact shadows skip their per-frame matrix updates. Headlights, road pools, reflections and police spill are unaffected.

The local development view now shows a collapsible, scrollable **Lighting controls** panel after Start, including on the ordinary URL without query parameters. It includes hemisphere intensity/sky/ground colors; reflection strength, resolution and three panels (brightness, color, size, position and rotation); exposure; each directional light's switch, intensity, color, position and aim; street-light master intensity/color/range/beam/softness/falloff and each lamp's switch, brightness, position and aim; headlights (switch, strength, color, beam, range, falloff, halos and road pools); police spill (switch, intensity, range, falloff, colors, cycle, halos and light-bar brightness); and shadow strength, contact opacity, softness, bias and map size. Vehicle and police controls are independent, and Reset restores their previously accepted defaults.

Adjustments persist in this browser's local storage across reloads. **Reset all** restores the original lighting configuration; **Download settings** exports the complete configuration as JSON for later adoption in the source. Only development uses these saved preferences; production loads the existing defaults and omits the tuning UI. Numeric/color values are validated on reload. `?lightingDebug` continues to show frame timing and enabled-light counts. Switching a light on/off may briefly pause for shader compilation; reflection-panel edits recapture the static map once, while strength/exposure changes update scalar values without recapturing. The GLTF scene is memoized so ambient/directional/street adjustments do not rerender its geometry tree.

Tuning-panel validation: 16 tests across 8 suites pass with two workers, as do lint, production build and public-asset verification. Tests cover independent headlight/police behavior, saved preferences, reset defaults, invalid stored values and immutable updates that preserve the reflection-panel reference. Browser review checks sliders, collapsible sections, reload persistence and reset. Real-device performance and the preferred final lighting values remain for Tommy's review; no commit or deployment is authorized.

**Pause animations / Resume animations** stays accessible even when the tuning panel is collapsed. It pauses the model animation mixer at its current pose, including traffic and aircraft movement, and resumes from that pose without changing animation speed or resetting clips. Camera navigation, light adjustments, and police flashes remain active for inspection. Pause state is temporary and resets on reload; it is not included in the saved lighting configuration.

## Verification

- `npm run verify`: 6 tests across 5 suites, zero-warning source lint, production build, and all 21 public asset integrity checks pass.
- The added test uses real Three.js meshes/materials to verify screen/glow exclusion, shared-material preservation, cleanup and repeated setup.
- Desktop baseline at 1280×720, DPR 1: approximately 60 fps / 16.7 ms frame interval, 287–295 draw calls near the welcome board.
- Updated desktop at the same size: approximately 60 fps / 16.7 ms frame interval, 364–378 draw calls including the single shadow map. Draw counts vary as vehicles enter/leave the camera view. These are frame intervals in this desktop browser, not isolated GPU timings.
- Updated mobile-sized viewport at 390×844: settled at approximately 60 fps in the desktop browser, with 0 shadow-map lights. Resize/shader-recompilation transitions are excluded from that steady-state observation. This does not establish real-phone performance or battery behavior.
- Checked About text/back, Projects/carousel (including loading all image paths), Skills/open-and-return, free-camera focus toggle/orbit, and resizing between quality tiers. The built app loads successfully without a diagnostics overlay; its fresh console contains only the previously known Three.Clock deprecation warning.
- The existing large-bundle warning remains. Main JS grew from about 436.20 KB gzip to 456.43 KB gzip, primarily from the reflection environment support. No dependencies or model assets changed.

## Review limits

The directional shadows and contact ovals improve grounding without re-authoring the GLB. A Blender AO/lightmap bake is a separate art pass and has not been performed. The contact shadows assume the existing level road/runway surface at approximately y=1.05; uneven terrain would require a different projection.

Final visual acceptance and real-device performance remain for Tommy's review before any commit or deployment.

## Moving headlights and police light spill

Follow-up requested by Tommy after reviewing the initial lighting pass:

- Added warm-white lamp faces and small additive halos to all six moving road vehicles, with offsets matched to their different model fronts (including the bus and opposite-facing taxis).
- Soft road pools follow each vehicle's world pose and turning direction. They remain on the level road and are hidden along with vehicles parked outside the scene by the animation.
- Two bounded, non-shadow-casting headlight spotlights serve the nearest two active vehicles. Other vehicles retain their visible lamp faces and road pools; the real-light count stays constant during the loop rather than recompiling shaders each time a car appears.
- Added two short-range red/blue point lights to the moving police car. A smooth alternating 1.25-second cycle synchronizes their spill, halos and cloned light-bar materials. Nearby lit materials receive colored diffuse/specular highlights; this is direct illumination, not a new per-frame reflection cubemap or screen-space reflection pass.
- Effects start only after Start and turn off when the tab is hidden. The shared GLTF siren materials used by other vehicles are preserved and restored on cleanup.
- The scene now uses 13 real lights, with the same single desktop shadow map and no new mobile shadow map. A 1280×720/DPR 1 desktop-browser observation remained approximately 60 fps / 16.7 ms per frame during the traffic loop.
- `npm run verify` passes 9 tests across 6 suites, lint, build and public-asset verification. Added real-Three.js tests for turning/world transforms, off-stage poses, nearest-two allocation, Start/visibility gating, synchronized police spill and shared-material cleanup.

Tommy visually accepted the police-car effect on 2026-10-30: “the police car looks great already.” Keep its current spill and pulse strength for the next review.

These follow-up changes also remain uncommitted and undeployed. Real-device performance and final headlight acceptance remain for visual review.

## Runway vehicle headlights and beacons

Enabled the same visible headlight faces, halos and projected light pools on all 11 listed runway/apron vehicles, including the stationary bus. Local headings match the model's baked +X, -X, +Z, -Z and diagonal vehicle orientations. Original headlight materials are cloned per vehicle and brightened without mutating cached GLTF materials.

Amber support-vehicle beacons and red/blue bars on the runway police/fire vehicles pulse with slightly staggered phases. Halo anchors are derived from each siren mesh's upper vertices, avoiding lower indicators included in the same material. The luggage trailer has no separate headlight or siren meshes in the GLB, so it receives added front lamps and a small amber beacon. The bus receives headlights only.

The existing two physical headlight spots now serve the nearest two active road/runway vehicles. The existing pair of beacon spill lights serves the nearest active emergency/beacon vehicle, including the previously accepted moving police car. All lamps remain visibly lit through emissive faces and halos. The real-light budget stays at 13; no extra shadow maps are added. The tuning panel's **Vehicle headlights** and **Emergency & runway beacons** sections control both areas. Effects still require Start and an active browser tab; Pause freezes movement while beacon pulses continue.

Use `?runwayReview` for a development-only runway inspection camera; add `&lightingDebug` for enabled-light counts and timing. The normal welcome camera is unchanged. Verification passes 17 tests across 8 suites, source lint, production build and public-asset checks; the added test covers runway headings, all 11 vehicles, bus exclusion from beacons, trailer beacon, bounded physical-light pools, Start/visibility gating and shared-material restoration. This work remains uncommitted and undeployed.

Paired-beacon correction: `runwayBackup` and `orangeRunwayCar1` each contain two separate amber roof lamps within one mesh. Their upper vertices are split at the gap between the lamps, producing two correctly centered halos and two distinct spill-light positions when that vehicle is nearest. The shared material is cloned/disposed once and the amber pair flashes in sync. Added a regression test for both vehicle configurations, separate lamp/spill positions, and single material disposal/restoration (18 total tests). `?runwayReview=beacons` gives a close development-only view of these two vehicles.

## Real illumination behind occluders

Supersedes the two-headlight/two-beacon allocation described above. The original optimization gave most vehicles projected ground patches without physical illumination on intervening geometry. Full mode now supports all 17 vehicle headlight beams and all 17 road/runway beacon emitters simultaneously. Light sources are separate from the visible lamp geometry and remain active when their emitters are occluded; opaque objects still naturally cover the lamp/glow itself. The existing projected patches remain optional visual accents, not the sole source of illumination.

Full mode uses 43 lights including the existing nine scene lights, with no additional shadow maps. **Real headlight count** and **Real beacon light count** default to 17; lower values explicitly prioritize nearby sources for speed and trade distant physical spill for performance. The two roof-lamp pairs retain separate emitters. Material settings, colors, ranges and other tuning controls remain available. Existing saved configurations acquire full counts on reload.

Verification: 19 tests across 8 suites plus lint, build and asset checks pass. Added coverage confirms all 34 vehicle emitters remain illuminated with a foreground blocker and after camera movement, and that explicit reduced counts take effect. Browser testing disabled projected road pools and placed a temporary opaque block over the white backup vehicle's lamps: ground/nearby-surface illumination remained visible. The block was removed after testing. A desktop-browser observation at 1280×720 / DPR 1 settled near 60 fps, which does not establish real-phone performance. Final appearance and performance remain for Tommy's review; nothing committed or deployed.

Paired amber timing now alternates strictly every half flash cycle on `runwayBackup` and `orangeRunwayCar1`. At the default 1.25-second cycle, sides switch every 0.625 seconds. Each paired mesh uses a cloned geometry with two triangle/material groups so each physical lamp can have independent emission. Its halo and real spill use the same on/off phase, with zero emission/glow/spill on the inactive side. Original GLTF geometry/materials are restored on cleanup. The added timing regression covers both vehicles over a full cycle, independent materials, unchanged triangle count, halo/spill synchronization and resource restoration (20 tests total). Single beacons and red/blue bars retain their prior timing.

### Sequenced ground lights

The five white fixtures in `runway_lights_white` now chase from positive Z toward the green threshold at negative Z. The default cycle is 0.5 seconds: five 70 ms flashes, followed by a 150 ms reset gap. The red end and green threshold rows remain steady. This adapts the FAA approach-light "rabbit" effect to the model's existing outer strip; the strip is not a full, standards-compliant approach lighting installation. Reference: https://www.faa.gov/air_traffic/publications/atpubs/aim_html/chap2_section_1.html (2-1-1, 2-1-4, 2-1-5).

The development Lighting controls > Runway ground lights section provides a sequence toggle, cycle duration, and flash brightness. Turning the sequence off restores the original steady white emission. Settings persist with the other lighting controls. Flashes continue while vehicle movement is paused and stop advancing before Start or while the tab is hidden.

Only the white strip's cloned geometry and material are modified. A per-fixture attribute and five shader uniforms animate the existing single draw call, with no additional real-time lights, meshes, textures, or per-frame React updates. Clones are explicitly disposed on unmount; the shared GLTF resources and other white signs/lights are unchanged. Tests cover whole-fixture grouping, direction, two complete cycles, the reset gap, adjusted speed, steady fallback, shared-resource isolation and disposal. All 21 tests pass with two workers.

### Steady red and green marker visibility

Red and green end fixtures now use dedicated opaque, self-lit lens materials, with pale hot centers, saturated colored halos above each lamp cap, and small additive pavement glows. These remain steady. The old red material was shared with vehicle taillights and included transmission; these changes leave that original material and cached GLTF geometry untouched.

Each row uses one existing lens mesh, one batched Points halo draw and one instanced pavement-glow draw. No point lights or shadow maps were added. All generated materials, geometry, instance buffers and halo textures are explicitly disposed; shared model geometry is retained. The ground-light controls now include Red / green lamp brightness (0–3) and Red / green glow (0–1). Settings restore safely from older browser saves, and the control sliders tolerate newly introduced values during development hot reload.

### Approved lighting defaults (2026-11-01)

The user supplied an exported airportfolio-lighting.json after visual tuning. Its complete contents are preserved unchanged in src/components/airport-lighting/lighting-defaults.json and imported as the single source of lightingDefaults and vehicleLightingDefaults. The earlier exploratory values recorded above are historical; this preset takes precedence. Production builds and fresh development sessions use it without relying on browser localStorage. Development controls still save subsequent adjustments locally, and Reset all restores this approved preset.

The approved settings include exposure 0.46, hemisphere disabled (stored strength 0.59), reflection strength 0.33, moon strength 0.87, street intensity 280, headlight intensity 130, beacon intensity 25 with a 0.8 second cycle, ground flash strength 10, and steady marker brightness/glow 3/1. Shadows are enabled in this export, with contact opacity 0; this intentionally supersedes the earlier temporary shadows-off default. All positions, colors, reflection-panel settings and remaining controls are retained exactly.

Validation checks round-trip the entire preset without clamping or omitted fields. All 23 tests pass. The user authorized committing and pushing the reviewed lighting and board changes; no production deployment is part of that request.

### Terminal interior lighting preview

Added an uncommitted terminal-lighting trial. The original dark-glass GLTF material has approximately 6.36% transmission and is shared by terminal glazing and the tower cab. TerminalGlass clones that material, preserves its blue reflection/emission, and adds warm window illumination with stable per-bay brightness variation and horizontal ceiling-light bands. The added emission is restricted to vertical terminal glazing below 15.5 world units; the tower cab is excluded. This is an inexpensive suggested interior on the existing glazing, not additional interior rooms or furniture. Glass transmission is adjustable (default 0.12), and switching the effect off restores the original transmission and emission appearance. Generated material resources are explicitly disposed without disposing the cached model geometry/material.

Two real spotlights flank the revolving-door entrance at Z 8.1 and 12.8, giving nearby surfaces a warm spill. They cast no shadows. Their light count remains constant and disabling them sets intensity to zero, avoiding whole-scene shader rebuilds during comparison. Window bands add no meshes, lights, textures or animation timers. The existing user-approved lighting-defaults.json is unchanged; experimental terminal defaults are layered on separately.

Lighting controls > Terminal interior provides the main switch, color, window illumination, ceiling-strip brightness, room variation, glass transmission, and separate entrance-spill switch/intensity/range. Old browser saves receive the new controls without losing prior settings. New values save/export with the other settings. Development URL ?terminalReview opens a view of the terminal facade for comparison.

Validation: all 25 tests pass, including shared-material preservation, disabling/restoration, disposal, old-save migration and control bounds. Lint, production build and asset verification pass. Browser checks confirm the visible on/off difference, window-brightness changes, independent entrance-spill toggling, saved-state persistence across reopening the preview, and no rendering errors. This trial remains uncommitted and undeployed pending visual review.

### Shared control tower lighting

The tower cab now receives the same warm window illumination, ceiling band and per-pane brightness variation as the terminal, using the existing Terminal interior controls and main switch. The ceiling band is fitted to the actual cab glazing bounds (Y 30.68257–32.43118), instead of repeating the terminal's floor spacing up the tower. Pane variation uses both horizontal axes around the cabin. No geometry, textures, lights or shadow passes were added for the tower. Entrance spill remains at the terminal doors. The original glass appearance is restored for both when the main interior switch is off.

The earlier terminal-only height mask described above is superseded by this shared treatment. Development preview ?terminalReview=tower focuses the tower cabin for inspection on narrow screens. This extension remains uncommitted for review.
