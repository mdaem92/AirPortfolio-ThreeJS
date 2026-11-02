import { useState } from 'react'
import { Object3D } from 'three'

function EntranceSpill({ z, settings }) {
    const [target] = useState(() => new Object3D())
    const active = settings.enabled && settings.spillEnabled
    return <>
        <primitive object={target} position={[32.5, 1.05, z]} />
        {/* Keep the light count stable: toggles only change intensity, avoiding
            a whole-scene shader rebuild during comparisons. */}
        <spotLight name={`terminal-entrance-spill-${z}`} intensity={active ? settings.spillIntensity : 0} position={[29, 4.9, z]} target={target} color={settings.color} distance={settings.spillDistance} angle={0.78} penumbra={0.85} decay={2} castShadow={false} />
    </>
}

export default function TerminalInteriorLights({ settings }) {
    return <group name="terminal-interior-spill">{[8.1, 12.8].map(z => <EntranceSpill key={z} z={z} settings={settings} />)}</group>
}
