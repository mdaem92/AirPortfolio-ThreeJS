import { BoxGeometry, Group, Mesh, MeshStandardMaterial, Object3D, PointLight, SpotLight, Sprite, SpriteMaterial, Vector3 } from 'three'
import { createVehicleLightingState, trafficLights, updateVehicleLighting } from './vehicle-lighting-state'
import { vehicleLightingDefaults } from './lighting-settings'
import { runwayLights } from './runway-lighting-config'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'

function fixture(includeRunway = false) {
    const scene = new Group()
    const effects = new Group()
    const headlights = new MeshStandardMaterial({ name: 'headlights', emissiveIntensity: 1 })
    const amber = new MeshStandardMaterial({ name: 'siren_orange', emissive: '#ffb83d', emissiveIntensity: 1 })
    ;[...trafficLights, ...(includeRunway ? runwayLights : [])].forEach(({ name, beacons = [] }) => {
        const vehicle = new Group()
        vehicle.name = name
        vehicle.position.set(0, 200, 0)
        scene.add(vehicle)
        const effect = new Group()
        effect.name = `vehicle-lights-${name}`
        effect.matrixAutoUpdate = false
        const pool = new Group()
        pool.name = 'headlight-road-pool'
        effect.add(pool)
        effects.add(effect)
        if (beacons.length || name === 'Bus') {
            const head = new Mesh(new BoxGeometry(1, 0.1, 0.1), headlights)
            head.name = 'model-headlights'
            vehicle.add(head)
            const root = new Group()
            root.name = `runway-beacons-${name}`
            root.matrixAutoUpdate = false
            effects.add(root)
            beacons.forEach((beacon, index) => {
                if (!vehicle.getObjectByName(beacon.mesh)) {
                    const geometry = beacon.parts === 2 ? mergeGeometries([
                        new BoxGeometry(0.18, 0.15, 0.18).translate(-0.6, 0, 0),
                        new BoxGeometry(0.18, 0.15, 0.18).translate(0.6, 0, 0),
                    ]) : new BoxGeometry(0.2, 0.15, 0.2)
                    const mesh = new Mesh(geometry, amber)
                    mesh.name = beacon.mesh
                    mesh.position.set(0, 1, 0)
                    if (beacon.added) root.add(mesh)
                    else vehicle.add(mesh)
                }
                const halo = new Sprite(new SpriteMaterial())
                halo.name = `runway-halo-${name}-${index}`
                root.add(halo)
            })
        }
    })
    for (let index = 0; index < (includeRunway ? vehicleLightingDefaults.headlights.maxLights : 2); index += 1) {
        const light = new SpotLight()
        light.name = `traffic-headlight-${index}`
        const target = new Object3D()
        target.name = `traffic-headlight-target-${index}`
        effects.add(light, target)
    }
    const red = new MeshStandardMaterial({ name: 'siren_red', emissiveIntensity: 0.8 })
    const blue = new MeshStandardMaterial({ name: 'siren_blue' })
    const police = scene.getObjectByName('police_car')
    for (const [index, color] of ['red', 'blue'].entries()) {
        const bar = new Mesh(undefined, index === 0 ? red : blue)
        bar.name = index === 0 ? 'Cube001_1' : 'Cube001_5'
        police.add(bar)
        const light = new PointLight()
        light.name = `police-spill-${color}`
        const halo = new Sprite(new SpriteMaterial())
        halo.name = `police-halo-${color}`
        effects.add(light, halo)
    }
    if (includeRunway) {
        for (let index = 2; index < vehicleLightingDefaults.police.maxLights; index += 1) {
            const light = new PointLight()
            light.name = `vehicle-beacon-spill-${index}`
            effects.add(light)
        }
    }
    return { scene, effects, red, amber, headlights, state: createVehicleLightingState(scene, effects) }
}

