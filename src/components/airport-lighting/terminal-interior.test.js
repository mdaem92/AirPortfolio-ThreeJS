import { MeshPhysicalMaterial } from 'three'
import { createTerminalGlass, terminalInteriorDefaults, updateTerminalGlass } from './terminal-interior'
import { lightingDefaults, restoreLightingSettings, updateLightingSetting } from './lighting-settings'

test('terminal lighting switches back to original glass without changing shared model resources', () => {
    const original = new MeshPhysicalMaterial({ color: '#526477', emissive: '#182536', transmission: 0.0636 })
    const state = createTerminalGlass(original)
    updateTerminalGlass(state, terminalInteriorDefaults)
    expect(state.uniforms.terminalWindow.value).toBe(1.3)
    expect(state.uniforms.terminalCeiling.value).toBe(1.8)
    expect(state.material.transmission).toBe(0.12)
    expect(original.transmission).toBe(0.0636)
    expect(original.emissive.getHexString()).toBe('182536')
    updateTerminalGlass(state, { ...terminalInteriorDefaults, enabled: false })
    expect(state.uniforms.terminalWindow.value).toBe(0)
    expect(state.uniforms.terminalCeiling.value).toBe(0)
    expect(state.material.transmission).toBe(original.transmission)
    const disposeOriginal = vi.spyOn(original, 'dispose')
    const disposeClone = vi.spyOn(state.material, 'dispose')
    state.dispose()
    expect(disposeClone).toHaveBeenCalledOnce()
    expect(disposeOriginal).not.toHaveBeenCalled()
    original.dispose()
})

test('older saved lighting gets terminal controls and edits preserve every existing setting', () => {
    const legacy = { ...lightingDefaults }
    delete legacy.terminalInterior
    const changed = updateLightingSetting(legacy, ['terminalInterior', 'windowBrightness'], 2)
    expect(changed.terminalInterior).toEqual({ ...terminalInteriorDefaults, windowBrightness: 2 })
    expect(changed.vehicles).toBe(legacy.vehicles)
    const restored = restoreLightingSettings({ ...legacy, terminalInterior: { spillIntensity: Infinity, variation: 10, transmission: -1 } })
    expect(restored.terminalInterior.spillIntensity).toBe(65)
    expect(restored.terminalInterior.variation).toBe(1)
    expect(restored.terminalInterior.transmission).toBe(0)
})
