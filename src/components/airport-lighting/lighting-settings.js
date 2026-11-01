import approvedLighting from './lighting-defaults.json'

// Approved browser export: shared by production and fresh development sessions.
export const lightingDefaults = approvedLighting
export const vehicleLightingDefaults = lightingDefaults.vehicles

const storageKey = 'airportfolio-lighting-v1'

// Accept only known keys, finite numbers and matching data types from storage.
export function restoreLightingSettings(saved, defaults = lightingDefaults, path = []) {
    if (Array.isArray(defaults)) return defaults.map((value, index) => restoreLightingSettings(saved?.[index], value, [...path, index]))
    if (defaults && typeof defaults === 'object') return Object.fromEntries(Object.entries(defaults).map(([key, value]) => [key, restoreLightingSettings(saved?.[key], value, [...path, key])]))
    if (typeof defaults === 'number') {
        if (typeof saved !== 'number' || !Number.isFinite(saved)) return defaults
        const key = path.at(-1)
        if (path[0] === 'runwayGround' && key === 'steadyBrightness') return Math.max(0, Math.min(3, saved))
        if (path[0] === 'runwayGround' && key === 'steadyGlow') return Math.max(0, Math.min(1, saved))
        if (path[0] === 'runwayGround' && key === 'brightness') return Math.max(0, Math.min(10, saved))
        if (key === 'mapSize') return [512, 1024, 2048].includes(saved) ? saved : defaults
        if (key === 'resolution') return [64, 128, 256].includes(saved) ? saved : defaults
        if (key === 'maxLights') return Math.round(Math.max(2, Math.min(17, saved)))
        const bounds = { exposure: [0.1, 3], period: [0.4, 4], angle: [Math.PI / 36, Math.PI * 85 / 180], distance: [1, 50], penumbra: [0, 1], decay: [0, 3], glow: [0, 1], poolOpacity: [0, 1], halo: [0, 1], emissive: [0, 10], intensity: [0, 1000], contactOpacity: [0, 0.6], radius: [0, 6], normalBias: [0, 1], bias: [-0.01, 0.01], brightness: [0, 3] }
        const [min, max] = path.includes('position') || path.includes('target') ? [-100, 100] : path.includes('rotation') ? [-Math.PI, Math.PI] : path.includes('scale') ? [0.1, 100] : bounds[key] ?? [0, 1000]
        return Math.max(min, Math.min(max, saved))
    }
    if (typeof defaults === 'string') return /^#[0-9a-f]{6}$/i.test(defaults) && /^#[0-9a-f]{6}$/i.test(saved) ? saved : defaults
    return typeof saved === typeof defaults ? saved : defaults
}

export function loadLightingSettings() {
    if (!import.meta.env.DEV) return lightingDefaults
    try { return restoreLightingSettings(JSON.parse(localStorage.getItem(storageKey))) }
    catch { return lightingDefaults }
}

export function saveLightingSettings(settings) {
    try { localStorage.setItem(storageKey, JSON.stringify(settings)) }
    catch { /* The live controls still work if browser storage is unavailable. */ }
}

export function updateLightingSetting(settings, path, value) {
    if (!path.length) return value
    const [key, ...remaining] = path
    const next = Array.isArray(settings) ? [...settings] : { ...settings }
    next[key] = updateLightingSetting(settings[key], remaining, value)
    return next
}