test('headlights follow a turning car and hidden animation poses cannot light the scene', () => {
    const { scene, state } = fixture()
    const car = scene.getObjectByName('turningTaxi')
    car.position.set(54, 1.5, 12)
    car.rotation.y = Math.PI / 2
    updateVehicleLighting(state, new Vector3(60, 5, 10), 0, true)

    const entry = state.vehicles.find(vehicle => vehicle.name === car.name)
    expect(entry.effect.visible).toBe(true)
    expect(entry.effect.matrix.equals(car.matrixWorld)).toBe(true)
    const expected = new Vector3(0, entry.height, entry.front + 0.12).applyMatrix4(car.matrixWorld)
    expect(state.spots[0].light.position.distanceTo(expected)).toBeLessThan(0.00001)
    expect(state.spots[0].target.position.x).toBeGreaterThan(state.spots[0].light.position.x)
    expect(state.spots[0].target.position.y).toBeCloseTo(1.05)
    expect(state.spots[1].light.intensity).toBe(0)
    expect(entry.position.y + entry.effect.getObjectByName('headlight-road-pool').position.y).toBeCloseTo(1.075)

    car.position.y = -200
    updateVehicleLighting(state, new Vector3(), 0, true)
    expect(entry.effect.visible).toBe(false)
    expect(state.spots.every(({ light }) => light.intensity === 0)).toBe(true)
    state.dispose()
})

test('the bounded headlight pool serves the nearest two visible vehicles', () => {
    const { scene, state } = fixture()
    for (const [index, name] of ['redMovingCar', 'blueMovingCar', 'turningTaxi'].entries()) {
        scene.getObjectByName(name).position.set(index * 10, 1.5, 0)
    }
    updateVehicleLighting(state, new Vector3(), 0, true)
    expect(state.spots).toHaveLength(2)
    expect(state.spots[0].light.position.x).toBeCloseTo(0)
    expect(state.spots[1].light.position.x).toBeCloseTo(10)
    state.dispose()
})

test('police spill alternates smoothly, respects Start/visibility, and preserves shared materials', () => {
    const { scene, red, state } = fixture()
    const police = scene.getObjectByName('police_car')
    const bar = police.getObjectByName('Cube001_1')
    police.position.set(58, 1.5, 10)
    expect(bar.material).not.toBe(red)

    const period = vehicleLightingDefaults.police.period
    updateVehicleLighting(state, new Vector3(), period / 4, true)
    expect(state.beacons[0].light.intensity).toBeCloseTo(25)
    expect(state.beacons[1].light.intensity).toBeCloseTo(0)
    expect(bar.material.emissiveIntensity).toBeGreaterThan(1)
    expect(red.emissiveIntensity).toBe(0.8)
    updateVehicleLighting(state, new Vector3(), period * 3 / 4, true)
    expect(state.beacons[1].light.intensity).toBeCloseTo(25)

    updateVehicleLighting(state, new Vector3(), 0.3125, false)
    expect(state.beacons.every(({ light, halo }) => light.intensity === 0 && !halo.visible)).toBe(true)
    expect(state.vehicles.every(({ effect }) => !effect.visible)).toBe(true)
    state.dispose()
    expect(bar.material).toBe(red)
    expect(red.emissiveIntensity).toBe(0.8)
})

test('live headlight and police controls are independent and keep their configured intensities', () => {
    const { scene, state } = fixture()
    scene.getObjectByName('police_car').position.set(58, 1.5, 10)
    const settings = structuredClone(vehicleLightingDefaults)
    settings.headlights.enabled = false
    settings.police.intensity = 32
    settings.police.period = 2
    updateVehicleLighting(state, new Vector3(), 0.5, true, settings)
    expect(state.spots.every(({ light }) => light.intensity === 0)).toBe(true)
    expect(state.beacons[0].light.intensity).toBeCloseTo(32)
    expect(state.beacons[1].light.intensity).toBeCloseTo(0)

    settings.headlights.enabled = true
    settings.headlights.intensity = 45
    settings.police.enabled = false
    updateVehicleLighting(state, new Vector3(), 0.5, true, settings)
    expect(state.spots[0].light.intensity).toBe(45)
    expect(state.beacons.every(({ light, halo, material }) => light.intensity === 0 && !halo.visible && material.emissiveIntensity === 0)).toBe(true)
    state.dispose()
})

