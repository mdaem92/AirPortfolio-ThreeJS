import { Vector3 } from 'three'
import { vehicleLightingDefaults } from './lighting-settings'
import { runwayLights } from './runway-lighting-config'

const up = new Vector3(0, 1, 0)
const beaconSettings = (settings, color) => color === 'amber' ? settings.amber ?? { ...settings.police, color: settings.police.amber } : settings.police

// Sample the actual front lamp surfaces once, in the vehicle's heading frame.
// Some models share this material with windows/trim, so only use its front band.
export function headlightAnchors(vehicle, configuration) {
    const points = []
    vehicle.updateWorldMatrix(true, true)
    const inverse = vehicle.matrixWorld.clone().invert()
    vehicle.traverse(mesh => {
        if (!mesh.isMesh || mesh.material?.name !== 'headlights') return
        const transform = inverse.clone().multiply(mesh.matrixWorld)
        const vertices = mesh.geometry.attributes.position
        for (let index = 0; index < vertices.count; index += 1) points.push(new Vector3().fromBufferAttribute(vertices, index).applyMatrix4(transform).applyAxisAngle(up, -(configuration.heading ?? 0)))
    })
    if (!points.length) return null
    const forward = configuration.forward
    const front = Math.max(...points.map(point => point.z * forward))
    const lenses = points.filter(point => point.z * forward >= front - 0.2)
    const left = Math.min(...lenses.map(point => point.x))
    const right = Math.max(...lenses.map(point => point.x))
    const middle = (left + right) / 2
    return [-1, 1].map(side => {
        const min = new Vector3(Infinity, Infinity, Infinity)
        const max = new Vector3(-Infinity, -Infinity, -Infinity)
        lenses.filter(point => side === -1 ? point.x <= middle : point.x > middle).forEach(point => { min.min(point); max.max(point) })
        return min.add(max).multiplyScalar(0.5)
    })
}

function roofVertices(mesh) {
    mesh.geometry.computeBoundingBox()
    const box = mesh.geometry.boundingBox
    const vertices = mesh.geometry.attributes.position
    const threshold = box.max.y - Math.max(0.015, (box.max.y - box.min.y) * 0.15)
    const points = []
    for (let index = 0; index < vertices.count; index += 1) {
        const point = new Vector3().fromBufferAttribute(vertices, index)
        if (point.y >= threshold) points.push(point)
    }
    return points
}

function roofSplit(mesh) {
    const points = roofVertices(mesh)
    const box = mesh.geometry.boundingBox
    const axis = box.max.x - box.min.x > box.max.z - box.min.z ? 'x' : 'z'
    points.sort((a, b) => a[axis] - b[axis])
    let gap = -1
    let cut = 0
    for (let index = 1; index < points.length; index += 1) {
        const distance = points[index][axis] - points[index - 1][axis]
        if (distance > gap) { gap = distance; cut = (points[index][axis] + points[index - 1][axis]) / 2 }
    }
    return { axis, cut }
}

function topCenter(mesh, part = 0, parts = 1) {
    let points = roofVertices(mesh)
    if (parts === 2) {
        const { axis, cut } = roofSplit(mesh)
        points = points.filter(point => part === 0 ? point[axis] <= cut : point[axis] > cut)
    }
    const min = new Vector3(Infinity, Infinity, Infinity)
    const max = new Vector3(-Infinity, -Infinity, -Infinity)
    points.forEach(point => { min.min(point); max.max(point) })
    mesh.updateMatrix()
    return min.add(max).multiplyScalar(0.5).add(new Vector3(0, 0.025, 0)).applyMatrix4(mesh.matrix)
}

function cloneLamp(mesh, toneMapped = mesh.material.toneMapped) {
    const original = mesh.material
    const material = original.clone()
    material.toneMapped = toneMapped
    mesh.material = material
    return { mesh, original, material, originalEmissive: material.emissive?.clone() }
}

