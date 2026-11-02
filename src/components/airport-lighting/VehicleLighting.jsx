import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { AdditiveBlending, DataTexture, LinearFilter, RGBAFormat, UnsignedByteType } from 'three'
import { createVehicleLightingState, trafficLights, updateVehicleLighting } from './vehicle-lighting-state'
import { vehicleLightingDefaults } from './lighting-settings'
import { runwayLights } from './runway-lighting-config'

const poolPositions = new Float32Array([-0.9, 0, 0, 0.9, 0, 0, -3.4, 0, 10, 3.4, 0, 10])
const poolUvs = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1])
const poolIndices = new Uint16Array([0, 2, 1, 2, 3, 1])

function createHalo() {
    const size = 32
    const pixels = new Uint8Array(size * size * 4)
    for (let y = 0; y < size; y += 1) {
        for (let x = 0; x < size; x += 1) {
            const radius = Math.hypot((x + 0.5) / size * 2 - 1, (y + 0.5) / size * 2 - 1)
            const offset = (y * size + x) * 4
            pixels.set([255, 255, 255, Math.round(Math.max(0, 1 - radius) ** 3 * 255)], offset)
        }
    }
    const texture = new DataTexture(pixels, size, size, RGBAFormat, UnsignedByteType)
    texture.magFilter = texture.minFilter = LinearFilter
    texture.needsUpdate = true
    return texture
}

export function useVehicleLighting(sceneRef, enabled, settings) {
    const effects = useRef(null)
    const state = useRef(null)
    useLayoutEffect(() => {
        const current = createVehicleLightingState(sceneRef.current, effects.current)
        state.current = current
        return () => { current.dispose(); state.current = null }
    }, [sceneRef])
    // Register after useAnimations, so lights follow the current animation pose.
    useFrame(({ camera, clock }) => {
        if (state.current) updateVehicleLighting(state.current, camera.position, clock.elapsedTime, enabled, settings)
    })
    return effects
}

function Headlights({ configuration, halo, settings }) {
    const { name, front, forward, height, halfWidth } = configuration
    const uniforms = useMemo(() => ({ opacity: { value: settings.poolOpacity } }), [settings.poolOpacity])
    return <group name={`vehicle-lights-${name}`} matrixAutoUpdate={false}>
        <group rotation={[0, configuration.heading ?? 0, 0]}>
        {[-1, 1].map(side => <group key={side} name={`headlight-lamp-${side}`} position={[halfWidth * side, height, front]}>
            <sprite position={[0, 0, forward * 0.05]} scale={[0.65, 0.4, 1]} raycast={() => null}>
                <spriteMaterial map={halo} color={settings.color === vehicleLightingDefaults.headlights.color ? '#ffe6ad' : settings.color} blending={AdditiveBlending} transparent depthWrite={false} toneMapped={false} opacity={settings.glow} />
            </sprite>
        </group>)}
        <group name="headlight-road-pool" position={[0, 0, front]} rotation={[0, forward === -1 ? Math.PI : 0, 0]}>
            <mesh raycast={() => null} renderOrder={2}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[poolPositions, 3]} />
                    <bufferAttribute attach="attributes-uv" args={[poolUvs, 2]} />
                    <bufferAttribute attach="index" args={[poolIndices, 1]} />
                </bufferGeometry>
                <shaderMaterial uniforms={uniforms} transparent depthWrite={false} blending={AdditiveBlending} polygonOffset polygonOffsetFactor={-2} polygonOffsetUnits={-2}
                    vertexShader={`varying vec2 vUv;
                        void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`}
                    fragmentShader={`varying vec2 vUv; uniform float opacity;
                        void main() {
                            float sides = smoothstep(0.0, 0.22, vUv.x) * (1.0 - smoothstep(0.78, 1.0, vUv.x));
                            float lengthFade = smoothstep(0.0, 0.06, vUv.y) * (1.0 - smoothstep(0.12, 1.0, vUv.y));
                            gl_FragColor = vec4(1.0, 0.83, 0.52, sides * lengthFade * opacity);
                            #include <colorspace_fragment>
                        }`}
                />
            </mesh>
        </group>
        </group>
    </group>
}

export default function VehicleLighting({ effectsRef, settings }) {
    const halo = useMemo(createHalo, [])
    useEffect(() => {
        const root = effectsRef.current
        return () => {
            // The enclosing cached GLTF group opts out of automatic disposal.
            root.traverse(object => {
                if (!object.isSprite) object.geometry?.dispose()
                object.material?.dispose()
            })
            halo.dispose()
        }
    }, [effectsRef, halo])
    return <group ref={effectsRef} name="vehicle-lighting">
        {[...trafficLights, ...runwayLights].map(configuration => <Headlights key={configuration.name} configuration={configuration} halo={halo} settings={settings.headlights} />)}
        {runwayLights.filter(vehicle => vehicle.beacons.length).map(vehicle => <group key={vehicle.name} name={`runway-beacons-${vehicle.name}`} matrixAutoUpdate={false}>
            {vehicle.beacons.map((beacon, index) => <group key={`${beacon.mesh}-${beacon.part ?? 0}`}>
                {beacon.added && <mesh name={beacon.mesh} position={beacon.position} raycast={() => null}>
                    <cylinderGeometry args={[0.13, 0.13, 0.16, 12]} />
                    <meshStandardMaterial color="#ffb83d" emissive="#ffb83d" />
                </mesh>}
                <sprite name={`runway-halo-${vehicle.name}-${index}`} scale={[0.65, 0.65, 1]} raycast={() => null}>
                    <spriteMaterial map={halo} color={beacon.color === 'amber' ? (settings.amber?.color ?? settings.police.amber) : settings.police[beacon.color]} blending={AdditiveBlending} transparent depthWrite={false} toneMapped={false} />
                </sprite>
            </group>)}
        </group>)}
        {Array.from({ length: vehicleLightingDefaults.headlights.maxLights }, (_, index) => <group key={index}>
            <object3D name={`traffic-headlight-target-${index}`} />
            <spotLight name={`traffic-headlight-${index}`} visible={settings.headlights.enabled && index < (settings.headlights.maxLights ?? 17)} color={settings.headlights.color} intensity={0} distance={settings.headlights.distance} angle={settings.headlights.angle} penumbra={settings.headlights.penumbra} decay={settings.headlights.decay} />
        </group>)}
        {['red', 'blue'].map((name, index) => <group key={name}>
            <pointLight name={`police-spill-${name}`} visible={index < (settings.police.maxLights ?? 17)} color={settings.police[name]} intensity={0} distance={settings.police.distance} decay={settings.police.decay} />
            <sprite name={`police-halo-${name}`} scale={[0.9, 0.9, 1]} raycast={() => null}>
                <spriteMaterial map={halo} color={settings.police[name]} blending={AdditiveBlending} transparent depthWrite={false} toneMapped={false} />
            </sprite>
        </group>)}
        {Array.from({ length: vehicleLightingDefaults.police.maxLights - 2 }, (_, offset) => <pointLight key={`spill-${offset + 2}`} name={`vehicle-beacon-spill-${offset + 2}`} visible={offset + 2 < (settings.police.maxLights ?? 17)} intensity={0} distance={settings.police.distance} decay={settings.police.decay} />)}
    </group>
}
