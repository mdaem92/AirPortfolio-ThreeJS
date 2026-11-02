import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { addAfterEffect, useFrame, useThree } from '@react-three/fiber'
import { summarizeFrames } from './baseline-metrics'

const windows = []
const tasks = []
let active = null
let context = {}
let settings = {}
let idleCount = 0
const visits = {}
const listeners = new Set()
const publish = () => listeners.forEach(listener => listener())
const round = value => Math.round(value * 100) / 100

function startWindow(label, start = performance.now()) {
    if (active) finishWindow('interrupted')
    active = { label, start, lastEnd: start, samples: [], beforeContext: context, contextChanged: false }
    publish()
}

function finishWindow(reason = 'complete') {
    if (!active) return
    const end = performance.now()
    windows.push({ label: active.label, startMs: round(active.start), endMs: round(end), reason,
        context: active.beforeContext, contextChanged: active.contextChanged, ...summarizeFrames(active.samples),
        cameraEnd: active.cameraEnd,
        slowestFrames: [...active.samples].sort((a, b) => b.frameMs - a.frameMs).slice(0, 5),
    })
    active = null
    publish()
}

function report() {
    return {
        schema: 1, capturedAt: new Date().toISOString(), url: location.href,
        userAgent: navigator.userAgent, context, settings,
        note: 'Local production preview. CPU submission is not GPU time. Frame intervals include browser scheduling. Hidden/resized/interrupted samples require caution. Narrow viewport is not a physical phone test.',
        marks: performance.getEntriesByType('mark').filter(entry => entry.name.startsWith('airportfolio:')).map(entry => ({ name: entry.name, startMs: round(entry.startTime), detail: entry.detail })),
        paint: performance.getEntriesByType('paint').map(entry => ({ name: entry.name, startMs: round(entry.startTime) })),
        navigation: performance.getEntriesByType('navigation').map(entry => ({ type: entry.type, domInteractive: round(entry.domInteractive), domContentLoaded: round(entry.domContentLoadedEventEnd), load: round(entry.loadEventEnd) })),
        resources: performance.getEntriesByType('resource').filter(entry => /\.(glb|js|css|png|jpg|jpeg|mp3|wasm)(\?|$)/.test(entry.name)).map(entry => ({ url: entry.name, startMs: round(entry.startTime), endMs: round(entry.responseEnd), durationMs: round(entry.duration), transferBytes: entry.transferSize, encodedBytes: entry.encodedBodySize, decodedBytes: entry.decodedBodySize })),
        longTasksSupported: PerformanceObserver.supportedEntryTypes?.includes('longtask') ?? false,
        longTasks: tasks,
        windows,
        active: active ? { label: active.label, elapsedMs: round(performance.now() - active.start) } : null,
    }
}

export function BaselinePanel() {
    const [snapshot, setSnapshot] = useState(report)
    useEffect(() => {
        const refresh = () => setSnapshot(report())
        listeners.add(refresh)
        return () => listeners.delete(refresh)
    }, [])
    return <aside aria-label="Performance baseline" style={{ position: 'fixed', top: 8, left: 8, zIndex: 1200, width: 'min(300px, calc(100vw - 16px))', maxHeight: '35vh', overflow: 'auto', background: '#07101eed', color: '#e5edf6', padding: 10, border: '1px solid #506780', borderRadius: 5, font: '12px/1.4 monospace' }}>
        <strong>Performance baseline</strong>
        <div role="status">{snapshot.active ? `Sampling ${snapshot.active.label} (5 s)` : `${snapshot.windows.length} samples complete`}</div>
        <button style={{ color: '#07101e', background: '#e5edf6' }} type="button" onClick={() => startWindow(`idle-${++idleCount}`)}>Sample idle (5 s)</button>{' '}
        <button style={{ color: '#07101e', background: '#e5edf6' }} type="button" onClick={() => setSnapshot(report())}>Refresh report</button>
        <details><summary>Results JSON</summary><textarea aria-label="Performance baseline data" readOnly value={JSON.stringify(snapshot, null, 2)} style={{ width: '100%', height: 150, fontSize: 10 }} /></details>
    </aside>
}

export default function BaselineCapture({ lighting }) {
    const { gl, size, camera } = useThree()
    const frame = useRef({ start: 0, previousEnd: 0 })
    useLayoutEffect(() => {
        settings = structuredClone(lighting)
        const debug = gl.getContext().getExtension('WEBGL_debug_renderer_info')
        context = { width: size.width, height: size.height, dpr: gl.getPixelRatio(), shadows: gl.shadowMap.enabled,
            gpu: debug ? gl.getContext().getParameter(debug.UNMASKED_RENDERER_WEBGL) : 'unavailable' }
        if (active && JSON.stringify(active.beforeContext) !== JSON.stringify(context)) active.contextChanged = true
        publish()
    }, [gl, lighting, size])
    useLayoutEffect(() => {
        const previousReset = gl.info.autoReset
        gl.info.autoReset = false
        const dispose = addAfterEffect(() => {
            const now = performance.now()
            if (active) {
                active.samples.push({ offsetMs: round(now - active.start), frameMs: round(now - active.lastEnd), cpuMs: round(now - frame.current.start),
                    calls: gl.info.render.calls, triangles: gl.info.render.triangles, programs: gl.info.programs.length, hidden: document.hidden })
                active.lastEnd = now
                active.cameraEnd = { position: camera.position.toArray().map(round), fov: camera.fov }
            }
            frame.current.previousEnd = now
            if (active && now - active.start >= 5000) finishWindow()
        })
        const onMark = event => {
            const { stage, route } = event.detail
            if (stage === 'start') startWindow('start-first-5s')
            if (stage === 'route') { visits[route] = (visits[route] ?? 0) + 1; startWindow(`${route}-${visits[route]}`) }
        }
        window.addEventListener('airportfolio:baseline', onMark)
        startWindow('scene-initial-5s')
        return () => { dispose(); window.removeEventListener('airportfolio:baseline', onMark); gl.info.autoReset = previousReset; active = null }
    }, [gl, camera])
    useEffect(() => {
        if (!PerformanceObserver.supportedEntryTypes?.includes('longtask')) return
        const observer = new PerformanceObserver(list => {
            tasks.push(...list.getEntries().map(entry => ({ startMs: round(entry.startTime), durationMs: round(entry.duration) })))
        })
        observer.observe({ type: 'longtask', buffered: true })
        return () => observer.disconnect()
    }, [])
    // Reset once per complete frame, so all shadow/transmission passes are counted.
    useFrame(() => { gl.info.reset(); frame.current.start = performance.now() }, -100)
    return null
}
