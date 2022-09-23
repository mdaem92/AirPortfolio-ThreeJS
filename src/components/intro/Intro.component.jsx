import { Html } from '@react-three/drei'
import { Suspense, cloneElement, useEffect, useState } from 'react'

function Ready({ setReady }) {
    useEffect(() => () => void setReady(true), [])
    return null
}

export default function Intro({ children }) {
    const [clicked, setClicked] = useState(false)
    const [ready, setReady] = useState(false)
    return (
        <>
            <Suspense fallback={<Ready setReady={setReady} />}>
                {cloneElement(children, { ready: clicked && ready })}
            </Suspense>
            {/* <Html>
                <div className={`fullscreen bg ${ready ? 'ready' : 'notready'} ${clicked && 'clicked'}`}>
                    <div className="stack">
                        <button onClick={() => setClicked(true)}>
                            {!ready ? 'loading' : 'click to continue'}
                        </button>
                    </div>
                </div>
            </Html> */}
            <div className={`fullscreen bg ${ready ? 'ready' : 'notready'} ${clicked && 'clicked'}`}>
                <div className="stack">
                    <button onClick={() => setClicked(true)}>
                        {!ready ? 'loading' : 'click to continue'}
                    </button>
                </div>
            </div>

        </>
    )
}