function clonePairedLamps(mesh) {
    const original = mesh.material
    const originalGeometry = mesh.geometry
    const { axis, cut } = roofSplit(mesh)
    const positions = originalGeometry.attributes.position
    const indices = originalGeometry.index
    const parts = [[], []]
    const point = new Vector3()
    for (let index = 0; index < (indices?.count ?? positions.count); index += 3) {
        const triangle = [0, 1, 2].map(offset => indices ? indices.getX(index + offset) : index + offset)
        const center = triangle.reduce((sum, vertex) => sum + point.fromBufferAttribute(positions, vertex)[axis], 0) / 3
        parts[center <= cut ? 0 : 1].push(...triangle)
    }
    const splitGeometry = originalGeometry.clone()
    splitGeometry.clearGroups()
    splitGeometry.setIndex([...parts[0], ...parts[1]])
    splitGeometry.addGroup(0, parts[0].length, 0)
    splitGeometry.addGroup(parts[0].length, parts[1].length, 1)
    const materials = [original.clone(), original.clone()]
    mesh.geometry = splitGeometry
    mesh.material = materials
    return materials.map(material => ({ mesh, original, material, originalEmissive: material.emissive.clone(), originalGeometry, splitGeometry }))
}

export const trafficLights = [
    { name: 'police_car', front: -1.71, height: 0.05, halfWidth: 0.7, forward: -1 },
    { name: 'turningTaxi', front: 1.76, height: 0.05, halfWidth: 0.68, forward: 1 },
    { name: 'redMovingCar', front: 1.06, height: 0.1, halfWidth: 0.52, forward: 1 },
    { name: 'blueMovingCar', front: 1.77, height: 0.05, halfWidth: 0.68, forward: 1 },
    { name: 'Bus_animated', front: -5.88, height: -0.25, halfWidth: 1.02, forward: -1 },
    { name: 'straight_taxi', front: -1.76, height: 0.05, halfWidth: 0.68, forward: -1 },
]

const beaconLocations = [[0.12, 1.65, -0.23], [-0.23, 1.65, -0.23]]

