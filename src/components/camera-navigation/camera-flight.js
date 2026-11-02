import { Matrix4, Quaternion, Spherical, Vector3 } from 'three'

// Preserve the view produced by the former orbit/focus combination without
// letting those two controllers continue fighting over the live camera.
function legacySectionFraming(position, target, factor) {
    const settled = position.clone()
    const orbitPosition = new Vector3()
    const spherical = new Spherical()
    for (let step = 0; step < 600; step += 1) {
        spherical.setFromVector3(settled)
        spherical.radius = Math.max(60, Math.min(90, spherical.radius))
        spherical.phi = Math.max(Math.PI / 4, Math.min(Math.PI * 85 / 180, spherical.phi))
        orbitPosition.setFromSpherical(spherical)
        settled.copy(orbitPosition).lerp(position, factor)
    }
    return { position: settled, target: target.clone().sub(orbitPosition).add(settled) }
}

export function cameraDestination(route, width, height, fov) {
    const tangent = Math.tan(fov * Math.PI / 360)
    if (route === 'main') {
        const screenWidth = Math.min(width * 0.88, height * 1.05, 760)
        const distance = 5.905 * height / (2 * tangent * screenWidth)
        return { position: new Vector3(52.43 + distance, 4.43 + distance * 0.22, 10.46), target: new Vector3(52.43, 4.43, 10.43) }
    }
    if (route === 'about') {
        const distance = Math.max(3.015 / (2 * tangent * 0.82), 2.845 / (2 * tangent * width / height * 0.88))
        return { position: new Vector3(29.435 + distance, 3.94, 20.57), target: new Vector3(29.435, 3.94, 20.57) }
    }
    const destinations = {
        skills: [[-25.69, 3.78, -4.08], [-37.06, 2.21, 1.08]],
        projects: [[-27.58, 4.88, 25.66], [-38.5, 3.02, 14.62]],
        credits: [[40, 4, -8], [51.65, 3.86, -2.85]],
    }
    const [position, target] = destinations[route]
    return legacySectionFraming(new Vector3(...position), new Vector3(...target), route === 'skills' ? 0.1 : route === 'projects' ? 0.05 : 0.08)
}

export function createCameraFlight(camera, destination, duration) {
    // Cross the terminal above its roof rather than cutting through its facade.
    const crossesTerminal = Math.min(camera.position.x, destination.position.x) < 3 && Math.max(camera.position.x, destination.position.x) > 45
    return {
        ...destination, from: camera.position.clone(), orientation: camera.quaternion.clone(),
        clearance: crossesTerminal ? 36 : 0,
        viewingMatrix: new Matrix4(), viewingOrientation: new Quaternion(),
        endOrientation: new Quaternion().setFromRotationMatrix(new Matrix4().lookAt(destination.position, destination.target, camera.up)),
        elapsed: 0, duration, done: false,
    }
}

export function advanceCameraFlight(camera, flight, delta) {
    if (flight.done) return false
    flight.elapsed = Math.min(flight.duration, flight.elapsed + Math.max(0, Math.min(delta, 0.1)))
    const t = Math.min(1, flight.elapsed / flight.duration)
    const eased = t * t * (3 - 2 * t)
    camera.position.lerpVectors(flight.from, flight.position, eased)
    camera.position.y += 4 * eased * (1 - eased) * flight.clearance
    // Keep the selected landmark in view as before. Endpoint-only quaternion
    // interpolation can spend most of a long flight looking away from it.
    flight.viewingOrientation.setFromRotationMatrix(flight.viewingMatrix.lookAt(camera.position, flight.target, camera.up))
    const turn = Math.min(1, flight.elapsed / 0.3)
    camera.quaternion.slerpQuaternions(flight.orientation, flight.viewingOrientation, turn * turn * (3 - 2 * turn))
    if (t < 1 - 1e-9) return false
    camera.position.copy(flight.position)
    camera.quaternion.copy(flight.endOrientation)
    flight.done = true
    return true
}

export function orbitDestination(camera, limits) {
    const target = limits.target.clone()
    const spherical = new Spherical().setFromVector3(camera.position.clone().sub(target))
    spherical.radius = Math.max(limits.minDistance, Math.min(limits.maxDistance, spherical.radius))
    spherical.phi = Math.max(limits.minPolarAngle, Math.min(limits.maxPolarAngle, spherical.phi))
    return { position: new Vector3().setFromSpherical(spherical).add(target), target }
}

export function releaseCameraToOrbit(camera, controls, limits, target) {
    const position = camera.position.clone()
    const orientation = camera.quaternion.clone()
    controls.target.copy(target)
    controls.minDistance = limits.minDistance
    controls.maxDistance = limits.maxDistance
    controls.minPolarAngle = limits.minPolarAngle
    controls.maxPolarAngle = limits.maxPolarAngle
    // Flush residual orbit damping without showing that intermediate pose.
    const damping = controls.enableDamping
    controls.enableDamping = false
    controls.update()
    camera.position.copy(position)
    camera.quaternion.copy(orientation)
    controls.target.copy(target)
    controls.update()
    controls.enableDamping = damping
    controls.enabled = true
}
