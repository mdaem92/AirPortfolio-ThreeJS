# Camera navigation review

The user confirmed that the navigation lag disappeared with the single camera controller, but reported that the straight route intersected the terminal and the final section framing changed. These are separate from the original frame-time symptom.

## Implemented

- One delta-based controller owns camera position and orientation while focused. OrbitControls is disabled until free camera is selected. Look Around smoothly returns to the original scene-centered orbit target (normally 0, 0, 0) and original distance/polar limits before handing control back, rather than orbiting the focused board. Review-camera initial targets remain intact. Flights stop writing after arrival and support interruption.
- Welcome-board content stays static during travel. Split-flap timers and hover animation listeners start only after arrival; cleanup cancels pending animations when departing. Reduced-motion behavior remains supported.
- Skills, Projects and Credits retain the actual legacy settled framing. Their old configured positions were never reached because OrbitControls continuously enforced its origin-centered distance/polar limits. The new controller computes that settled framing without recreating competing live camera updates.
- Cross-terminal flights use an elevated arc. The selected landmark becomes the viewing target after a brief smooth turn, rather than interpolating endpoint rotations throughout the entire flight. Main and About retain responsive board fitting.

## Validation

31 tests pass, including frame-rate independent arrival, interruption, real OrbitControls handoff without snapping, legacy framing, terminal-roof clearance on the Main/Skills/Projects routes, and no flap animation before arrival. Production build/lint and asset verification pass.

Before the framing/path follow-up, a fixed 1280 x 720 production preview on RTX 3060 Ti recorded Projects-to-Main worst frame 23.4 ms and Skills-to-Main 22.9 ms, with no frames above 33 ms in either 5-second sample. Arrival-to-first-flip was 11.3 ms and 10.5 ms respectively: the animation starts on the following frame. These are local observations, not phone results or a guarantee for other hardware. The later arc/framing correction needs user visual review; do not treat those earlier numbers as a fresh measurement of the corrected path.

No lighting quality, light counts, geometry, DPR or shadow presets changed. Shader/loading and overlay-preparation work remain separate later steps. Nothing committed, pushed or deployed.
