import { useEffect, useRef } from 'react'
import { Html } from '@react-three/drei'
import { animateDepartures } from './split-flap'
import './welcome-board.css'

const flights = [
    ['MY 101', 'ABOUT ME', 'A1', 'CHECK IN', 'aboutmeArea'],
    ['MY 202', 'PROJECTS', 'B2', 'NOW BOARDING', 'projectsArea'],
    ['MY 303', 'SKILLS', 'C3', 'READY TO GO', 'skillsArea'],
    ['MY 404', 'LINKEDIN', 'D4', 'CONNECT', 'linkedinArea'],
]

function Icon({ name }) {
    const paths = {
        plane: <path fill="currentColor" stroke="none" d="M21 12l-8-4V3c0-1-.4-2-1-2s-1 1-1 2v5l-8 4v2l8-2v6l-3 2v1l4-1 4 1v-1l-3-2v-6l8 2z" />,
        mouse: <><rect x="6" y="2" width="12" height="20" rx="6" /><path d="M12 2v8M6 10h12" /></>,
        focus: <><path d="M8 3H3v5m13-5h5v5M3 16v5h5m8 0h5v-5" /><circle cx="12" cy="12" r="3" /></>,
        sound: <path d="M11 3L5 8H2v8h3l6 5V3Zm5 5a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14" />,
    }
    return <svg className="symbol" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

export function DeparturesBoard({ active, focused, soundEnabled, onNavigate, onLookAround, onFocus, onToggleSound }) {
    const board = useRef(null)
    useEffect(() => {
        if (active) return animateDepartures(board.current)
    }, [active])

    return <section ref={board} className="welcome-departures" aria-label="Mahyar International departures" inert={!active} style={{ visibility: active ? 'visible' : 'hidden' }} onPointerDown={event => event.stopPropagation()} onClick={event => event.stopPropagation()}>
        <div className="topline"><div className="brand"><Icon name="plane" />MAHYAR INTERNATIONAL</div><div className="terminal">TERMINAL M / INFORMATION</div></div>
        <h1>DEPARTURES</h1>
        <p className="subline">Your next destination: a little about me, and the things I build.</p>
        <div className="columns" aria-hidden="true"><span>FLIGHT</span><span>DESTINATION</span><span>GATE</span><span>STATUS</span><span /></div>
        {flights.map(([code, destination, gate, status, area]) => <button key={code} type="button" className="flight" aria-label={destination === 'LINKEDIN' ? 'LinkedIn (opens in a new tab)' : destination} onClick={() => onNavigate(area)}>
            {[['code', code], ['destination', destination], ['gate', gate], ['status', status]].map(([field, text]) => <span key={field} className={field} aria-label={text}>
                <span className="flap-word" aria-hidden="true">{[...text].map((character, index) => <span key={index} className="flap" data-final={character} data-character={character}>
                    <span className="flap-half upper"><span className="flap-glyph">{character === ' ' ? '\u00a0' : character}</span></span>
                    <span className="flap-half lower"><span className="flap-glyph">{character === ' ' ? '\u00a0' : character}</span></span>
                </span>)}</span>
            </span>)}
            <span className="nav-arrow" aria-hidden="true">↗</span>
        </button>)}
        <div className="footer">
            <button type="button" onClick={onLookAround} aria-pressed={!focused}><Icon name="mouse" />DRAG TO LOOK AROUND</button>
            <button type="button" onClick={onFocus} aria-pressed={focused}><Icon name="focus" />FOCUS ON BOARD</button>
            <button type="button" onClick={onToggleSound} aria-pressed={soundEnabled}><Icon name="sound" />SOUND {soundEnabled ? 'ON' : 'OFF'}</button>
        </div>
    </section>
}

export default function WelcomeBoard(props) {
    if (!props.active) return null
    // The model's LCD is a 5.905 × 3.316 world-unit plane facing +X.
    // Html's transform maps 400 CSS pixels to distanceFactor world units.
    // Blend through a depth-tested LCD-sized opening in the canvas. A center
    // ray test would hide the entire DOM board when any object crosses it.
    return <Html transform position={[52.45, 4.43, 10.43]} rotation={[0, Math.PI / 2, 0]} scale={[1, 0.9644, 1]} distanceFactor={2.2845} occlude="blending" geometry={<planeGeometry args={[5.905, 3.316]} />} zIndexRange={[20, 0]} style={{ backfaceVisibility: 'hidden' }}>
        <DeparturesBoard {...props} />
    </Html>
}
