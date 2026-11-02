export const terminalInteriorDefaults = {
    enabled: true, color: '#ffe3b5', windowBrightness: 1.3,
    ceilingBrightness: 1.8, variation: 0.65, transmission: 0.12,
    spillEnabled: true, spillIntensity: 65, spillDistance: 12,
}

export function createTerminalGlass(original) {
    const material = original.clone()
    const uniforms = {
        terminalColor: { value: original.color.clone().set(terminalInteriorDefaults.color) },
        terminalWindow: { value: 0 }, terminalCeiling: { value: 0 }, terminalVariation: { value: 0 },
    }
    material.onBeforeCompile = shader => {
        Object.assign(shader.uniforms, uniforms)
        shader.vertexShader = `varying vec3 vTerminalPosition; varying vec3 vTerminalNormal;\n${shader.vertexShader}`
            .replace('#include <begin_vertex>', '#include <begin_vertex>\nvTerminalPosition = position; vTerminalNormal = normal;')
        shader.fragmentShader = `varying vec3 vTerminalPosition; varying vec3 vTerminalNormal;
            uniform vec3 terminalColor; uniform float terminalWindow;
            uniform float terminalCeiling; uniform float terminalVariation;\n${shader.fragmentShader}`
            .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
                // Terminal and tower glass share this mesh and the same controls.
                float tower = smoothstep(25.0, 27.0, vTerminalPosition.y);
                float facade = 1.0 - smoothstep(0.6, 0.9, abs(normalize(vTerminalNormal).y));
                float floorNumber = mix(floor((vTerminalPosition.y - 1.4) / 3.9), 0.0, tower);
                float towerBay = floor((vTerminalPosition.x - 9.0) / 3.5)
                    + 7.0 * floor((vTerminalPosition.z + 33.0) / 3.5);
                float bay = mix(floor((vTerminalPosition.z + 22.0) / 4.5), towerBay, tower);
                float seed = fract(sin(bay * 12.9898 + floorNumber * 78.233) * 43758.5453);
                float occupancy = mix(1.0, mix(0.12, 1.0, smoothstep(0.15, 0.75, seed)), terminalVariation);
                // Fit one ceiling band to the actual 30.683–32.431 tower cab.
                float towerHeight = clamp((vTerminalPosition.y - 30.68257) / 1.74861, 0.0, 1.0) * 3.9;
                float floorHeight = mix(mod(vTerminalPosition.y - 1.4, 3.9), towerHeight, tower);
                float ceiling = smoothstep(2.65, 2.85, floorHeight) * (1.0 - smoothstep(3.1, 3.35, floorHeight));
                float room = 0.22 + 0.13 * smoothstep(0.0, 3.2, floorHeight);
                totalEmissiveRadiance += terminalColor * facade * occupancy
                    * (terminalWindow * room + terminalCeiling * ceiling);
            `)
    }
    material.customProgramCacheKey = () => 'terminal-interior-v2'
    return { material, uniforms, originalTransmission: original.transmission, dispose() { material.dispose() } }
}

export function updateTerminalGlass(state, settings) {
    state.uniforms.terminalColor.value.set(settings.color)
    state.uniforms.terminalWindow.value = settings.enabled ? settings.windowBrightness : 0
    state.uniforms.terminalCeiling.value = settings.enabled ? settings.ceilingBrightness : 0
    state.uniforms.terminalVariation.value = settings.variation
    const transmission = settings.enabled ? settings.transmission : state.originalTransmission
    if ((state.material.transmission > 0) !== (transmission > 0)) state.material.needsUpdate = true
    state.material.transmission = transmission
}
