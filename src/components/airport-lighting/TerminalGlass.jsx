import { useLayoutEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { createTerminalGlass, terminalInteriorDefaults, updateTerminalGlass } from './terminal-interior'

export default function TerminalGlass({ geometry, material, settings = terminalInteriorDefaults }) {
    const mesh = useRef(null)
    const lighting = useRef(null)
    useLayoutEffect(() => {
        const target = mesh.current
        const current = createTerminalGlass(material)
        lighting.current = current
        target.material = current.material
        return () => { target.material = material; lighting.current = null; current.dispose() }
    }, [material])
    useFrame(() => { if (lighting.current) updateTerminalGlass(lighting.current, settings) })
    return <mesh ref={mesh} name="Plane001_4" geometry={geometry} material={material} dispose={null} />
}
