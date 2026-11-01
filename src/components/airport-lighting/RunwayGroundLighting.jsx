import { useLayoutEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { createRunwayGroundSequence, updateRunwayGroundSequence } from './runway-ground-sequence'

export default function RunwayGroundLighting({ geometry, material, active, settings }) {
    const mesh = useRef(null)
    const sequence = useRef(null)
    const elapsed = useRef(0)
    useLayoutEffect(() => {
        const target = mesh.current
        const current = createRunwayGroundSequence(geometry, material)
        sequence.current = current
        target.geometry = current.geometry
        target.material = current.material
        return () => {
            target.geometry = geometry
            target.material = material
            sequence.current = null
            current.dispose()
        }
    }, [geometry, material])
    useFrame((_, delta) => {
        if (!active || !sequence.current) return
        elapsed.current += delta
        updateRunwayGroundSequence(sequence.current, elapsed.current, settings)
    })
    return <mesh ref={mesh} name="runway_lights_white" geometry={geometry} material={material} position={[-62.03, 0.99, 4.94]} dispose={null} />
}