test('all runway headlights and beacons use model-local headings and bounded real-light pools', () => {
    const { scene, state, amber, headlights } = fixture(true)
    expect(state.runway).toHaveLength(11)
    expect(state.runway.find(vehicle => vehicle.entry.name === 'Bus').lamps).toHaveLength(0)
    expect(state.runway.find(vehicle => vehicle.entry.name === 'luggageTrailer').lamps).toHaveLength(1)
    const truck = scene.getObjectByName('firefighter1')
    truck.position.set(-52, 1.75, 40)
    const camera = new Vector3(-50, 6, 40)
    updateVehicleLighting(state, camera, 0.3, true)
    const entry = state.runway.find(vehicle => vehicle.entry.name === 'firefighter1')
    expect(entry.entry.effect.visible).toBe(true)
    expect(entry.lamps.every(lamp => lamp.halo.visible && lamp.material.emissiveIntensity > 1)).toBe(true)
    expect(state.spots[0].target.position.x).toBeGreaterThan(state.spots[0].light.position.x)
    expect(state.spots).toHaveLength(17)
    expect(state.beacons).toHaveLength(2)
    expect(state.beacons[0].light.position.distanceTo(entry.lamps[0].world)).toBeLessThan(0.0001)
    expect(amber.emissiveIntensity).toBe(1)
    expect(headlights.emissiveIntensity).toBe(1)
    expect(truck.getObjectByName('model-headlights').material).not.toBe(headlights)
    updateVehicleLighting(state, camera, 0.6, false)
    expect(entry.entry.effect.visible).toBe(false)
    expect(entry.lamps.every(lamp => !lamp.halo.visible && lamp.material.emissiveIntensity === 0)).toBe(true)
    state.dispose()
    expect(truck.getObjectByName('model-headlights').material).toBe(headlights)
    expect(truck.getObjectByName('Cube120_2').material).toBe(amber)
})

test('paired amber roof lamps have separate halos and spill positions without duplicate material disposal', () => {
    const { scene, state, amber } = fixture(true)
    for (const name of ['runwayBackup', 'orangeRunwayCar1']) {
        const vehicle = state.runway.find(vehicle => vehicle.entry.name === name)
        expect(vehicle.lamps).toHaveLength(2)
        expect(vehicle.lamps[0].location.x).toBeCloseTo(-0.6)
        expect(vehicle.lamps[1].location.x).toBeCloseTo(0.6)
        expect(vehicle.lamps[0].material).not.toBe(vehicle.lamps[1].material)
        expect(vehicle.lamps[0].mesh.geometry.groups).toHaveLength(2)
    }
    scene.getObjectByName('runwayBackup').position.set(-32, 1.75, 35)
    updateVehicleLighting(state, new Vector3(-32, 5, 35), 0.1, true)
    const backup = state.runway.find(vehicle => vehicle.entry.name === 'runwayBackup')
    expect(backup.lamps.filter(lamp => lamp.halo.visible)).toHaveLength(1)
    expect(backup.lamps[0].halo.position.distanceTo(backup.lamps[1].halo.position)).toBeCloseTo(1.2)
    expect(state.beacons[0].light.position.distanceTo(state.beacons[1].light.position)).toBeCloseTo(1.2)
    const dispose = vi.spyOn(backup.lamps[0].material, 'dispose')
    const disposeOther = vi.spyOn(backup.lamps[1].material, 'dispose')
    const disposeGeometry = vi.spyOn(backup.lamps[0].splitGeometry, 'dispose')
    const originalGeometry = backup.lamps[0].originalGeometry
    state.dispose()
    expect(dispose).toHaveBeenCalledOnce()
    expect(disposeOther).toHaveBeenCalledOnce()
    expect(disposeGeometry).toHaveBeenCalledOnce()
    expect(scene.getObjectByName('runwayBackup').getObjectByName('Cube199_1').geometry).toBe(originalGeometry)
    expect(scene.getObjectByName('runwayBackup').getObjectByName('Cube199_1').material).toBe(amber)
})

