import React from 'react'
import * as THREE from 'three'

const ArrowHelper = ({x,y,z,color,dir}) => {
    
    const origin = new THREE.Vector3(x, y, z );
    const length = 1;
    const hex = color;
    

  return (
    <arrowHelper args={[dir, origin, length, hex]}/>
    
    
  )
}

export default ArrowHelper