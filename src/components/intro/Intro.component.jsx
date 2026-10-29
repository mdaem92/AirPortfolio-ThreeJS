import { Suspense, cloneElement, useCallback, useState } from 'react'
import { RotateLoader } from 'react-spinners'
import { AnchorContainer, IntroContainer } from './Intro.styles'

export default function Intro({ children }) {
    const [clicked, setClicked] = useState(false)
    const [ready, setReady] = useState(false)
    const handleReady = useCallback(() => setReady(true), [])
    return (
        <IntroContainer>
            <Suspense fallback={null}>
                {cloneElement(children, { ready: clicked && ready, onReady: handleReady })}
            </Suspense>
            <div className={`fullscreen bg ${ready ? 'ready' : 'notready'} ${clicked && 'clicked'}`}>
                <div className="stack">
                    
                    {ready?
                    !clicked && <AnchorContainer href='#' onClick={(event) => { event.preventDefault(); setClicked(true) }}>
                        START
                    </AnchorContainer>
                    :
                    <RotateLoader color='#1790ff' loading={!ready}/>
                    }
                </div>
            </div>

        </IntroContainer>
    )
}
