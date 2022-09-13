import React, { useEffect, useRef } from 'react'
import { BakeShadows, ContactShadows, Environment, OrbitControls, PresentationControls, PerspectiveCamera, Sky, useHelper, FlyControls, Billboard, Text } from '@react-three/drei'
import ArrowHelper from '../Arrow-helper/ArrowHelper.component'
import { HemisphereLight, Vector3, BackSide, DirectionalLightHelper, PointLightHelper, SpotLightHelper } from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import gsap from "gsap"
import { useKeyState } from 'use-key-state'
import { Plane } from '../737/Plane.component'
import { Cars } from '../cars/Cars.component'
import { ConveyorBelt } from '../conveyorTruck/conveyor.component'
import MoonlitGolf from '../../HDRI/moonlit_golf_1k.hdr'
import BlueNight from '../../HDRI/blaubeuren_night_4k.hdr'
import Stpeters from '../../HDRI/st_peters_square_night_4k.hdr'
import Shanghai from '../../HDRI/shanghai_bund_4k.hdr'
import dikhololo from '../../HDRI/dikhololo_night_4k.hdr'
import satara from '../../HDRI/satara_night_no_lamps_4k.hdr'
import venice from '../../HDRI/venice_sunset_2k.hdr'

import { useState } from 'react'

const Three = () => {

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
    const { w } = useKeyState({ w: 'w' })
    const { a } = useKeyState({ a: 'a' })
    const { s } = useKeyState({ s: 's' })
    const { d } = useKeyState({ d: 'd' })
    const [zoom, setZoom] = useState(false)
    const [focus, setFocus] = useState({})
    const [controlEnabled,setOrbitControl] = useState(true)
    const [zoomEnabled,setZoomEnabled] = useState(false)

    return (
        <>

            {/* use position of the perspective camera to set initial location then use orbitcontrol to change polar and azimuthal angle */}
            {/* <PerspectiveCamera makeDefault position={[80, 10, 8]} /> */}
            
            <PerspectiveCamera makeDefault position={[80, 8.26, 9.51]} ref={camRef} />

            {/* <Controls zoom={zoom} focus={focus} /> */}
            <OrbitControls 
                ref={orbitControlRef} 
                minPolarAngle={angleToRadians(20)} 
                maxPolarAngle={angleToRadians(88)} 
                minDistance={60} 
                maxDistance={100}
                rotateSpeed={0.6}
                enabled={controlEnabled}
                enableZoom={zoomEnabled}
                
            
            />



            <ArrowHelper x={5} y={0} z={0} color={0xffff00} dir={new Vector3(0, 2, 0)} />
            <ArrowHelper x={5} y={0} z={0} color={0x0000FF} />
            <ArrowHelper x={5} y={0} z={0} color={0xff0000} dir={new Vector3(2, 0, 0)} />
            <ambientLight args={['#ffffff', 0.2]} />

            {/* <Billboard
                follow={true}
                lockX={false}
                lockY={false}
                lockZ={false} // Lock the rotation on the z axis (default=false)
            >
                <Text fontSize={1}>I'm a billboard</Text>
            </Billboard> */}
            <Cars setOrbitControl={setOrbitControl} camRef={camRef} setZoomEnabled={setZoomEnabled}/>
            {/* <ConveyorBelt /> */}
            <Environment files={satara} />

        </>
    )
}

export default Three