export const baselineEnabled = new URLSearchParams(window.location.search).has('performanceBaseline')

export function baselineMark(stage, detail = {}) {
    if (!baselineEnabled) return
    performance.mark(`airportfolio:${stage}`, { detail })
    window.dispatchEvent(new CustomEvent('airportfolio:baseline', { detail: { stage, ...detail } }))
}
