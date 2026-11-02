import { useLayoutEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { advanceCameraFlight, cameraDestination, createCameraFlight, orbitDestination, releaseCameraToOrbit } from './camera-flight'
import { baselineMark } from '../../performance/baseline-markers'

export default function useCameraNavigation(route, controlsRef) {
    const { camera, size } = useThree()
    const flight = useRef(null)
    const limits = useRef(null)
    const serial = useRef(0)
    const [arrival, setArrival] = useState(null)
    const key = route === 'main' || route === 'about' ? `${route}:${size.width}:${size.height}` : route

    useLayoutEffect(() => {
        const controls = controlsRef.current
        if (!controls) return
        if (!limits.current) limits.current = { target: controls.target.clone(), minDistance: controls.minDistance, maxDistance: controls.maxDistance, minPolarAngle: controls.minPolarAngle, maxPolarAngle: controls.maxPolarAngle }
        if (route === 'free') {
            if (flight.current) {
                if (flight.current.key === 'free') return
                controls.enabled = false
                flight.current = { ...createCameraFlight(camera, orbitDestination(camera, limits.current), 0.85), id: ++serial.current, key }
            } else controls.enabled = true
            return
        }
        controls.enabled = false
        const destination = cameraDestination(route, size.width, size.height, camera.fov)
        const duration = flight.current?.key.startsWith(`${route}:`) ? 0.5 : route === 'main' ? 1.65 : 1.35
        flight.current = { ...createCameraFlight(camera, destination, duration), id: ++serial.current, key }
        baselineMark('camera-departed', { route })
    }, [route, key, camera, controlsRef, size.width, size.height])

    // The sole camera writer during focus; runs before Html projects the screens.
    useFrame((_, delta) => {
        const current = flight.current
        if (!current || current.done) return
        if (advanceCameraFlight(camera, current, delta)) {
            controlsRef.current.target.copy(current.target)
            if (route === 'free') releaseCameraToOrbit(camera, controlsRef.current, limits.current, current.target)
            baselineMark('camera-arrived', { route, position: camera.position.toArray(), target: current.target.toArray() })
            setArrival({ id: current.id, key: current.key })
        }
    }, -0.5)
    return Boolean(route !== 'free' && flight.current?.done && arrival?.id === flight.current.id && arrival?.key === key)
}
