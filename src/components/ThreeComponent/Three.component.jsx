import React, { useRef } from 'react'
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei'
import { NewAirportScene } from '../new-airport-scene/NewAirportScene.component'
import LightingDiagnostics, { lightingDebug } from '../airport-lighting/LightingDiagnostics'
import AirportLighting from '../airport-lighting/AirportLighting'

const trafficReview = import.meta.env.DEV && new URLSearchParams(window.location.search).has('trafficReview')
const runwayReview = import.meta.env.DEV && new URLSearchParams(window.location.search).has('runwayReview')
const beaconReview = runwayReview && new URLSearchParams(window.location.search).get('runwayReview') === 'beacons'


const Three = ({ ready, onReady, desktopShadows, shadowsEnabled, lighting, animationsPaused }) => {
    const angleToRadians = (ang) => (Math.PI / 180) * ang
    const orbitControlRef = useRef(null)
    // const camRef = useRef(null)

    return (
        <>
            {/* use position of the perspective camera to set initial location then use orbitcontrol to change polar and azimuthal angle [80, 8.26, 9.51] */}
            <PerspectiveCamera makeDefault position={beaconReview ? [-4, 20, 51] : runwayReview ? [4, 25, 48] : trafficReview ? [79, 14, 8] : [80, 8.26, 9.51]} />
            <OrbitControls
                ref={orbitControlRef}
                target={beaconReview ? [-29, 2, 27] : runwayReview ? [-34, 2, 10] : trafficReview ? [56, 1, 8] : [0, 0, 0]}
                minPolarAngle={angleToRadians(45)}
                maxPolarAngle={angleToRadians(85)}
                minDistance={trafficReview || runwayReview ? 15 : 60}
                maxDistance={runwayReview ? 100 : trafficReview ? 50 : 90}
                rotateSpeed={0.35}
                enablePan={false}
            />
            <AirportLighting desktopShadows={desktopShadows} settings={lighting} />
            {lightingDebug && <LightingDiagnostics shadowsEnabled={shadowsEnabled} />}
            <Stars radius={100} depth={200} count={3000} factor={4} saturation={0} fade speed={2} />
            {/* <AirportScene  orbitControlRef={orbitControlRef} ready={ready}/> */}
            <NewAirportScene orbitControlRef={orbitControlRef} ready={ready} onReady={onReady} shadowsEnabled={shadowsEnabled} vehicleLighting={lighting.vehicles} groundLighting={lighting.runwayGround} contactShadowOpacity={lighting.shadows.contactOpacity} animationsPaused={animationsPaused}/>
        </>
    )
}

export default React.memo(Three)
