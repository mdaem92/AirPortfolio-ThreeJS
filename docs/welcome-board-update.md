# Welcome departures board

Integrated the approved concept 1 split-flap prototype into the physical welcome billboard. Approved for commit and push after visual review on 2026-11-01; production deployment is separate.

- The board uses a transformed Drei Html surface fitted to the existing LCD; its frame and the other airport screens remain in the model. It uses local HTML/CSS, without a new dependency or external font download.
- About Me, Projects, Skills and LinkedIn are real buttons connected to the existing scene actions. The old welcome hit meshes have been removed so their positions cannot trigger the wrong destination through the new rows.
- Flight, destination, gate and status characters reveal with staggered 210 ms flips. Hover or keyboard focus refreshes flight, gate and status while keeping destination names readable. Hinges divide each character tile at exactly 50%.
- Animation respects reduced motion, settles when the tab is hidden, and cancels pending animations and timers when leaving the board or unmounting. It does not run an endless idle loop.
- Footer controls select free camera, focus the board and switch scene audio on/off. Audio still requires Start and an active tab.
- Camera focus runs after OrbitControls and before Html projection, keeping the DOM screen aligned with the WebGL frame. Focus distance fits the board to the viewport and brings it closer on desktop for readability.
- Shadows remain off by default; vehicle headlights and the accepted police-light effect are unchanged.

Validation: automated coverage includes destination/footer routing, reduced-motion rendering, animation/timer cleanup and inert hidden content. All 12 tests pass with `npm test -- --maxWorkers=2`; lint, production build and public-asset checks pass separately. The unrestricted test run intermittently crashes a Windows worker during startup, so the final run limits worker concurrency. Browser checks cover About Me/back, Projects, Skills/back, free-camera dragging, Escape return, sound-toggle state, and desktop/390×844 framing. Phone framing was checked in a desktop browser; real-device visual review remains with Tommy. The existing bundle-size and Three.Clock deprecation notices remain.

The intro sits above scene HTML, and the billboard mounts only after Start and while its scene section is active, preventing an invisible wrapper from intercepting the Start button.

Replaced center-ray occlusion with Drei's blending occlusion and an explicit 5.905 × 3.316 backing plane. Foreground geometry masks only the pixels it covers, rather than hiding the complete board. A temporary centered box confirmed partial masking in the browser and was then removed. Free-camera input continues through the Canvas event container. The Html board unmounts when visiting another section so it cannot leave an empty opening over About, Projects or Skills. Implementation reference: https://drei.docs.pmnd.rs/misc/html#blending-occlusion .
