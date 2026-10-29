# Step five: React and 3D modernization

Status: Tommy authorized committing and pushing steps four and five on 2026-10-29 after reviewing the previews. The previous pushed commit was `38c0e47`. No deployment. Remaining manual audio/device checks are recorded below.

## Final compatible versions

| Package | Before this step | Final |
| --- | --- | --- |
| React / React DOM | 18.2.0 | 19.3.1 |
| React Three Fiber | 8.3.1 | 9.8.2 |
| Drei | 9.31.1 | 10.7.9 |
| Three | 0.143.0 | 0.186.1 |

Added the renderer dependencies' type peers as development dependencies: React/DOM types 19.3.0 and Three types 0.186.0. This is still a JavaScript project. React Howler remains at its current published 5.2.0 release; its activation rules continue to be covered by the existing audio-gating tests.

## Staged checks

- React 18.3.1 preparatory upgrade: all five tests and production build passed.
- Three r153 with the old renderer stack: build exposed removed exports (`DataTexture3D` and legacy luminance constants) imported by old three-stdlib. That intermediate combination was not retained.
- React 19 / Fiber 9 / Drei 10 with Three r163: tests and build passed, resolving the obsolete loader imports.
- Three r173, r183 and r186.1: each production build passed.
- Final React 19 test run: all five tests in four suites pass. Final ESLint/build and frozen offline install pass.

## Renderer changes and visual compatibility

- Removed the obsolete `physicallyCorrectLights` assignment. Modern Three uses physically correct lighting by default.
- Explicitly retain sRGB output, ACES filmic tone mapping and exposure 1.
- Preserve the original night sky with a background-only color conversion. Three r143 cleared with raw linear components, while modern Three converts the background to the output color space; without compensation the old color literal appears brighter. This does not change material/texture color handling globally.
- Compared a sky region `(20,5)` to `(80,30)` in baseline and upgraded desktop JPEGs: both have median RGB `(1,1,11)`. Animated objects/stars and changes within the renderer make full-image exact equality unsuitable.
- GLTF meshes/materials remain unchanged. The model still contains 20 animation clips; visible vehicles animate in the preview.
- Preserve the existing positional sounds, camera positions, focus toggle and About back-arrow behavior.

## Validation evidence

- Production preview at http://127.0.0.1:4173 loads the scene and Start correctly.
- Desktop checks: About and its back arrow, focus → free-camera toggle, Credits and Credits back control passed.
- At 390×844, home/Projects rendered, carousel dot 2 selected DBT Therapy, and the back control returned home. Development server scene startup also passed.
- All 21 public assets serve with bytes matching the source.
- Source lint has zero warnings/errors. The browser log contains a `THREE.Clock` deprecation emitted by Fiber's own internal store; the application does not instantiate Clock. This remains visible and is not suppressed or patched in node_modules.
- Gzip output: JavaScript 436.20 kB + CSS 1.24 kB = 437.44 kB, compared with step four's 363.51 kB combined. The newer renderer stack adds roughly 74 kB gzip; Vite's large-chunk notice remains. Code splitting and device performance checks are follow-up work, not a claimed performance improvement.

## Security snapshot

Detailed paths: [step-five-audit.json](step-five-audit.json).

There are **2 distinct moderate advisories, 0 high and 0 critical** (10 repeated-path findings). Yarn reports 396 dependencies.

- Babel runtime RegExp complexity: paths through Fiber, Ant Design and test-only Testing Library helpers; review the generated RegExp/input exposure and compatible patch resolution during final maintenance.
- fflate ZIP64 parsing: a Drei dependency path; the portfolio loads a trusted bundled GLB and has no untrusted ZIP-upload flow. Review patched transitive versions during final maintenance rather than claiming no risk based solely on static hosting.

## Acceptance limits

Visual acceptance remains Tommy's decision. Audio component activation/visibility is tested with a mock; actual speaker output, background stop/restart and real-device performance need a manual check. Narrow desktop viewport testing does not establish phone GPU performance. Three r163+ requires WebGL2. Hosted Firebase verification remains pending, and no deployment occurred.

Baseline captures remain tracked. Step-five review images are outside the repository.

References:

- https://react.dev/blog/2024/04/25/react-19-upgrade-guide
- https://r3f.docs.pmnd.rs/tutorials/v9-migration-guide
- https://github.com/mrdoob/three.js/wiki/Migration-Guide
- https://raw.githubusercontent.com/mrdoob/three.js/r143/src/renderers/webgl/WebGLBackground.js
- https://raw.githubusercontent.com/mrdoob/three.js/r186/src/renderers/webgl/WebGLBackground.js