export function createVehicleLightingState(scene, effects) {
    const vehicles = [...trafficLights, ...runwayLights].map(configuration => ({
        ...configuration,
        vehicle: scene.getObjectByName(configuration.name),
        effect: effects.getObjectByName(`vehicle-lights-${configuration.name}`),
        position: new Vector3(),
        distance: 0,
        active: false,
    })).filter(entry => entry.vehicle && entry.effect)
    vehicles.forEach(entry => {
        if (entry.headlights === false) return
        const anchors = headlightAnchors(entry.vehicle, entry)
        entry.headlightOrigin = new Vector3(0, entry.height, entry.front)
        if (!anchors) return
        anchors.forEach((anchor, index) => entry.effect.getObjectByName(`headlight-lamp-${index === 0 ? -1 : 1}`)?.position.copy(anchor))
        entry.headlightOrigin.copy(anchors[0]).add(anchors[1]).multiplyScalar(0.5)
        const pool = entry.effect.getObjectByName('headlight-road-pool')
        pool.position.x = entry.headlightOrigin.x
        pool.position.z = entry.headlightOrigin.z
    })
    const spots = Array.from({ length: vehicleLightingDefaults.headlights.maxLights }, (_, index) => {
        const light = effects.getObjectByName(`traffic-headlight-${index}`)
        const target = effects.getObjectByName(`traffic-headlight-target-${index}`)
        if (!light || !target) return null
        light.target = target
        return { light, target }
    }).filter(Boolean)
    const police = scene.getObjectByName('police_car')
    const beacons = ['red', 'blue'].map((color, index) => {
        const mesh = police?.getObjectByName(index === 0 ? 'Cube001_1' : 'Cube001_5')
        const original = mesh?.material
        const material = original?.clone()
        if (mesh) mesh.material = material
        return { mesh, original, material, originalEmissive: material?.emissive?.clone(),
            light: effects.getObjectByName(`police-spill-${color}`),
            halo: effects.getObjectByName(`police-halo-${color}`),
            location: new Vector3(...beaconLocations[index]),
        }
    })
    const runway = runwayLights.map((configuration, index) => {
        const entry = vehicles.find(vehicle => vehicle.name === configuration.name)
        if (!entry) return null
        const headMaterials = []
        entry.vehicle.traverse(mesh => {
            if (mesh.isMesh && mesh.material?.name === 'headlights') headMaterials.push(cloneLamp(mesh, false))
        })
        const root = effects.getObjectByName(`runway-beacons-${entry.name}`)
        const clonedMeshes = new Map()
        const lamps = configuration.beacons.map((beacon, beaconIndex) => {
            const mesh = beacon.added ? effects.getObjectByName(beacon.mesh) : entry.vehicle.getObjectByName(beacon.mesh)
            const halo = effects.getObjectByName(`runway-halo-${entry.name}-${beaconIndex}`)
            if (!mesh || !halo) return null
            if (!clonedMeshes.has(mesh)) clonedMeshes.set(mesh, beacon.parts === 2 ? clonePairedLamps(mesh) : [cloneLamp(mesh)])
            return { ...clonedMeshes.get(mesh)[beacon.part ?? 0], paired: beacon.parts === 2, side: beacon.part ?? 0, color: beacon.color, halo, location: topCenter(mesh, beacon.part, beacon.parts), world: new Vector3(), strength: 0 }
        }).filter(Boolean)
        return { entry, root, lamps, headMaterials, phase: index * 0.37 }
    }).filter(Boolean)
    const spillLights = Array.from({ length: vehicleLightingDefaults.police.maxLights }, (_, index) => index < 2 ? beacons[index].light : effects.getObjectByName(`vehicle-beacon-spill-${index}`)).filter(Boolean)
    const spillSources = [
        ...beacons.map((beacon, index) => ({ beacon, entry: vehicles.find(entry => entry.name === 'police_car'), color: index === 0 ? 'red' : 'blue', world: new Vector3(), strength: 0 })),
        ...runway.flatMap(vehicle => vehicle.lamps.map(lamp => ({ beacon: lamp, entry: vehicle.entry, color: lamp.color, world: lamp.world, strength: 0 }))),
    ]
    return { vehicles, spots, police, beacons, runway, spillLights, spillSources, point: new Vector3(),
        dispose() {
            const materials = [...beacons, ...runway.flatMap(vehicle => [...vehicle.lamps, ...vehicle.headMaterials])]
            const disposed = new Set()
            const geometries = new Set()
            materials.forEach(({ mesh, original, material, originalGeometry, splitGeometry }) => {
                if (mesh) mesh.material = original
                if (originalGeometry) mesh.geometry = originalGeometry
                if (material && !disposed.has(material)) { material.dispose(); disposed.add(material) }
                if (splitGeometry && !geometries.has(splitGeometry)) { splitGeometry.dispose(); geometries.add(splitGeometry) }
            })
        },
    }
}

