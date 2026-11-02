import { lightingDefaults, loadLightingSettings, restoreLightingSettings, saveLightingSettings, updateLightingSetting } from './lighting-settings'
import approvedLighting from './lighting-defaults.json'
import { terminalInteriorDefaults } from './terminal-interior'

afterEach(() => localStorage.clear())

test('editing one light preserves untouched references and original defaults', () => {
    const changed = updateLightingSetting(lightingDefaults, ['directionals', 0, 'intensity'], 0.2)
    expect(changed.directionals[0].intensity).toBe(0.2)
    expect(lightingDefaults.directionals[0].intensity).toBe(0.87)
    expect(changed.environment.panels).toBe(lightingDefaults.environment.panels)
    expect(changed.vehicles).toBe(lightingDefaults.vehicles)
    expect(changed.directionals[1]).toBe(lightingDefaults.directionals[1])
})

test('browser settings survive reload with all independent controls intact', () => {
    const changed = updateLightingSetting(updateLightingSetting(lightingDefaults, ['vehicles', 'police', 'period'], 2), ['hemisphere', 'enabled'], false)
    saveLightingSettings(changed)
    expect(loadLightingSettings()).toEqual(changed)
    saveLightingSettings(lightingDefaults)
    expect(loadLightingSettings()).toEqual(lightingDefaults)
})

test('invalid saved values cannot produce zero flash periods or invalid textures', () => {
    const restored = restoreLightingSettings({
        exposure: NaN,
        hemisphere: { enabled: 'false', sky: 'invalid' },
        vehicles: { police: { period: 0, intensity: Infinity } },
        environment: { resolution: 12345 },
        shadows: { mapSize: 0 },
        unexpected: 'ignored',
    })
    expect(restored.exposure).toBe(0.46)
    expect(restored.hemisphere).toEqual(lightingDefaults.hemisphere)
    expect(restored.vehicles.police.period).toBe(0.4)
    expect(restored.vehicles.police.intensity).toBe(25)
    expect(restored.environment.resolution).toBe(128)
    expect(restored.shadows.mapSize).toBe(1024)
    expect(restored).not.toHaveProperty('unexpected')
    localStorage.setItem('airportfolio-lighting-v1', 'broken json')
    expect(loadLightingSettings()).toEqual(lightingDefaults)
})

test('the approved export supplies complete defaults without browser storage', () => {
    const { enabled, intensity, distance, decay, period, halo, emissive, amber: color } = approvedLighting.vehicles.police
    const expected = { ...approvedLighting, terminalInterior: terminalInteriorDefaults, vehicles: { ...approvedLighting.vehicles, amber: { enabled, intensity, distance, decay, period, halo, emissive, color } } }
    expect(lightingDefaults).toEqual(expected)
    expect(loadLightingSettings()).toEqual(expected)
    expect(restoreLightingSettings(approvedLighting)).toEqual(expected)
    expect(lightingDefaults.hemisphere.enabled).toBe(false)
    expect(lightingDefaults.environment.intensity).toBe(0.33)
    expect(lightingDefaults.shadows.enabled).toBe(true)
    expect(lightingDefaults.shadows.contactOpacity).toBe(0)
})

test('old beacon saves migrate amber tuning and independent amber edits persist', () => {
    const migrated = restoreLightingSettings({ vehicles: { police: { enabled: false, period: 1.7, intensity: 70, amber: '#ffaa11' } } })
    expect(migrated.vehicles.amber).toMatchObject({ enabled: false, period: 1.7, intensity: 70, color: '#ffaa11' })
    const changed = updateLightingSetting(migrated, ['vehicles', 'amber', 'period'], 2.4)
    saveLightingSettings(changed)
    const restored = loadLightingSettings()
    expect(restored.vehicles.amber.period).toBe(2.4)
    expect(restored.vehicles.police.period).toBe(1.7)
})
