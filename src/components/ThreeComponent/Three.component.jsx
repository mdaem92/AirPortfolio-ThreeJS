import React, { useRef } from 'react'
import { OrbitControls, PerspectiveCamera ,Stars } from '@react-three/drei'
import { AirportScene } from '../airport-scene/AirportScene.component'


const Three = ({ready}) => {
    const angleToRadians = (ang) => (Math.PI / 180) * ang
    const orbitControlRef = useRef(null)
    // const camRef = useRef(null)

    return (
        <>
            {/* use position of the perspective camera to set initial location then use orbitcontrol to change polar and azimuthal angle  [80, 8.26, 9.51]*/}
            <PerspectiveCamera makeDefault position={[80, 8.26, 9.51]}  />
            <OrbitControls 
                ref={orbitControlRef} 
                minPolarAngle={angleToRadians(30)} 
                maxPolarAngle={angleToRadians(88)} 
                minDistance={60} 
                maxDistance={90}
                rotateSpeed={0.6}
                enableZoom
            />
            <ambientLight args={['#ffffff', 0.2]} />
            <Stars radius={100} depth={200} count={5000} factor={4} saturation={0} fade speed={2} />
            <AirportScene  orbitControlRef={orbitControlRef} ready={ready}/>
        </>
    )
}

export default Three