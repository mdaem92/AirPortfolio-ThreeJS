# Step 1: local performance baseline

Measured the production preview on 2026-11-02 (Europe/Paris). No optimization or camera behavior changes have been applied. Nothing committed, pushed or deployed. Existing terminal/tower lighting changes remain in the measured build.

## Scope and conditions

- Local Vite production preview: `http://127.0.0.1:4177/?performanceBaseline`.
- Windows Chrome 156, ANGLE/D3D11, NVIDIA GeForce RTX 3060 Ti, DPR 1.
- Desktop: 1280 × 720, approved desktop shadows on. Narrow layout: 390 × 844 on the **same desktop GPU**, existing responsive shadows policy off. This is **not a physical phone baseline**. Real-phone CPU/GPU, touch, network and thermal measurements remain outstanding.
- All production lighting settings are the approved JSON plus the current terminal/tower default settings. No browser-local development overrides are applied in production mode. Original GLB SHA-256: `470f281e5561ceaa2c75ee3a5923f0d0c2872b692232e31f578cfde682a75507`; approved preset SHA-256: `9bf65cd9d5c964e25728ddacb98ceb0949e99dc9434c2a56a352909cb1b65295`.
- Five-second measurement windows include travel and settling. Record first interval from the input marker so interaction stalls are included. Counter reset occurs once before the complete render frame, with capture after rendering, including shadow/transmission/reflection passes. CPU submission time includes synchronous renderer/driver work, **not GPU execution time**. Browser frame intervals include scheduling/compositing effects.
- The optional measurement chunk is loaded only with `performanceBaseline`. It changes no light counts, geometry, camera algorithms or transition timing. DOM status updates occur at sample boundaries, not every frame. Measurement overhead remains nonzero. The native browser's production decoder resources were already potentially cached; no GPU/driver cache was cleared.

## Main finding: camera control contention

After five seconds, Projects' measured camera position was `[-42.76, 7.57, 39.80]`, compared with the requested `[-27.58, 4.88, 25.66]`: approximately **20.9 world units** away. Skills ended at `[-55.35, 8.14, -8.79]`, compared with `[-25.69, 3.78, -4.08]`: approximately **30.3 world units** away. The narrow layout reproduces essentially the same endpoint discrepancy.

These measurements support the source finding that OrbitControls and the route lerp both write to the camera. The non-About branch retains a 60-unit minimum orbit distance from the orbit target while Skills/Projects request positions closer to that target. Their repeated writes can settle into a compromise rather than the requested endpoint. A frame-rate-only optimization cannot correct this behavior.

The user's main symptom is **returning to the welcome board**, not departing it. That is the primary acceptance route for step 2. On return, the welcome Html board remounts and all split-flap entry animations restart immediately during camera movement. Outbound routes remove that work and defer overlays by fixed delays. This is an additional source-based candidate, not a proven sole cause of the lag.

## Desktop navigation results

| Five-second route window | Median frame | p95 frame | Worst frame | p95 CPU submission |
| --- | ---: | ---: | ---: | ---: |
| First Main → Skills | 16.6 ms | 18.5 ms | 28.1 ms | 6.9 ms |
| First Skills → Main | 16.6 ms | 18.7 ms | 50.2 ms | 7.3 ms |
| First Main → Projects | 16.6 ms | 19.0 ms | 44.0 ms | 7.3 ms |
| Repeated Main → Skills, matched desktop viewport | 16.6 ms | 18.3 ms | 21.1 ms | 8.6 ms |
| Repeated Skills → Main, matched desktop viewport | 16.7 ms | 19.2 ms | 29.3 ms | 8.2 ms |
| Repeated Main → Projects, matched desktop viewport | 16.6 ms | 18.3 ms | 25.9 ms | 7.2 ms |
| Repeated Projects → Main, matched desktop viewport | 16.6 ms | 19.2 ms | 29.2 ms | 7.8 ms |
| Cached-run Projects → Main | 16.6 ms | 18.5 ms | 38.9 ms | 6.7 ms |
| Cached-run Skills → Main | 16.6 ms | 18.3 ms | 28.5 ms | 6.8 ms |
| Settled Main | 16.6 ms | 18.1 ms | 19.9 ms | 7.3 ms |

There is no sustained low frame rate on this desktop GPU in the valid samples. Occasional spikes and uneven camera motion remain relevant. The strongest return spike in the initial valid desktop sample was 50.2 ms. The local measurements do **not** reproduce a severe sustained return-frame collapse, so the user's stronger perceptual/phone symptom should not be dismissed or claimed fully diagnosed.

The return from Skills reached approximately **1.84 million triangles in a complete frame** during travel, compared with about 1.42 million around settled Main; there are roughly 460–490 draw calls at Main in the recorded full-pass counters. These are multi-pass totals, not unique scene geometry. Return-to-Main adds the board materials back, increasing the program count from 30 to 32 in the cached desktop run; this does not prove that both programs require expensive recompilation on each return.

