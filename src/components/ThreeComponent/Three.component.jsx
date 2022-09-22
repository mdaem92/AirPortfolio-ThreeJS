import React, { useRef } from 'react'
import { OrbitControls, PerspectiveCamera ,Stars } from '@react-three/drei'

import { AirportScene } from '../airport-scene/AirportScene.component'


const Three = () => {
    const angleToRadians = (ang) => (Math.PI / 180) * ang
    const orbitControlRef = useRef(null)
    const camRef = useRef(null)

    return (
        <>
            {/* use position of the perspective camera to set initial location then use orbitcontrol to change polar and azimuthal angle */}
            <PerspectiveCamera makeDefault position={[80, 8.26, 9.51]} ref={camRef} />
            <OrbitControls 
                ref={orbitControlRef} 
                minPolarAngle={angleToRadians(30)} 
                maxPolarAngle={angleToRadians(88)} 
                minDistance={60} 
                maxDistance={90}
                rotateSpeed={0.6}
                enableZoom
            />
            {/* <ArrowHelper x={5} y={0} z={0} color={0xffff00} dir={new Vector3(0, 2, 0)} />
            <ArrowHelper x={5} y={0} z={0} color={0x0000FF} />
            <ArrowHelper x={5} y={0} z={0} color={0xff0000} dir={new Vector3(2, 0, 0)} /> */}
            <ambientLight args={['#ffffff', 0.2]} />
            <Stars radius={100} depth={200} count={5000} factor={4} saturation={0} fade speed={2} />
            <AirportScene camRef={camRef} orbitControlRef={orbitControlRef}/>
        </>
    )
}

export default Three