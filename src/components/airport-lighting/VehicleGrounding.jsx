import { useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Object3D, Quaternion, Vector3 } from 'three'

const vehicles = [
    ['airplane', 20, 42], ['conveyor-truck', 3, 6],
    ['police_car', 2.6, 4.2], ['turningTaxi', 2.6, 4.2],
    ['redMovingCar', 2.1, 3.4], ['blueMovingCar', 2.6, 4.2],
    ['Bus_animated', 3.4, 12], ['straight_taxi', 2.6, 4.2],
    ['orangeRunwayCar2', 2.5, 4], ['luggageTrailer', 3, 5],
    ['runwayBackup', 3, 6], ['runwayPolice', 3, 5],
    ['firefighter1', 3.5, 7], ['firefighter2', 3.5, 7],
    ['runwayWhiteCar', 2.6, 4], ['yellowparkingTaxi', 2.6, 4.2],
    ['redParkingCar', 2.6, 4.2], ['blueParkingCar', 2.6, 4.2],
    ['blackParkingCar', 2.6, 4.2], ['orangeRunwayCar1', 2.5, 4],
]
const planeRotation = new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), -Math.PI / 2)

export function useVehicleGrounding(sceneRef) {
    const mesh = useRef(null)
    const anchors = useRef([])
    const scratch = useMemo(() => ({ object: new Object3D(), position: new Vector3(), rotation: new Quaternion() }), [])
    useLayoutEffect(() => {
        anchors.current = vehicles.map(([name, width, length]) => ({
            object: sceneRef.current.getObjectByName(name), width, length,
        })).filter(anchor => anchor.object)
        mesh.current.count = anchors.current.length
    }, [sceneRef])

    // Called after useAnimations in the scene, so the mixer updates the vehicles first.
    // World-space shadows remain on the road,
    // including when the original animation parks unused vehicles above/below the scene.
    useFrame(() => {
        if (!mesh.current.visible) return
        anchors.current.forEach((anchor, index) => {
            anchor.object.updateWorldMatrix(true, false)
            anchor.object.getWorldPosition(scratch.position)
            anchor.object.getWorldQuaternion(scratch.rotation)
            scratch.object.position.set(scratch.position.x, 1.065, scratch.position.z)
            scratch.object.quaternion.copy(scratch.rotation).multiply(planeRotation)
            const visible = scratch.position.y > 0 && scratch.position.y < 20
            scratch.object.scale.set(visible ? anchor.width : 0, visible ? anchor.length : 0, 1)
            scratch.object.updateMatrix()
            mesh.current.setMatrixAt(index, scratch.object.matrix)
        })
        mesh.current.instanceMatrix.needsUpdate = true
    })

    return mesh
}

export default function VehicleGrounding({ meshRef, visible = true, opacity = 0.24 }) {
    const uniforms = useMemo(() => ({ opacity: { value: opacity } }), [opacity])
    return <instancedMesh ref={meshRef} name="vehicle-contact-shadows" visible={visible} args={[null, null, vehicles.length]} frustumCulled={false} raycast={() => null} renderOrder={1}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial uniforms={uniforms} transparent depthWrite={false} polygonOffset polygonOffsetFactor={-1} polygonOffsetUnits={-1}
            vertexShader={`varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
                }`}
            fragmentShader={`varying vec2 vUv; uniform float opacity;
                void main() {
                    float radius = length((vUv - 0.5) * 2.0);
                    float alpha = (1.0 - smoothstep(0.15, 1.0, radius)) * opacity;
                    gl_FragColor = vec4(0.005, 0.008, 0.015, alpha);
                    #include <colorspace_fragment>
                }`}
        />
    </instancedMesh>
}