export function updateVehicleLighting(state, cameraPosition, elapsed, enabled, settings = vehicleLightingDefaults) {
    state.vehicles.forEach(entry => {
        entry.vehicle.updateWorldMatrix(true, false)
        entry.vehicle.getWorldPosition(entry.position)
        entry.present = enabled && entry.position.y > 0 && entry.position.y < 20
        entry.active = entry.present && settings.headlights.enabled && entry.headlights !== false
        entry.effect.visible = entry.active
        entry.effect.matrix.copy(entry.vehicle.matrixWorld)
        entry.effect.matrixWorldNeedsUpdate = true
        // The road is level; keep the projected pool on it as cars move/turn.
        entry.effect.getObjectByName('headlight-road-pool').position.y = 1.075 - entry.position.y
        entry.distance = entry.position.distanceToSquared(cameraPosition)
    })

    const nearest = state.vehicles.filter(entry => entry.active).sort((a, b) => a.distance - b.distance).slice(0, settings.headlights.maxLights ?? 17)
    state.spots.forEach(({ light, target }, index) => {
        const entry = nearest[index]
        light.intensity = entry ? settings.headlights.intensity : 0
        if (!entry) return
        state.point.copy(entry.headlightOrigin).applyAxisAngle(up, entry.heading ?? 0).applyMatrix4(entry.vehicle.matrixWorld)
        light.position.copy(state.point)
        state.point.set(entry.headlightOrigin.x, 1.05 - entry.position.y, entry.headlightOrigin.z + entry.forward * 8).applyAxisAngle(up, entry.heading ?? 0).applyMatrix4(entry.vehicle.matrixWorld)
        target.position.copy(state.point)
        target.updateMatrixWorld()
    })

    const police = state.vehicles.find(entry => entry.name === 'police_car')
    state.beacons.forEach((beacon, index) => {
        const active = settings.police.enabled && (police?.present ?? false)
        // A smooth, alternating sweep rather than a hard strobe.
        const wave = 0.5 + 0.5 * Math.sin(elapsed * Math.PI * 2 / settings.police.period + index * Math.PI)
        const strength = wave * wave
        beacon.strength = strength
        beacon.light.intensity = active ? settings.police.intensity * strength : 0
        beacon.halo.visible = active
        if (active) {
            state.point.copy(beacon.location).applyMatrix4(state.police.matrixWorld)
            beacon.light.position.copy(state.point)
            beacon.halo.position.copy(state.point)
            beacon.halo.material.opacity = (0.15 + strength * 0.65) * settings.police.halo
        }
        if (beacon.material) {
            beacon.material.emissiveIntensity = settings.police.enabled ? active ? 1 + strength * settings.police.emissive : 1 : 0
            const color = index === 0 ? 'red' : 'blue'
            if (settings.police[color] === vehicleLightingDefaults.police[color]) beacon.material.emissive?.copy(beacon.originalEmissive)
            else beacon.material.emissive?.set(settings.police[color])
        }
    })

    // Beam/spill lights live independently of the visible lamp geometry.
    // Covering the emitter therefore cannot switch off its illumination.
    state.runway.forEach(vehicle => {
        const { entry, root, lamps, headMaterials, phase } = vehicle
        headMaterials.forEach(lamp => { lamp.material.emissiveIntensity = entry.active ? 2.5 : 0 })
        const active = entry.present && lamps.some(lamp => beaconSettings(settings, lamp.color).enabled)
        if (root) {
            root.visible = active
            root.matrix.copy(entry.vehicle.matrixWorld)
            root.matrixWorldNeedsUpdate = true
        }
        lamps.forEach((lamp, index) => {
            const controls = beaconSettings(settings, lamp.color)
            const lampActive = entry.present && controls.enabled
            const offset = lamp.color === 'amber' ? 0 : index * Math.PI
            const wave = 0.5 + 0.5 * Math.sin(elapsed * Math.PI * 2 / controls.period + phase + offset)
            const pairFirstOn = Math.sin(elapsed * Math.PI * 2 / controls.period + phase) >= 0
            lamp.strength = lamp.paired ? Number(lamp.side === (pairFirstOn ? 0 : 1)) : wave * wave
            lamp.material.emissiveIntensity = lampActive ? lamp.paired ? lamp.strength * (1 + controls.emissive) : 1 + lamp.strength * controls.emissive : 0
            const color = lamp.color === 'amber' ? controls.color : controls[lamp.color]
            if (color === vehicleLightingDefaults.police[lamp.color]) lamp.material.emissive.copy(lamp.originalEmissive)
            else lamp.material.emissive.set(color)
            lamp.halo.visible = lampActive && (!lamp.paired || lamp.strength > 0)
            lamp.halo.position.copy(lamp.location)
            lamp.halo.material.opacity = (lamp.paired ? lamp.strength * 0.8 : 0.15 + lamp.strength * 0.65) * controls.halo
            lamp.world.copy(lamp.location).applyMatrix4(entry.vehicle.matrixWorld)
        })
    })
    const sources = state.spillSources.filter(source => source.entry?.present && beaconSettings(settings, source.color).enabled)
        .sort((a, b) => a.entry.distance - b.entry.distance).slice(0, settings.police.maxLights ?? 17)
    sources.forEach(source => {
        source.world.copy(source.beacon.location).applyMatrix4(source.entry.vehicle.matrixWorld)
        source.strength = source.beacon.strength
    })
    state.spillLights.forEach((light, index) => {
        const source = sources[index]
        const controls = source ? beaconSettings(settings, source.color) : null
        light.intensity = source ? controls.intensity * source.strength : 0
        if (!source) return
        light.position.copy(source.world)
        light.color.set(source.color === 'amber' ? controls.color : controls[source.color])
        light.distance = controls.distance
        light.decay = controls.decay
    })
}
