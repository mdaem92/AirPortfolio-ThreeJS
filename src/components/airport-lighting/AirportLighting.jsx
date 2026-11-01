import { memo, useLayoutEffect, useRef, useState } from 'react'
import { useThree } from '@react-three/fiber'
import { Environment, Helper, Lightformer } from '@react-three/drei'
import { DirectionalLightHelper, Object3D, SpotLightHelper } from 'three'

const showHelpers = import.meta.env.DEV && new URLSearchParams(window.location.search).has('lightHelpers')

function AimedDirectional({ configuration, castShadow, shadow }) {
    const [target] = useState(() => new Object3D())
    const light = useRef(null)
    useLayoutEffect(() => {
        light.current.shadow.map?.setSize(shadow.mapSize, shadow.mapSize)
        light.current.shadow.mapPass?.setSize(shadow.mapSize, shadow.mapSize)
    }, [shadow.mapSize])
    return <>
        <primitive object={target} position={configuration.target} />
        <directionalLight
            ref={light}
            name={configuration.name}
            visible={configuration.enabled}
            position={configuration.position}
            color={configuration.color}
            intensity={configuration.enabled ? configuration.intensity : 0}
            target={target}
            castShadow={castShadow}
            shadow-mapSize={[shadow.mapSize, shadow.mapSize]}
            shadow-camera-left={-80}
            shadow-camera-right={80}
            shadow-camera-top={65}
            shadow-camera-bottom={-65}
            shadow-camera-near={5}
            shadow-camera-far={200}
            shadow-normalBias={shadow.normalBias}
            shadow-bias={shadow.bias}
            shadow-radius={shadow.radius}
            shadow-intensity={shadow.intensity}
        >
            {showHelpers && <Helper type={DirectionalLightHelper} args={[4]} />}
        </directionalLight>
    </>
}

function RoadLamp({ configuration, settings }) {
    const [target] = useState(() => new Object3D())
    return <>
        <primitive object={target} position={configuration.target} />
        <spotLight visible={settings.enabled && configuration.enabled} color={settings.color} intensity={settings.intensity * configuration.brightness} angle={settings.angle} penumbra={settings.penumbra} distance={settings.distance} decay={settings.decay} name={configuration.name} position={configuration.position} target={target}>
            {showHelpers && <Helper type={SpotLightHelper} />}
        </spotLight>
    </>
}

const NightEnvironment = memo(function NightEnvironment({ panels, resolution }) {
    return <Environment frames={1} resolution={resolution} background={false}>
            <color attach="background" args={['#080e1c']} />
            {panels.map(panel => <Lightformer key={panel.name} form="rect" color={panel.color} intensity={panel.enabled ? panel.intensity : 0} position={panel.position} rotation={panel.rotation} scale={panel.scale} />)}
        </Environment>
})

export default function AirportLighting({ desktopShadows, settings }) {
    const { scene, gl } = useThree()
    // Update scalar uniforms without recapturing the reflection map on each
    // strength/exposure slider movement. Panel edits alone recapture the map.
    useLayoutEffect(() => {
        scene.environmentIntensity = settings.environment.intensity
        gl.toneMappingExposure = settings.exposure
    }, [scene, gl, settings])
    return <>
        {settings.hemisphere.enabled && <hemisphereLight name="night-sky-fill" args={[settings.hemisphere.sky, settings.hemisphere.ground, settings.hemisphere.intensity]} />}
        {settings.directionals.map((configuration, index) =>
            <AimedDirectional key={configuration.name} configuration={configuration} shadow={settings.shadows} castShadow={desktopShadows && configuration.enabled && index === 0} />
        )}
        {settings.lamps.map(configuration => <RoadLamp key={configuration.name} configuration={configuration} settings={settings.road} />)}
        {/* Keep the static reflection capture stable during live shadow comparisons. */}
        {settings.environment.enabled && <NightEnvironment panels={settings.environment.panels} resolution={settings.environment.resolution} />}
    </>
}