Projects' cached-run 53.7 ms spike occurred around 1,859 ms after navigation, near its delayed overlay mount at 1,852 ms. Skills' overlay appeared around 2,011 ms. This supports inspecting UI preparation separately from camera movement in step 3.

## Loading results

| Load sample | First contentful paint | Model resource duration | Logical scene-ready marker | First rendered frame finished, approximately |
| --- | ---: | ---: | ---: | ---: |
| Initial same-origin transfer | 324 ms | 91 ms | 733 ms | 7.63 s |
| Cached/revalidated desktop reload | 132 ms | 29 ms | 502 ms | 3.23 s |
| Cached/revalidated narrow layout | 188 ms | 21 ms | 543 ms | 4.90 s |

Initial desktop rendering recorded **6.895 s** of synchronous CPU submission/driver work. Cached desktop rendering still recorded **2.727 s**; narrow rendering recorded **4.351 s**. The logical scene-ready marker is therefore not an accurate measure of when Start can be painted and used smoothly. These are first-render preparation stalls; the instrumentation does not separate shader compilation, buffer upload, reflection capture, driver work and other first-render costs into individual causes.

The initial model response transferred about 3.22 MB over local loopback. Cached responses transferred 300 bytes (HTTP revalidation headers), reusing the model body. These network times do not represent internet or phone network performance. Same-origin JS used about 465 KB compressed in the initial transfer; it was also revalidated on reload. Audio resource requests occurred after Start, except the small button sound loaded earlier; audio is not the prerequisite responsible for the main initial ready delay.

## Narrow-layout findings

Using the same desktop GPU at 390 × 844, returns from Skills and Projects had worst frames of 27.7 and 25.9 ms. First Skills entry had a **381.6 ms** frame / **373 ms** long task while two additional programs appeared. Projects' first entry peaked at 31.9 ms near the delayed overlay. These responsive-layout results must not be presented as phone-speed measurements.

## Measurement limitations and anomalies

- During the initial run, the preview unexpectedly changed from 1280 × 720 to 521 × 1285, switching the responsive shadow policy. Its 4.318 s shader/render long task and subsequent 354.4 ms return spike are **not valid fixed-condition navigation comparisons**. They are retained in the raw initial file with their actual contexts. The matched desktop return comparisons were rerun. Later instrumentation explicitly flags viewport/context changes during a sample.
- Semantic mouse automation on the perspective-transformed welcome board triggered the existing scroll-container displacement/white-opening issue. Outbound navigation was then activated with the real button's Enter key; section back arrows were clicked normally. No app CSS or navigation fix was made during step 1. Pointer/focus displacement should remain a separate regression check.
- The benchmark panel observes frame scheduling, not a CPU flame graph or GPU timer trace. HTML split-flap layout/compositing work is not individually attributed. Full CPU/GPU tracing and physical-phone testing remain useful follow-ups.
- No repeated-load statistics, device-wide refresh-rate survey or throttled internet simulation are claimed. Asset transfer, decoding/React mounting, and first rendering are distinguished only by the available resource/scene/frame markers.

## Next step, after review

Implement only step 2: a single camera transition owner, time-based motion, stable position/target ordering and a synchronized handoff to OrbitControls. Preserve lighting, geometry, destinations, board visuals and animation. Compare both section → Main routes first, including camera endpoint and frame-time tails. If the return still feels uneven after the camera correction, isolate board remount/flip preparation as a separate measured change in step 3. Do not implement later steps automatically.

## Reproducing and collecting a real-phone run

Build with `npm run build`, run `npm run preview -- --host 127.0.0.1 --port 4177 --strictPort`, and visit `/?performanceBaseline`. Wait for the initial five-second sample to finish. Click Start, wait for each sample to complete, navigate Main → Skills → Main → Projects → Main, then repeat. Use Sample idle for a settled-view window. Refresh report, expand Results JSON and copy its contents. The report records the active lighting settings, viewport, rendering context, resource timing, long tasks, route/overlay markers, frame-time percentiles, slowest frames and final camera positions. The default site has no measurement panel and does not load the measurement chunk.

A physical phone cannot reach the computer through its own `127.0.0.1`. Use an explicitly arranged device-accessible preview or authorized LAN setup for that follow-up, and record the actual device/browser. No deployment or network-access expansion was performed here.

Raw summaries: `baseline-initial-2026-11-02.json`, `baseline-cached-desktop-2026-11-02.json`, and `baseline-narrow-2026-11-02.json` in this directory. The first file preserves the initial and repeat runs, including excluded resize samples; later files preserve the matched camera-position runs.
