import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'

export const lightingDebug = import.meta.env.DEV && new URLSearchParams(window.location.search).has('lightingDebug')

export default function LightingDiagnostics({ shadowsEnabled = true }) {
    const label = useRef(null)
    const sample = useRef({ seconds: 0, frames: 0 })

    useFrame(({ gl, scene }, delta) => {
        const current = sample.current
        current.seconds += delta
        current.frames += 1
        if (current.seconds < 1 || !label.current) return
        let lights = 0
        let shadowLights = 0
        let hemisphere = false
        const traffic = []
        const spill = []
        let policePosition = ''
        scene.traverse(object => {
            if (object.isLight && object.visible) lights += 1
            if (object.isLight && object.visible && object.castShadow) shadowLights += 1
            if (object.isHemisphereLight) hemisphere = true
            if (object.name.startsWith('vehicle-lights-') && object.visible) traffic.push(object.name.replace('vehicle-lights-', ''))
            if (object.name.startsWith('police-spill-')) spill.push(`${object.name.replace('police-spill-', '')}: ${object.intensity.toFixed(0)}`)
            if (object.name === 'police_car') policePosition = ` · road z ${object.position.z.toFixed(0)}`
        })
        label.current.textContent = `${Math.round(current.frames / current.seconds)} fps · ${(1000 * current.seconds / current.frames).toFixed(1)} ms average\n${gl.info.render.calls} draw calls · ${gl.info.render.triangles.toLocaleString()} triangles\n${lights} lights · ${shadowLights} shadow lights · DPR ${gl.getPixelRatio()}\n${!shadowsEnabled ? 'Shadows off' : gl.shadowMap.enabled ? 'Desktop shadows' : 'Contact shadows only'}\nHemisphere ${hemisphere ? 'on' : 'off'} · Reflections ${scene.environment ? 'on' : 'off'}\nTraffic: ${traffic.join(', ') || 'off'}\nPolice spill ${spill.join(' / ')}${policePosition}`
        current.seconds = 0
        current.frames = 0
    })

    return <Html fullscreen calculatePosition={(_object, _camera, size) => [size.width / 2, size.height / 2]} style={{ pointerEvents: 'none' }}>
        <pre ref={label} style={{ position: 'absolute', top: 8, right: 8, maxWidth: 'calc(100vw - 16px)', whiteSpace: 'pre-wrap', margin: 0, padding: 10, color: '#d8e8ff', background: '#07101ee6', font: '12px/1.6 monospace' }}>Sampling lighting…</pre>
    </Html>
}
