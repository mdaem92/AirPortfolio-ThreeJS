import { Html } from '@react-three/drei'
import './about-board.css'
import informationScreenConcept from '../../../output/design-concepts/about-me/01-information-screen.png'

function TerminalMap() {
    // Display the original concept's blueprint pixels, excluding its profile text.
    return <svg viewBox="1068 142 545 574" fill="none" aria-hidden="true" focusable="false">
        <defs><clipPath id="about-terminal-blueprint-clip"><path d="M1068 142H1613V716H1120V350H1068Z" /></clipPath></defs>
        <image href={informationScreenConcept} width="1672" height="941" clipPath="url(#about-terminal-blueprint-clip)" />
    </svg>
}

export function AboutInformation({ onBack, onFocus }) {
    return <section className="about-information" aria-label="About Mahyar" onPointerDown={event => event.stopPropagation()} onPointerUp={event => event.stopPropagation()} onClick={event => { event.stopPropagation(); onFocus?.() }}>
        <header><span aria-hidden="true">✈</span><span>MAHYAR INTERNATIONAL<small>TERMINAL M / INFORMATION</small></span><span className="about-gate">A1</span></header>
        <main tabIndex={0} aria-label="About Me introduction"><div className="about-eyebrow">YOUR NEXT CONNECTION</div><h1>Meet Mahyar</h1><p className="about-subtitle">Software engineer.<br />Curious about the third dimension.</p>
            <div className="about-scroll-hint">SCROLL TO READ ↓</div><div className="about-copy">
                <p>Hi, I’m Mahyar, a software engineer with a strong interest in 3D and interactive experiences. I enjoy combining thoughtful engineering with visual creativity to build software that feels engaging and intuitive.</p>
                <p>I’m also interested in AI-assisted development and workflow automation, exploring how these tools can support creative work and solve everyday problems.</p>
                <p>This airport is my way of exploring that intersection—a space where you can discover my projects, skills, and ideas as you look around.</p>
            </div><div className="about-map"><TerminalMap /></div>
        </main>
        <div className="about-tags"><span>〈/〉 ENGINEERING</span><span>◇ 3D &amp; WEB</span><span>↗ AI &amp; AUTOMATION</span></div>
        <footer><button type="button" onClick={event => { event.stopPropagation(); onBack() }}><span aria-hidden="true">←</span> BACK TO DEPARTURES</button><span>GATE A1</span></footer>
    </section>
}

export default function AboutBoard({ active, ...props }) {
    if (!active) return null
    // Existing LCD: 2.845 × 3.015, facing +X. Match its aspect exactly.
    return <Html transform wrapperClass="about-screen-surface" position={[29.435, 3.94, 20.57]} rotation={[0, Math.PI / 2, 0]} distanceFactor={1.49745} occlude="blending" geometry={<planeGeometry args={[2.845, 3.015]} />} zIndexRange={[20, 0]} style={{ backfaceVisibility: 'hidden' }}><AboutInformation {...props} /></Html>
}
