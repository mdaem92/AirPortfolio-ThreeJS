import React, { useEffect, useRef } from 'react'
import { OrbitControls, PerspectiveCamera, useHelper ,Stars } from '@react-three/drei'
import ArrowHelper from '../Arrow-helper/ArrowHelper.component'
import { Vector3, DirectionalLightHelper, PointLightHelper, SpotLightHelper } from 'three'
import { useFrame } from '@react-three/fiber'

import { useKeyState } from 'use-key-state'
import { Cars } from '../cars/Cars.component'


import { useState } from 'react'

const Three = ({started}) => {

    const angleToRadians = (ang) => (Math.PI / 180) * ang
    const orbitControlRef = useRef(null)
    const directionalLightRef = useRef(null)
    const pointLightRef = useRef(null)
    const spotLightRef = useRef(null)
    const camRef = useRef(null)
    const showHelpers = true


    // useFrame((state)=>{
    //     // console.log(state.mouse);
    //     if(!!orbitControlRef.current){
    //         const {x,y} = state.mouse
    //         orbitControlRef.current.setPolarAngle(angleToRadians(90))
    //         // console.log(x,y);
    //         // console.log(y*angleToRadians(90-180));
    //         // mouse values range from -1 to 1 - multiplying that by 180 gives full 360 degree range of rotation in radians
    //         // orbitControlRef.current.setAzimuthalAngle(x*angleToRadians(180))
    //         orbitControlRef.current.setAzimuthalAngle(x*angleToRadians(180))
    //         // always subtract 90 since polar angle begins from the top
    //         orbitControlRef.current.setPolarAngle(y*angleToRadians(90))
    //         orbitControlRef.current.update()
    //     }

    // })

    useFrame(() => {
        if (!!directionalLightRef.current) {
            // directionalLightRef.setRotationFromAxisAngle()
        }
    })

    useEffect(() => {
        if (!!orbitControlRef.current) {
            // orbitControlRef.current.setPolarAngle(angleToRadians(90))
            console.log(orbitControlRef.current)
        }
    }, [])

    useHelper(showHelpers && directionalLightRef, DirectionalLightHelper, 1)
    useHelper(showHelpers && pointLightRef, PointLightHelper, 1)
    useHelper(showHelpers && spotLightRef, SpotLightHelper, 0xffff00)
    const [controlEnabled,setOrbitControl] = useState(true)


    return (
        <>

            {/* use position of the perspective camera to set initial location then use orbitcontrol to change polar and azimuthal angle */}
            {/* <PerspectiveCamera makeDefault position={[80, 10, 8]} /> */}
            
            <PerspectiveCamera makeDefault position={[80, 8.26, 9.51]} ref={camRef} />

            {/* <Controls zoom={zoom} focus={focus} /> */}
            <OrbitControls 
                ref={orbitControlRef} 
                minPolarAngle={angleToRadians(30)} 
                maxPolarAngle={angleToRadians(88)} 
                minDistance={60} 
                maxDistance={90}
                rotateSpeed={0.6}
                enabled={controlEnabled}
                enableZoom
            />

            <ArrowHelper x={5} y={0} z={0} color={0xffff00} dir={new Vector3(0, 2, 0)} />
            <ArrowHelper x={5} y={0} z={0} color={0x0000FF} />
            <ArrowHelper x={5} y={0} z={0} color={0xff0000} dir={new Vector3(2, 0, 0)} />
            <ambientLight args={['#ffffff', 0.2]} />
            <Stars radius={100} depth={200} count={5000} factor={4} saturation={0} fade speed={2} />

            <Cars setOrbitControl={setOrbitControl} camRef={camRef} orbitControlRef={orbitControlRef}/>
            {/* <Environment files={satara} /> */}

        </>
    )
}

export default Three