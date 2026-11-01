import { Float32BufferAttribute } from 'three'

export function createRunwayGroundSequence(originalGeometry, originalMaterial) {
    const geometry = originalGeometry.clone()
    const positions = geometry.getAttribute('position')
    const sorted = Array.from({ length: positions.count }, (_, index) => positions.getZ(index)).sort((a, b) => a - b)
    const bands = []
    for (const z of sorted) {
        const last = bands.at(-1)
        if (!last || z - last.max > 0.5) bands.push({ min: z, max: z })
        else last.max = z
    }
    // Rank whole fixtures toward the green threshold at negative Z.
    bands.reverse()
    geometry.setAttribute('groundLightIndex', new Float32BufferAttribute(Array.from({ length: positions.count }, (_, index) => bands.findIndex(band => positions.getZ(index) >= band.min && positions.getZ(index) <= band.max)), 1))
    const strengths = new Float32Array(bands.length).fill(1)
    const material = originalMaterial.clone()
    material.onBeforeCompile = shader => {
        shader.uniforms.groundStrengths = { value: strengths }
        shader.vertexShader = `attribute float groundLightIndex; uniform float groundStrengths[${bands.length}]; varying float vGroundStrength;\n${shader.vertexShader}`
            .replace('#include <begin_vertex>', '#include <begin_vertex>\nvGroundStrength = groundStrengths[int(groundLightIndex)];')
        shader.fragmentShader = `varying float vGroundStrength;\n${shader.fragmentShader}`
            .replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\ntotalEmissiveRadiance *= vGroundStrength;')
    }
    material.customProgramCacheKey = () => `runway-ground-sequence-${bands.length}`
    return { geometry, material, strengths, dispose() { geometry.dispose(); material.dispose() } }
}

export function updateRunwayGroundSequence(sequence, elapsed, settings) {
    const { strengths } = sequence
    // Sweep for 70% of each half-second cycle, then leave a short reset gap.
    const progress = (elapsed % settings.period) / settings.period / 0.7 * strengths.length
    for (let index = 0; index < strengths.length; index += 1) {
        strengths[index] = settings.enabled
            ? (progress >= index && progress < index + 1 ? settings.brightness : 0.08)
            : 1
    }
}
