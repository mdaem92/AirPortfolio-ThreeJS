import { summarizeFrames } from './baseline-metrics'

test('frame summaries retain tail latency, frame-budget violations and full-frame render counts', () => {
    const frames = Array.from({ length: 100 }, (_, index) => ({ frameMs: index < 95 ? 16 : index === 99 ? 120 : 40, cpuMs: 5, calls: 120, triangles: 900000, programs: index < 50 ? 12 : 14, hidden: index === 0 }))
    const summary = summarizeFrames(frames)
    expect(summary.frameMs).toEqual({ p50: 16, p95: 16, p99: 40, max: 120 })
    expect(summary.over33ms).toBe(5)
    expect(summary.over50ms).toBe(1)
    expect(summary.drawCalls.max).toBe(120)
    expect(summary.triangles.max).toBe(900000)
    expect(summary.programs).toEqual({ first: 12, last: 14 })
    expect(summary.hiddenFrames).toBe(1)
    expect(summarizeFrames([]).frameMs.max).toBeNull()
})
