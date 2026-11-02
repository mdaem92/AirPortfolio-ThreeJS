import { PerspectiveCamera, Vector3 } from 'three'
import { OrbitControls } from 'three-stdlib'
import { advanceCameraFlight, cameraDestination, createCameraFlight, orbitDestination, releaseCameraToOrbit } from './camera-flight'

function camera() {
    const result = new PerspectiveCamera(50, 1280 / 720, 0.1, 1000)
    result.position.set(80, 8.26, 9.51)
    result.lookAt(52.43, 4.43, 10.43)
    return result
}

test('flights reach the same exact destination at 30, 60 and 120 fps and stop moving after arrival', () => {
    for (const fps of [30, 60, 120]) {
        const view = camera()
        const destination = cameraDestination('main', 1280, 720, 50)
        const flight = createCameraFlight(view, destination, 1.65)
        let arrivals = 0
        for (let step = 0; step < fps * 3; step += 1) arrivals += Number(advanceCameraFlight(view, flight, 1 / fps))
        expect(arrivals).toBe(1)
        expect(view.position.distanceTo(destination.position)).toBe(0)
        expect(view.quaternion.angleTo(flight.endOrientation)).toBeLessThan(1e-7)
    }
})

test('interrupting a route begins at the current pose, and all section destinations remain exact', () => {
    const view = camera()
    const outbound = createCameraFlight(view, cameraDestination('projects', 1280, 720, 50), 1.35)
    advanceCameraFlight(view, outbound, 0.1)
    const returnFlight = createCameraFlight(view, cameraDestination('main', 1280, 720, 50), 1.65)
    const interruptedPosition = view.position.clone()
    const interruptedOrientation = view.quaternion.clone()
    advanceCameraFlight(view, returnFlight, 0)
    expect(view.position.distanceTo(interruptedPosition)).toBe(0)
    expect(view.quaternion.angleTo(interruptedOrientation)).toBeLessThan(1e-7)
    for (const route of ['projects', 'skills', 'about', 'credits']) {
        const target = cameraDestination(route, 390, 844, 50)
        const flight = createCameraFlight(view, target, 1.35)
        for (let step = 0; step < 180; step += 1) advanceCameraFlight(view, flight, 1 / 60)
        expect(view.position.distanceTo(target.position)).toBe(0)
        const direction = view.getWorldDirection(new Vector3())
        expect(direction.angleTo(target.target.clone().sub(target.position).normalize())).toBeLessThan(1e-7)
    }
})

test('free camera returns to the scene center and original orbit limits without snapping at handoff', () => {
    const view = camera()
    const controls = new OrbitControls(view, document.createElement('canvas'))
    const limits = { target: new Vector3(), minDistance: 60, maxDistance: 90, minPolarAngle: Math.PI / 4, maxPolarAngle: Math.PI * 85 / 180 }
    Object.assign(controls, limits, { enabled: false, enableDamping: true })
    view.position.copy(cameraDestination('main', 1280, 720, 50).position)
    const destination = orbitDestination(view, limits)
    const flight = createCameraFlight(view, destination, 1.65)
    for (let step = 0; step < 120; step += 1) advanceCameraFlight(view, flight, 1 / 60)
    const position = view.position.clone()
    const orientation = view.quaternion.clone()
    releaseCameraToOrbit(view, controls, limits, destination.target)
    for (let step = 0; step < 120; step += 1) controls.update()
    expect(controls.enabled).toBe(true)
    expect(controls.enableDamping).toBe(true)
    expect(controls.target.equals(destination.target)).toBe(true)
    expect(controls.target.toArray()).toEqual([0, 0, 0])
    expect(controls.minDistance).toBe(60)
    expect(controls.maxDistance).toBe(90)
    expect(view.position.distanceTo(position)).toBeLessThan(1e-6)
    expect(view.quaternion.angleTo(orientation)).toBeLessThan(1e-7)
    controls.dispose()
})

test('section framing retains the observed legacy views and flights clear the terminal roof', () => {
    const projects = cameraDestination('projects', 1280, 720, 50)
    const skills = cameraDestination('skills', 1280, 720, 50)
    expect(projects.position.distanceTo(new Vector3(-42.76, 7.57, 39.80))).toBeLessThan(0.1)
    expect(skills.position.distanceTo(new Vector3(-55.35, 8.14, -8.79))).toBeLessThan(0.1)
    for (const section of [projects, skills]) {
        for (const returning of [false, true]) {
            const view = camera()
            const main = cameraDestination('main', 1280, 720, 50)
            view.position.copy(returning ? section.position : main.position)
            const destination = returning ? main : section
            const flight = createCameraFlight(view, destination, 1.65)
            for (let step = 0; step < 120; step += 1) {
                advanceCameraFlight(view, flight, 1 / 60)
                if (view.position.x >= 3 && view.position.x <= 45) expect(view.position.y).toBeGreaterThan(15)
                if (flight.elapsed >= 0.3) expect(view.getWorldDirection(new Vector3()).angleTo(destination.target.clone().sub(view.position))).toBeLessThan(1e-7)
            }
        }
    }
})
