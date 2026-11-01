import { BoxGeometry, BufferGeometry, Float32BufferAttribute, MeshStandardMaterial } from 'three'
import { createRunwayGroundSequence, updateRunwayGroundSequence } from './runway-ground-sequence'

test('whole fixtures chase from red toward green twice per second, with a reset gap and steady fallback', () => {
    const box = new BoxGeometry(0.34, 0.34, 0.34).toNonIndexed()
    const coordinates = []
    for (const z of [-33, -16.5, 0, 16.5, 33]) {
        const position = box.getAttribute('position')
        for (let i = 0; i < position.count; i += 1) coordinates.push(position.getX(i), position.getY(i), position.getZ(i) + z)
    }
    const original = new BufferGeometry().setAttribute('position', new Float32BufferAttribute(coordinates, 3))
    const material = new MeshStandardMaterial({ emissive: 'white' })
    const sequence = createRunwayGroundSequence(original, material)
    const settings = { enabled: true, period: 0.5, brightness: 6 }
    expect(sequence.strengths).toHaveLength(5)
    const indices = sequence.geometry.getAttribute('groundLightIndex').array
    for (let fixture = 0; fixture < 5; fixture += 1) {
        expect(new Set(indices.slice(fixture * 36, (fixture + 1) * 36))).toEqual(new Set([4 - fixture]))
    }
    for (let cycle = 0; cycle < 2; cycle += 1) {
        for (let lamp = 0; lamp < 5; lamp += 1) {
            updateRunwayGroundSequence(sequence, cycle * 0.5 + (lamp + 0.5) * 0.07, settings)
            expect(Array.from(sequence.strengths).map(value => value > 1)).toEqual(Array.from({ length: 5 }, (_, i) => i === lamp))
        }
        updateRunwayGroundSequence(sequence, cycle * 0.5 + 0.45, settings)
        expect(sequence.strengths.every(value => value < 1)).toBe(true)
    }
    updateRunwayGroundSequence(sequence, 0.12, { ...settings, enabled: false })
    expect(Array.from(sequence.strengths)).toEqual([1, 1, 1, 1, 1])
    updateRunwayGroundSequence(sequence, 1.5 * 0.07 * 4, { ...settings, period: 2 })
    expect(sequence.strengths[1]).toBe(6)
    expect(original.getAttribute('groundLightIndex')).toBeUndefined()
    expect(material.onBeforeCompile).not.toBe(sequence.material.onBeforeCompile)
    const disposedGeometry = vi.spyOn(sequence.geometry, 'dispose')
    const disposedMaterial = vi.spyOn(sequence.material, 'dispose')
    sequence.dispose()
    expect(disposedGeometry).toHaveBeenCalledOnce()
    expect(disposedMaterial).toHaveBeenCalledOnce()
    box.dispose(); original.dispose(); material.dispose()
})
