import { Suspense, cloneElement, useCallback, useState } from 'react'
import { IntroContainer } from './Intro.styles'
import { baselineMark } from '../../performance/baseline-markers'

export default function Intro({ children }) {
    const [clicked, setClicked] = useState(false)
    const [ready, setReady] = useState(false)
    const handleReady = useCallback(() => { baselineMark('scene-ready'); setReady(true) }, [])
    return <IntroContainer>
        <Suspense fallback={null}>{cloneElement(children, { ready: clicked && ready, onReady: handleReady })}</Suspense>
        <div className={`fullscreen ${clicked ? 'clicked' : ''}`} inert={clicked}>
            {!clicked && <section className="boarding-pass" aria-label="Your boarding pass">
                <div className="boarding-brand"><span aria-hidden="true">✈</span> MAHYAR INTERNATIONAL</div>
                <div className="ticket">
                    <div className="ticket-main">
                        <div className="ticket-kicker">BOARDING PASS / ONE WAY TO DISCOVERY</div>
                        <h1>Your next<br />destination.</h1>
                        <p className="ticket-intro">Welcome to my airport. I’m Mahyar, a software engineer exploring 3D, interactive experiences, AI-assisted development, and workflow automation. Grab your boarding pass and take a look around.</p>
                        <div className="ticket-fields"><div><small>YOUR HOST</small><strong>MAHYAR</strong></div><div><small>DESTINATION</small><strong>CREATIVE TECHNOLOGY</strong></div></div>
                        <div className="ticket-footer"><span>✈ EXPLORE AT YOUR OWN PACE</span><span>TERMINAL M</span></div>
                    </div>
                    <div className="ticket-stub">
                        <div><small>GATE</small><div className="ticket-gate">A1</div></div>
                        <div className="ticket-flight"><small>FLIGHT</small>MY 101</div>
                        <div className="ticket-barcode" aria-hidden="true" />
                        <button className="boarding-start" type="button" disabled={!ready} onClick={() => { baselineMark('start'); setClicked(true) }}>{ready ? 'Start exploring →' : 'Preparing your flight…'}</button>
                    </div>
                </div>
                <p className="boarding-note" role="status">{ready ? 'Ready to board · An interactive 3D experience with sound' : 'Loading the airport · Your flight will be ready shortly'}</p>
            </section>}
        </div>
    </IntroContainer>
}
