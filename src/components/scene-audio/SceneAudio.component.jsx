import { Suspense } from 'react'
import { PositionalAudio } from '@react-three/drei'
import useTabInUse from '../../hooks/useTabInUse'

// Audio loads independently so it cannot hide an already-loaded scene.
export default function SceneAudio({ ready, ...props }) {
    const visible = useTabInUse()
    if (!ready || !visible) return null
    return <Suspense fallback={null}><PositionalAudio {...props} /></Suspense>
}
