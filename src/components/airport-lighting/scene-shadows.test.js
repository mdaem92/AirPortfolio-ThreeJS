import { Group, Mesh, MeshBasicMaterial, MeshStandardMaterial } from 'three'
import { configureSurfaceShadows } from './scene-shadows'

test('shadow setup preserves screen/glow materials and restores prior flags across remounts', () => {
    const root = new Group()
    const surface = new MeshStandardMaterial({ name: 'SURFACE' })
    const vehicle = new Mesh(undefined, surface)
    const terminal = new Mesh(undefined, surface)
    terminal.receiveShadow = true
    const screen = new Mesh(undefined, new MeshBasicMaterial({ name: 'mainScreen' }))
    const glow = new Mesh(undefined, new MeshStandardMaterial({ name: 'emissive_white' }))
    root.add(vehicle, terminal, screen, glow)
    const materialVersion = surface.version

    const restore = configureSurfaceShadows(root)
    expect(vehicle.castShadow && vehicle.receiveShadow).toBe(true)
    expect(terminal.castShadow && terminal.receiveShadow).toBe(true)
    expect(screen.castShadow || screen.receiveShadow).toBe(false)
    expect(glow.castShadow || glow.receiveShadow).toBe(false)
    expect(vehicle.material).toBe(terminal.material)
    expect(surface.version).toBe(materialVersion)

    restore()
    expect(vehicle.castShadow || vehicle.receiveShadow).toBe(false)
    expect(terminal.receiveShadow).toBe(true)
    expect(terminal.castShadow).toBe(false)
    configureSurfaceShadows(root)()
    expect(vehicle.castShadow || vehicle.receiveShadow).toBe(false)
    expect(terminal.receiveShadow).toBe(true)
})
