import { useThree} from '@react-three/fiber'
import React from 'react'
import {useRef,useEffect} from 'react'
import { useGLTF } from '@react-three/drei'
const Lights = () => {
    const group = useRef()
    const { scene } = useThree()
    const { nodes, materials, animations } = useGLTF('./models/cars/scene-transformed.glb')

    const lightRef1 = useRef(null)
    const lightRef2 = useRef(null)
    const lightRef3 = useRef(null)
    const lightRef4 = useRef(null)
    const lightRef5 = useRef(null)
  
    const targetRef1 = useRef(null)
    const targetRef2 = useRef(null)
    const targetRef3 = useRef(null)
    const targetRef4 = useRef(null)
    const targetRef5 = useRef(null)


    const planeGreenLightRef = useRef(null)
    const planeRedLightRef = useRef(null)
  
    const planeGreenLightTarget = useRef(null)
    const planeRedLightTarget = useRef(null)
  
    const rearLightRef1 = useRef(null)
    const rearLightRef2 = useRef(null)
    const rearLightRef3 = useRef(null)
  
    const rearLightTarget1 = useRef(null)
    const rearLightTarget2 = useRef(null)
    const rearLightTarget3 = useRef(null)


    useEffect(() => {
        scene.add(lightRef1.current.target)
        scene.add(lightRef2.current.target)
        scene.add(lightRef3.current.target)
        scene.add(lightRef4.current.target)
        scene.add(lightRef5.current.target)
        scene.add(planeGreenLightRef.current.target)
        scene.add(planeRedLightRef.current.target)
        scene.add(rearLightRef1.current.target)
        scene.add(rearLightRef2.current.target)
        scene.add(rearLightRef3.current.target)
    
        scene.add(targetRef1.current)
        scene.add(targetRef2.current)
        scene.add(targetRef3.current)
        scene.add(targetRef4.current)
        scene.add(targetRef5.current)
        scene.add(planeGreenLightTarget.current)
        scene.add(planeRedLightTarget.current)
        scene.add(rearLightTarget1.current)
        scene.add(rearLightTarget2.current)
        scene.add(rearLightTarget3.current)
    
    
        lightRef1.current.target = targetRef1.current
        lightRef2.current.target = targetRef2.current
        lightRef3.current.target = targetRef3.current
        lightRef4.current.target = targetRef4.current
        lightRef5.current.target = targetRef5.current
        planeGreenLightRef.current.target = planeGreenLightTarget.current
        planeRedLightRef.current.target = planeRedLightTarget.current
        rearLightRef1.current.target = rearLightTarget1.current
        rearLightRef2.current.target = rearLightTarget2.current
        rearLightRef3.current.target = rearLightTarget3.current
    
    
      }, [scene])
    return (
        <group>
            <group name="rearLight1" position={[-32.59, 7.01, -17.31]} rotation={[Math.PI / 2, 0, 0]} scale={0.55}>
                <spotLight name="rearLight1_Orientation" intensity={200} angle={0.42} penumbra={0.19} decay={2} rotation={[-Math.PI / 2, 0, 0]} ref={rearLightRef1}>
                    <group position={[0, 0, -1]} />
                </spotLight>
            </group>
            <group name="spotlight5" position={[59.6, 5.61, 44.36]} rotation={[0, 0, -0.07]} scale={0.92}>
                <spotLight name="spotlight5_Orientation" intensity={200} angle={0.51} penumbra={0.23} decay={2} color="#ffebbf" rotation={[-Math.PI / 2, 0, 0]} ref={lightRef5}>
                    <group position={[0, 0, -1]} />
                </spotLight>
            </group>
            <group name="spotlight4" position={[59.6, 5.61, 26.09]} rotation={[0, 0, -0.07]}>
                <spotLight name="spotlight4_Orientation" intensity={200} angle={0.51} penumbra={0.23} decay={2} color="#ffebbf" rotation={[-Math.PI / 2, 0, 0]} ref={lightRef4}>
                    <group position={[0, 0, -1]} />
                </spotLight>
            </group>
            <group name="spotlight3" position={[59.6, 5.61, 4.51]} rotation={[0, 0, -0.07]}>
                <spotLight name="spotlight3_Orientation" intensity={200} angle={0.51} penumbra={0.23} decay={2} color="#ffebbf" rotation={[-Math.PI / 2, 0, 0]} ref={lightRef3}>
                    <group position={[0, 0, -1]} />
                </spotLight>
            </group>
            <group name="spotlight2" position={[59.6, 5.61, -14.85]} rotation={[0, 0, -0.07]}>
                <spotLight name="spotlight2_Orientation" intensity={200} angle={0.51} penumbra={0.23} decay={2} color="#ffebbf" rotation={[-Math.PI / 2, 0, 0]} ref={lightRef2}>
                    <group position={[0, 0, -1]} />
                </spotLight>
            </group>
            <group name="spotlight1" position={[59.6, 5.61, -33.89]} rotation={[0, 0, -0.07]}>
                <spotLight name="spotlight1_Orientation" intensity={200} angle={0.51} penumbra={0.23} decay={2} color="#ffebbf" rotation={[-Math.PI / 2, 0, 0]} ref={lightRef1}>
                    <group position={[0, 0, -1]} />
                </spotLight>
            </group>
            <group name="rearLight3" position={[-12.08, 5.95, 4.48]} rotation={[Math.PI / 2, 0, 0]} scale={0.32}>
                <spotLight name="rearLight3_Orientation" intensity={200} angle={0.42} penumbra={0.19} decay={2} rotation={[-Math.PI / 2, 0, 0]} ref={rearLightRef3}>
                    <group position={[0, 0, -1]} />
                </spotLight>
            </group>
            <group name="planeGreenLight" position={[-52.9, 5.95, 5.53]} rotation={[-Math.PI / 2, 0, 0]} scale={0.49}>
                <spotLight name="planeGreenLight_Orientation" intensity={100} angle={0.22} penumbra={0.26} decay={2} color="#ff0708" rotation={[-Math.PI / 2, 0, 0]} ref={planeGreenLightRef}>
                    <group position={[0, 0, -1]} />
                </spotLight>
            </group>
            <group name="rearLight2" position={[-53.04, 5.95, 4.48]} rotation={[Math.PI / 2, 0, 0]} scale={0.32}>
                <spotLight name="rearLight2_Orientation" intensity={200} angle={0.42} penumbra={0.19} decay={2} rotation={[-Math.PI / 2, 0, 0]} ref={rearLightRef2}>
                    <group position={[0, 0, -1]} />
                </spotLight>
            </group>
            <group name="planeRedLight" position={[-12.26, 5.95, 5.53]} rotation={[-Math.PI / 2, 0, 0]} scale={0.49}>
                <spotLight name="planeRedLight_Orientation" intensity={100} angle={0.22} penumbra={0.26} decay={2} color="#025500" rotation={[-Math.PI / 2, 0, 0]} ref={planeRedLightRef}>
                    <group position={[0, 0, -1]} />
                </spotLight>
            </group>
        </group>

    )
}

export default Lights