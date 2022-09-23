import { Html } from '@react-three/drei'
import { Suspense, cloneElement, useEffect, useState } from 'react'
import { RotateLoader } from 'react-spinners'
import Spinner from '../spinner/Spinner.component'
import { AnchorContainer, IntroContainer } from './Intro.styles'

function Ready({ setReady }) {
    useEffect(() => () => void setReady(true), [])
    return null
}

export default function Intro({ children }) {
    const [clicked, setClicked] = useState(false)
    const [ready, setReady] = useState(false)
    return (
        <IntroContainer>
            <Suspense fallback={<Ready setReady={setReady} />}>
                {cloneElement(children, { ready: clicked && ready })}
            </Suspense>
            <div className={`fullscreen bg ${ready ? 'ready' : 'notready'} ${clicked && 'clicked'}`}>
                <div className="stack">
                    
                    {ready?
                    <AnchorContainer href='#' onClick={() => setClicked(true)}>
                        {!ready ? 'loading' : 'click to continue'}
                    </AnchorContainer>
                    :
                    // <Spinner/>
                    <RotateLoader color='#1790ff' loading={!ready}/>
                    }
                </div>
            </div>

        </IntroContainer>
    )
}
