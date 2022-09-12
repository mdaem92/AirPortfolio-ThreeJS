import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function ConveyorBelt(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('./models/conveyor/conveyor_belt_truck-transformed.glb')
  const { actions } = useAnimations(animations, group)


  useEffect(()=>{
    Object.keys(actions).forEach((key)=>actions[key].play())

  })
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="conveyor-truck">
          <mesh name="Cube009_1" castShadow receiveShadow geometry={nodes.Cube009_1.geometry} material={materials['airplane_white.001']} />
          <mesh name="Cube009_2" castShadow receiveShadow geometry={nodes.Cube009_2.geometry} material={materials['window.002']} />
          <mesh name="Cube009_3" castShadow receiveShadow geometry={nodes.Cube009_3.geometry} material={materials['headlights.002']} />
          <mesh name="Cube009_4" castShadow receiveShadow geometry={nodes.Cube009_4.geometry} material={materials['orange.001']} />
          <mesh name="Cube009_5" castShadow receiveShadow geometry={nodes.Cube009_5.geometry} material={materials['taillights.002']} />
          <mesh name="Cube009_6" castShadow receiveShadow geometry={nodes.Cube009_6.geometry} material={materials['black.007']} />
          <mesh name="Cube009_7" castShadow receiveShadow geometry={nodes.Cube009_7.geometry} material={materials['metal_frame.004']} />
        </group>
        <mesh name="Cube004" castShadow receiveShadow geometry={nodes.Cube004.geometry} material={materials['black.007']} rotation={[0, 0, -0.01]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube005" castShadow receiveShadow geometry={nodes.Cube005.geometry} material={materials['black.007']} rotation={[0, 0, -0.01]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube006" castShadow receiveShadow geometry={nodes.Cube006.geometry} material={materials['black.007']} rotation={[0, 0, -0.01]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube007" castShadow receiveShadow geometry={nodes.Cube007.geometry} material={materials['black.007']} rotation={[0, 0, -0.02]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube008" castShadow receiveShadow geometry={nodes.Cube008.geometry} material={materials['black.007']} rotation={[0, 0, -0.02]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube009" castShadow receiveShadow geometry={nodes.Cube009.geometry} material={materials['black.007']} rotation={[0, 0, -0.03]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube010" castShadow receiveShadow geometry={nodes.Cube010.geometry} material={materials['black.007']} rotation={[0, 0, -0.03]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube011" castShadow receiveShadow geometry={nodes.Cube011.geometry} material={materials['black.007']} rotation={[0, 0, -0.05]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube012" castShadow receiveShadow geometry={nodes.Cube012.geometry} material={materials['black.007']} rotation={[0, 0, -0.06]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube013" castShadow receiveShadow geometry={nodes.Cube013.geometry} material={materials['black.007']} rotation={[0, 0, -0.06]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube014" castShadow receiveShadow geometry={nodes.Cube014.geometry} material={materials['black.007']} rotation={[0, 0, -0.07]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube015" castShadow receiveShadow geometry={nodes.Cube015.geometry} material={materials['black.007']} rotation={[0, 0, -0.07]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube016" castShadow receiveShadow geometry={nodes.Cube016.geometry} material={materials['black.007']} rotation={[0, 0, -0.08]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube017" castShadow receiveShadow geometry={nodes.Cube017.geometry} material={materials['black.007']} rotation={[0, 0, -0.08]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube018" castShadow receiveShadow geometry={nodes.Cube018.geometry} material={materials['black.007']} rotation={[0, 0, -0.08]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube019" castShadow receiveShadow geometry={nodes.Cube019.geometry} material={materials['black.007']} rotation={[0, 0, -0.08]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube020" castShadow receiveShadow geometry={nodes.Cube020.geometry} material={materials['black.007']} rotation={[0, 0, -0.1]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube021" castShadow receiveShadow geometry={nodes.Cube021.geometry} material={materials['black.007']} rotation={[0, 0, -0.11]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube022" castShadow receiveShadow geometry={nodes.Cube022.geometry} material={materials['black.007']} rotation={[0, 0, -0.11]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube023" castShadow receiveShadow geometry={nodes.Cube023.geometry} material={materials['black.007']} rotation={[0, 0, -0.13]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube024" castShadow receiveShadow geometry={nodes.Cube024.geometry} material={materials['black.007']} rotation={[0, 0, -0.13]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube025" castShadow receiveShadow geometry={nodes.Cube025.geometry} material={materials['black.007']} rotation={[0, 0, -0.13]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube026" castShadow receiveShadow geometry={nodes.Cube026.geometry} material={materials['black.007']} rotation={[0, 0, -0.13]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube027" castShadow receiveShadow geometry={nodes.Cube027.geometry} material={materials['black.007']} rotation={[0, 0, -0.06]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube028" castShadow receiveShadow geometry={nodes.Cube028.geometry} material={materials['black.007']} rotation={[0, 0, 0.14]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube029" castShadow receiveShadow geometry={nodes.Cube029.geometry} material={materials['black.007']} rotation={[0, 0, 0.14]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube030" castShadow receiveShadow geometry={nodes.Cube030.geometry} material={materials['black.007']} rotation={[0, 0, 0.14]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube031" castShadow receiveShadow geometry={nodes.Cube031.geometry} material={materials['black.007']} rotation={[0, 0, 0.14]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube032" castShadow receiveShadow geometry={nodes.Cube032.geometry} material={materials['black.007']} rotation={[0, 0, 0.14]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube033" castShadow receiveShadow geometry={nodes.Cube033.geometry} material={materials['black.007']} rotation={[0, 0, 0.13]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube034" castShadow receiveShadow geometry={nodes.Cube034.geometry} material={materials['black.007']} rotation={[0, 0, 0.11]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube035" castShadow receiveShadow geometry={nodes.Cube035.geometry} material={materials['black.007']} rotation={[0, 0, 0.11]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube036" castShadow receiveShadow geometry={nodes.Cube036.geometry} material={materials['black.007']} rotation={[0, 0, 0.11]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube037" castShadow receiveShadow geometry={nodes.Cube037.geometry} material={materials['black.007']} rotation={[0, 0, 0.11]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube038" castShadow receiveShadow geometry={nodes.Cube038.geometry} material={materials['black.007']} rotation={[0, 0, 0.1]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube039" castShadow receiveShadow geometry={nodes.Cube039.geometry} material={materials['black.007']} rotation={[0, 0, 0.09]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube040" castShadow receiveShadow geometry={nodes.Cube040.geometry} material={materials['black.007']} rotation={[0, 0, 0.09]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube041" castShadow receiveShadow geometry={nodes.Cube041.geometry} material={materials['black.007']} rotation={[0, 0, 0.08]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube042" castShadow receiveShadow geometry={nodes.Cube042.geometry} material={materials['black.007']} rotation={[0, 0, 0.05]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube043" castShadow receiveShadow geometry={nodes.Cube043.geometry} material={materials['black.007']} rotation={[0, 0, 0.05]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube044" castShadow receiveShadow geometry={nodes.Cube044.geometry} material={materials['black.007']} rotation={[0, 0, 0.04]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube045" castShadow receiveShadow geometry={nodes.Cube045.geometry} material={materials['black.007']} rotation={[0, 0, 0.03]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube046" castShadow receiveShadow geometry={nodes.Cube046.geometry} material={materials['black.007']} rotation={[0, 0, -0.03]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube047" castShadow receiveShadow geometry={nodes.Cube047.geometry} material={materials['black.007']} rotation={[0, 0, -0.03]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube048" castShadow receiveShadow geometry={nodes.Cube048.geometry} material={materials['black.007']} rotation={[0, 0, -0.02]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube049" castShadow receiveShadow geometry={nodes.Cube049.geometry} material={materials['black.007']} rotation={[0, 0, -0.02]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube050" castShadow receiveShadow geometry={nodes.Cube050.geometry} material={materials['black.007']} rotation={[0, 0, -0.01]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube051" castShadow receiveShadow geometry={nodes.Cube051.geometry} material={materials['black.007']} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube052" castShadow receiveShadow geometry={nodes.Cube052.geometry} material={materials['black.007']} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube053" castShadow receiveShadow geometry={nodes.Cube053.geometry} material={materials['black.007']} rotation={[0, 0, 0.01]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube054" castShadow receiveShadow geometry={nodes.Cube054.geometry} material={materials['black.007']} rotation={[0, 0, 0.01]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube055" castShadow receiveShadow geometry={nodes.Cube055.geometry} material={materials['black.007']} rotation={[0, 0, 0.03]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube056" castShadow receiveShadow geometry={nodes.Cube056.geometry} material={materials['black.007']} rotation={[0, 0, 0.03]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube059" castShadow receiveShadow geometry={nodes.Cube059.geometry} material={materials['black.007']} rotation={[0, 0, 0.04]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube062" castShadow receiveShadow geometry={nodes.Cube062.geometry} material={materials['black.007']} rotation={[0, 0, 0.06]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube064" castShadow receiveShadow geometry={nodes.Cube064.geometry} material={materials['black.007']} rotation={[0, 0, 0.08]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube148" castShadow receiveShadow geometry={nodes.Cube148.geometry} material={materials['black.007']} rotation={[0, 0, -0.04]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube151" castShadow receiveShadow geometry={nodes.Cube151.geometry} material={materials['black.007']} rotation={[0, 0, -0.05]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube160" castShadow receiveShadow geometry={nodes.Cube160.geometry} material={materials['black.007']} rotation={[0, 0, -0.05]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube161" castShadow receiveShadow geometry={nodes.Cube161.geometry} material={materials['black.007']} rotation={[0, 0, -0.05]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube162" castShadow receiveShadow geometry={nodes.Cube162.geometry} material={materials['black.007']} rotation={[0, 0, -0.07]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube163" castShadow receiveShadow geometry={nodes.Cube163.geometry} material={materials['black.007']} rotation={[0, 0, -0.07]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube164" castShadow receiveShadow geometry={nodes.Cube164.geometry} material={materials['black.007']} rotation={[0, 0, -0.09]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube165" castShadow receiveShadow geometry={nodes.Cube165.geometry} material={materials['black.007']} rotation={[0, 0, -0.07]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube166" castShadow receiveShadow geometry={nodes.Cube166.geometry} material={materials['black.007']} rotation={[0, 0, -0.08]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube167" castShadow receiveShadow geometry={nodes.Cube167.geometry} material={materials['black.007']} rotation={[0, 0, -0.09]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube168" castShadow receiveShadow geometry={nodes.Cube168.geometry} material={materials['black.007']} rotation={[0, 0, -0.11]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube169" castShadow receiveShadow geometry={nodes.Cube169.geometry} material={materials['black.007']} rotation={[0, 0, -0.11]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube170" castShadow receiveShadow geometry={nodes.Cube170.geometry} material={materials['black.007']} rotation={[0, 0, -0.11]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube171" castShadow receiveShadow geometry={nodes.Cube171.geometry} material={materials['black.007']} rotation={[0, 0, -0.11]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube172" castShadow receiveShadow geometry={nodes.Cube172.geometry} material={materials['black.007']} rotation={[0, 0, -0.13]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube173" castShadow receiveShadow geometry={nodes.Cube173.geometry} material={materials['black.007']} rotation={[0, 0, -0.14]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube174" castShadow receiveShadow geometry={nodes.Cube174.geometry} material={materials['black.007']} rotation={[0, 0, -0.14]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube176" castShadow receiveShadow geometry={nodes.Cube176.geometry} material={materials['black.007']} rotation={[0, 0, -0.14]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube179" castShadow receiveShadow geometry={nodes.Cube179.geometry} material={materials['black.007']} rotation={[0, 0, 0.13]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube180" castShadow receiveShadow geometry={nodes.Cube180.geometry} material={materials['black.007']} rotation={[0, 0, 0.13]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube181" castShadow receiveShadow geometry={nodes.Cube181.geometry} material={materials['black.007']} rotation={[0, 0, 0.13]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube182" castShadow receiveShadow geometry={nodes.Cube182.geometry} material={materials['black.007']} rotation={[0, 0, 0.13]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube183" castShadow receiveShadow geometry={nodes.Cube183.geometry} material={materials['black.007']} rotation={[0, 0, 0.13]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube184" castShadow receiveShadow geometry={nodes.Cube184.geometry} material={materials['black.007']} rotation={[0, 0, 0.13]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube186" castShadow receiveShadow geometry={nodes.Cube186.geometry} material={materials['black.007']} rotation={[0, 0, 0.12]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube188" castShadow receiveShadow geometry={nodes.Cube188.geometry} material={materials['black.007']} rotation={[0, 0, 0.12]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube189" castShadow receiveShadow geometry={nodes.Cube189.geometry} material={materials['black.007']} rotation={[0, 0, 0.12]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube190" castShadow receiveShadow geometry={nodes.Cube190.geometry} material={materials['black.007']} rotation={[0, 0, 0.11]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube191" castShadow receiveShadow geometry={nodes.Cube191.geometry} material={materials['black.007']} rotation={[0, 0, 0.1]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube193" castShadow receiveShadow geometry={nodes.Cube193.geometry} material={materials['black.007']} rotation={[0, 0, 0.08]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube194" castShadow receiveShadow geometry={nodes.Cube194.geometry} material={materials['black.007']} rotation={[0, 0, 0.09]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube195" castShadow receiveShadow geometry={nodes.Cube195.geometry} material={materials['black.007']} rotation={[0, 0, 0.09]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube196" castShadow receiveShadow geometry={nodes.Cube196.geometry} material={materials['black.007']} rotation={[0, 0, 0.07]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube197" castShadow receiveShadow geometry={nodes.Cube197.geometry} material={materials['black.007']} rotation={[0, 0, 0.07]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube198" castShadow receiveShadow geometry={nodes.Cube198.geometry} material={materials['black.007']} rotation={[0, 0, 0.06]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube199" castShadow receiveShadow geometry={nodes.Cube199.geometry} material={materials['black.007']} rotation={[0, 0, 0.04]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube200" castShadow receiveShadow geometry={nodes.Cube200.geometry} material={materials['black.007']} rotation={[0, 0, 0.04]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube201" castShadow receiveShadow geometry={nodes.Cube201.geometry} material={materials['black.007']} rotation={[0, 0, 0.05]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube202" castShadow receiveShadow geometry={nodes.Cube202.geometry} material={materials['black.007']} rotation={[0, 0, 0.04]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube203" castShadow receiveShadow geometry={nodes.Cube203.geometry} material={materials['black.007']} rotation={[0, 0, 0.02]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube204" castShadow receiveShadow geometry={nodes.Cube204.geometry} material={materials['black.007']} rotation={[0, 0, 0.02]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube205" castShadow receiveShadow geometry={nodes.Cube205.geometry} material={materials['black.007']} rotation={[0, 0, 0.02]} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube206" castShadow receiveShadow geometry={nodes.Cube206.geometry} material={materials['black.007']} scale={[0.07, 0, 0.42]} />
        <mesh name="Cube207" castShadow receiveShadow geometry={nodes.Cube207.geometry} material={materials['black.007']} scale={[0.07, 0, 0.42]} />
        <group name="police_car007" position={[0.77, 2.98, 0.66]} rotation={[0, 1.57, 0]} scale={0.39}>
          <mesh name="Cube038_1" castShadow receiveShadow geometry={nodes.Cube038_1.geometry} material={materials['black.007']} />
          <mesh name="Cube038_2" castShadow receiveShadow geometry={nodes.Cube038_2.geometry} material={materials['metal_frame.004']} />
          <mesh name="Cube038_3" castShadow receiveShadow geometry={nodes.Cube038_3.geometry} material={materials.siren_orange} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('./models/conveyor/conveyor_belt_truck-transformed.glb')