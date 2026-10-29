# Step four: UI-library modernization

Status: Tommy authorized committing and pushing steps four and five on 2026-10-29 after reviewing the previews. Step three was approved and pushed as `38c0e47`. No deployment.

## Migration stages

1. styled-components 5.3.5 → 6.6.0: tests and build passed. Changed styling-only props to transient `$isMobile` / `$audioPlaying`; made nested pseudo-selectors explicit with `&`.
2. Ant Design 4.23.1 → 4.24.16: build passed before moving to v5.
3. Ant Design 4.24.16 → 5.29.3: replaced obsolete full CSS imports with the supported reset and a local ConfigProvider theme; tests and build passed.
4. Ant Design 5.29.3 → 6.6.8 with icons 6.3.4: final tests/build passed. Updated react-spinners to 0.17.1.
5. Updated Testing Library React 16.3.3, jest-dom 7.0.1 and user-event 14.6.8, with explicit DOM peer 10.4.2. The existing tests pass on React 18.2.0.

React, React DOM, Three, Fiber and Drei remain at their pre-step versions. No forced dependency resolutions were introduced.

## Appearance compatibility

- Keep the blue `#1890ff` accent, 32-pixel controls, 14-pixel button type and compact border radius via the project theme.
- Preserve the original global 14-pixel/22-pixel line height and link colors after removal of Ant v4's global CSS. This is particularly relevant to non-Ant overlays such as Skills and Credits.
- Preserve mobile breakpoints/offsets through transient styling props. Preserve the 8-pixel blue carousel dots and top-aligned back icon through explicit v6 tokens/styles.
- Existing translucent/soft 3D HTML overlays remain; this stage does not redesign them.
- Ant v6 uses CSS variables and CSS-in-JS; the declared modern-browser targets from step three support these features.

## Verification

- Final five tests in four suites pass; ESLint and Vite production build pass.
- Frozen offline Yarn installation passes. The previous missing react-is / Testing Library DOM peer warnings no longer appear in the final install.
- Production browser: Start loads, project overlay renders, carousel dot 2 selects DBT Therapy, and project back returns home. Mobile project layout and dot/button rendering were also checked.
- Inspected the desktop scene/carousel against the preserved baseline; checked DOM for leaked isMobile/audioPlaying attributes (none).
- Output gzip: JavaScript 362.27 kB + CSS 1.24 kB = 363.51 kB, versus 394.03 kB combined at step three. CSS-in-JS shifts styling into JavaScript, so compare combined output. Static models/audio/images are additional payload.
- The large JavaScript chunk notice remains visible and is deferred to performance work.

## Security snapshot

Details and dependency paths: [step-four-audit.json](step-four-audit.json).

Distinct advisories fell from 12 to 6: **0 critical, 2 high, 4 moderate**. Repeated-path counts are 19 (4 high, 15 moderate), compared with 44 in step three. Dependency count reported by Yarn is 401.

The critical Babel traverse dependency under old styled-components is gone. The remaining high lodash/lodash.pick and moderate lodash/fflate findings are reached through old Drei. A moderate Babel runtime advisory has paths through Drei, Ant Design and test-only Testing Library DOM. Package-tree presence does not prove exploitable application input; review those paths in the React/3D stage and later dependency maintenance.

## Acceptance

Visual review is pending. Actual audio playback and real-device coverage remain manual checks. No hosted deployment was performed. Baseline screenshots remain tracked; new review images stay outside the repository.

Migration references:

- https://styled-components.com/docs/faqs
- https://5x-ant-design.antgroup.com/docs/react/migration-v5
- https://ant.design/docs/react/migration-v6/