test('full real illumination survives foreground geometry and camera movement; reduced limits are explicit', () => {
    const { scene, state } = fixture(true)
    state.vehicles.forEach((entry, index) => entry.vehicle.position.set(index * 5, 1.5, 0))
    const settings = structuredClone(vehicleLightingDefaults)
    const snapshot = () => [...state.spots.map(({ light }) => light), ...state.spillLights]
        .filter(light => light.intensity > 0)
        .map(light => [...light.position.toArray(), light.intensity, ...light.color.toArray()].map(value => value.toFixed(6)).join(','))
        .sort()
    updateVehicleLighting(state, new Vector3(0, 5, 8), 0.13, true, settings)
    expect(state.spots.filter(({ light }) => light.intensity > 0)).toHaveLength(17)
    expect(state.spillSources).toHaveLength(17)
    expect(state.spillLights.filter(light => light.intensity > 0)).toHaveLength(15)
    const before = snapshot()
    const blocker = new Mesh(new BoxGeometry(5, 8, 1), new MeshStandardMaterial())
    blocker.position.set(0, 3, 4)
    scene.add(blocker)
    updateVehicleLighting(state, new Vector3(60, 5, 8), 0.13, true, settings)
    expect(snapshot()).toEqual(before)
    settings.headlights.maxLights = settings.police.maxLights = 2
    updateVehicleLighting(state, new Vector3(60, 5, 8), 0.13, true, settings)
    expect(state.spots.filter(({ light }) => light.intensity > 0)).toHaveLength(2)
    expect(state.spillLights.slice(2).every(light => light.intensity === 0)).toBe(true)
    expect(state.spillLights.slice(0, 2).some(light => light.intensity > 0)).toBe(true)
    state.dispose()
})

test('each amber roof pair alternates lamp emission, glow and real spill every half cycle', () => {
    const settings = structuredClone(vehicleLightingDefaults)
    for (const name of ['runwayBackup', 'orangeRunwayCar1']) {
        const { state } = fixture(true)
        const vehicle = state.runway.find(vehicle => vehicle.entry.name === name)
        vehicle.entry.vehicle.position.set(-30, 1.5, 20)
        const camera = new Vector3(-30, 5, 20)
        const firstOn = ((Math.PI / 2 - vehicle.phase + Math.PI * 2) % (Math.PI * 2)) / (Math.PI * 2) * settings.police.period
        const originalIndexCount = vehicle.lamps[0].originalGeometry.index.count
        expect(vehicle.lamps[0].splitGeometry.index.count).toBe(originalIndexCount)
        for (const [elapsed, activeIndex] of [[firstOn, 0], [firstOn + settings.police.period / 2, 1], [firstOn + settings.police.period, 0]]) {
            updateVehicleLighting(state, camera, elapsed, true, settings)
            vehicle.lamps.forEach((lamp, index) => {
                const on = index === activeIndex
                expect(lamp.strength).toBe(Number(on))
                expect(lamp.material.emissiveIntensity).toBe(on ? 6 : 0)
                expect(lamp.halo.visible).toBe(on)
                expect(lamp.halo.material.opacity).toBeCloseTo(on ? 0.8 * settings.police.halo : 0)
                expect(state.spillLights[index].intensity).toBe(on ? settings.police.intensity : 0)
            })
        }
        state.dispose()
    }
})
