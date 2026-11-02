export function summarizeFrames(frames) {
    const summarize = key => {
        const values = frames.map(frame => frame[key]).sort((a, b) => a - b)
        const percentile = p => values.length ? values[Math.max(0, Math.ceil(values.length * p) - 1)] : null
        return { p50: percentile(0.5), p95: percentile(0.95), p99: percentile(0.99), max: percentile(1) }
    }
    return {
        frames: frames.length,
        frameMs: summarize('frameMs'),
        cpuSubmissionMs: summarize('cpuMs'),
        drawCalls: summarize('calls'), triangles: summarize('triangles'),
        programs: { first: frames[0]?.programs ?? null, last: frames.at(-1)?.programs ?? null },
        over33ms: frames.filter(frame => frame.frameMs > 33.34).length,
        over50ms: frames.filter(frame => frame.frameMs > 50).length,
        hiddenFrames: frames.filter(frame => frame.hidden).length,
    }
}
