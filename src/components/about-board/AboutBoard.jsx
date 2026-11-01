import { Html } from '@react-three/drei'
import './about-board.css'

function TerminalMap() {
    return <svg viewBox="0 0 340 300" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="2"><path d="M145 280V170L32 82l22-28 116 82L286 54l22 28-113 88v110ZM161 280V157L45 68M179 280V157L299 68M145 230h50M145 255h50" />{[0, 1, 2, 3].map(i => <g key={i}><path d={`M${59 + i * 23} ${75 + i * 17}l-19 25M${281 - i * 23} ${75 + i * 17}l19 25M${68 + i * 23} ${63 + i * 17}l13-18M${272 - i * 23} ${63 + i * 17}l-13-18`} /></g>)}</g><path d="M170 275V154L286 72" stroke="#f7c45c" strokeWidth="3" strokeDasharray="5 5" /><circle cx="286" cy="72" r="9" fill="#f7c45c" /><text x="255" y="35" fill="#f7c45c" fontSize="15" fontFamily="Arial">GATE A1</text></svg>
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
