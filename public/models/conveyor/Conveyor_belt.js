/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/conveyor_belt-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.Cube002.geometry} material={materials.black} scale={[0.07, 0, 0.42]} />
      <mesh castShadow receiveShadow geometry={nodes.Cube102.geometry} material={materials.black} scale={[0.07, 0, 0.42]} />
      <mesh castShadow receiveShadow geometry={nodes.Cube103.geometry} material={materials.black} scale={[0.07, 0, 0.42]} />
      <mesh castShadow receiveShadow geometry={nodes.Cube104.geometry} material={materials.black} rotation={[0, 0, 0.03]} scale={[0.07, 0, 0.42]} />
      <mesh castShadow receiveShadow geometry={nodes.Cube105.geometry} material={materials.black} rotation={[0, 0, 0.03]} scale={[0.07, 0, 0.42]} />
      <mesh castShadow receiveShadow geometry={nodes.Cube106.geometry} material={materials.black} rotation={[0, 0, 0.03]} scale={[0.07, 0, 0.42]} />
      <mesh castShadow receiveShadow geometry={nodes.Cube107.geometry} material={materials.black} rotation={[0, 0, 0.03]} scale={[0.07, 0, 0.42]} />
      <mesh castShadow receiveShadow geometry={nodes.Cube108.geometry} material={materials.black} rotation={[0, 0, 0.03]} scale={[0.07, 0, 0.42]} />
      <mesh castShadow receiveShadow geometry={nodes.Cube109.geometry} material={materials.black} rotation={[0, 0, 0.03]} scale={[0.07, 0, 0.42]} />
    </group>
  )
}

useGLTF.preload('/conveyor_belt-transformed.glb')