import { useState } from 'react'
import { lightingDefaults, updateLightingSetting } from './lighting-settings'
import './lighting-controls.css'

function Slider({ label, value, onChange, min = 0, max = 2, step = 0.01, unit = '' }) {
    const digits = step >= 1 ? 0 : step >= 0.1 ? 1 : step >= 0.01 ? 2 : 3
    const change = event => {
        const number = Number(event.target.value)
        if (Number.isFinite(number)) onChange(Math.min(max, Math.max(min, number)))
    }
    return <div className="lighting-slider">
        <label><span>{label}</span><input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={change} /></label>
        <input aria-label={`${label} value`} type="number" min={min} max={max} step={step} value={Number(value.toFixed(digits))} onChange={change} />{unit && <span>{unit}</span>}
    </div>
}

export default function LightingControls({ settings, onChange, animationsPaused, onToggleAnimations }) {
    const [open, setOpen] = useState(true)
    const [status, setStatus] = useState('')
    const set = (path, value) => onChange(current => updateLightingSetting(current, path, value))
    const slider = (label, path, min = 0, max = 2, step = 0.01, unit) => <Slider key={path.join('.')} label={label} value={path.reduce((value, key) => value?.[key], settings) ?? path.reduce((value, key) => value[key], lightingDefaults)} onChange={value => set(path, value)} min={min} max={max} step={step} unit={unit} />
    const toggle = (label, path) => <label className="lighting-toggle"><input type="checkbox" checked={path.reduce((value, key) => value[key], settings)} onChange={event => set(path, event.target.checked)} />{label}</label>
    const color = (label, path) => <label className="lighting-color">{label}<input aria-label={label} type="color" value={path.reduce((value, key) => value[key], settings)} onChange={event => set(path, event.target.value)} /></label>
    const vector = (label, path, min = -100, max = 100) => <fieldset className="lighting-vector"><legend>{label}</legend>{path.reduce((value, key) => value[key], settings).map((_, index) => slider(`${label} ${['X', 'Y', 'Z'][index]}`, [...path, index], min, max, 0.1))}</fieldset>
    const beam = (prefix, path) => <>
        {slider(`${prefix} range`, [...path, 'distance'], 1, 50, 0.5)}
        <Slider label={`${prefix} beam angle`} value={path.reduce((value, key) => value[key], settings).angle * 180 / Math.PI} min={5} max={85} step={1} unit="°" onChange={value => set([...path, 'angle'], value * Math.PI / 180)} />
        {slider(`${prefix} softness`, [...path, 'penumbra'], 0, 1)}
        {slider(`${prefix} falloff`, [...path, 'decay'], 0, 3, 0.1)}
    </>

    const download = () => {
        const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'airportfolio-lighting.json'
        link.click()
        setTimeout(() => URL.revokeObjectURL(url), 1000)
    }

    return <aside className="lighting-controls" aria-label="Lighting controls">
        <button className="lighting-controls-heading" aria-expanded={open} aria-controls="lighting-controls-body" onClick={() => setOpen(value => !value)}>Lighting controls <span aria-hidden="true">{open ? '−' : '+'}</span></button>
        <button className="lighting-pause" aria-pressed={animationsPaused} onClick={onToggleAnimations}>{animationsPaused ? 'Resume animations' : 'Pause animations'}</button>
        <div id="lighting-controls-body" className="lighting-controls-body" hidden={!open}>
            <p>Saved in this browser. Wait a moment after toggling lights before comparing motion.</p>
            {animationsPaused && <p>Movement paused. Camera controls and police flashes remain active.</p>}
            <div className="lighting-actions"><button onClick={() => { onChange(lightingDefaults); setStatus('Original lighting restored.') }}>Reset all</button><button onClick={download}>Download settings</button></div>
            <span role="status">{status}</span>
            <details open><summary>Ambient &amp; reflections</summary>
                {toggle('Hemisphere light', ['hemisphere', 'enabled'])}
                {slider('Hemisphere intensity', ['hemisphere', 'intensity'], 0, 2)}
                {color('Sky color', ['hemisphere', 'sky'])}{color('Ground color', ['hemisphere', 'ground'])}
                {toggle('Reflection environment', ['environment', 'enabled'])}
                {slider('Reflection strength', ['environment', 'intensity'], 0, 2)}
                {slider('Overall exposure', ['exposure'], 0.1, 3)}
                <label className="lighting-color">Reflection resolution<select aria-label="Reflection resolution" value={settings.environment.resolution} onChange={event => set(['environment', 'resolution'], Number(event.target.value))}>{[64, 128, 256].map(size => <option key={size}>{size}</option>)}</select></label>
                {settings.environment.panels.map((panel, index) => <details key={panel.name}><summary>{panel.name}</summary>
                    {toggle(`${panel.name} enabled`, ['environment', 'panels', index, 'enabled'])}
                    {slider(`${panel.name} intensity`, ['environment', 'panels', index, 'intensity'], 0, 5)}
                    {color(`${panel.name} color`, ['environment', 'panels', index, 'color'])}
                    {vector(`${panel.name} position`, ['environment', 'panels', index, 'position'])}
                    <details><summary>Panel size &amp; angle</summary>{vector(`${panel.name} size`, ['environment', 'panels', index, 'scale'], 0.1, 60)}
                        {panel.rotation.map((value, axis) => <Slider key={axis} label={`${panel.name} rotation ${['X', 'Y', 'Z'][axis]}`} value={value * 180 / Math.PI} min={-180} max={180} step={1} unit="°" onChange={angle => set(['environment', 'panels', index, 'rotation', axis], angle * Math.PI / 180)} />)}
                    </details>
                </details>)}
            </details>
            <details><summary>Directional lights</summary>
                {settings.directionals.map((light, index) => {
                    const label = ['Moon / key', 'Terminal fill', 'Runway rim'][index]
                    const path = ['directionals', index]
                    return <details key={light.name} open><summary>{label}</summary>
                        {toggle(`${label} enabled`, [...path, 'enabled'])}{slider(`${label} intensity`, [...path, 'intensity'], 0, 3)}{color(`${label} color`, [...path, 'color'])}
                        <details><summary>Position &amp; aim</summary>{vector(`${label} position`, [...path, 'position'])}{vector(`${label} target`, [...path, 'target'])}</details>
                    </details>
                })}
            </details>
            <details><summary>Street lights</summary>
                {toggle('Street lights enabled', ['road', 'enabled'])}{slider('Street intensity', ['road', 'intensity'], 0, 1000, 5)}{color('Street color', ['road', 'color'])}{beam('Street', ['road'])}
                {settings.lamps.map((lamp, index) => <details key={lamp.name}><summary>Street lamp {index + 1}</summary>
                    {toggle(`Street lamp ${index + 1} enabled`, ['lamps', index, 'enabled'])}{slider(`Street lamp ${index + 1} brightness`, ['lamps', index, 'brightness'], 0, 3)}
                    {vector(`Street lamp ${index + 1} position`, ['lamps', index, 'position'])}{vector(`Street lamp ${index + 1} target`, ['lamps', index, 'target'])}
                </details>)}
            </details>
            <details><summary>Runway ground lights</summary>
                <p>White lights chase toward the green end. Red and green rows stay steady.</p>
                {toggle('White light sequence', ['runwayGround', 'enabled'])}
                {slider('Ground light cycle', ['runwayGround', 'period'], 0.4, 4, 0.05, 's')}
                {slider('Ground flash brightness', ['runwayGround', 'brightness'], 0, 10, 0.1)}
                {slider('Red / green lamp brightness', ['runwayGround', 'steadyBrightness'], 0, 3, 0.05)}
                {slider('Red / green glow', ['runwayGround', 'steadyGlow'], 0, 1)}
            </details>
            <details><summary>Vehicle headlights</summary>
                <p>Every vehicle gets a real beam at 17. Lower counts prioritize nearby vehicles for speed.</p>
                {slider('Real headlight count', ['vehicles', 'headlights', 'maxLights'], 2, 17, 1)}
                {toggle('Headlights enabled', ['vehicles', 'headlights', 'enabled'])}{slider('Headlight intensity', ['vehicles', 'headlights', 'intensity'], 0, 500, 5)}{color('Headlight color', ['vehicles', 'headlights', 'color'])}{beam('Headlight', ['vehicles', 'headlights'])}
                {slider('Headlight glow', ['vehicles', 'headlights', 'glow'], 0, 1)}{slider('Road light pools', ['vehicles', 'headlights', 'poolOpacity'], 0, 1)}
            </details>
            <details><summary>Emergency &amp; runway beacons</summary>
                <p>Every beacon gets real spill at 17. Lower counts prioritize nearby vehicles for speed.</p>
                {slider('Real beacon light count', ['vehicles', 'police', 'maxLights'], 2, 17, 1)}
                {toggle('Beacon lights enabled', ['vehicles', 'police', 'enabled'])}{slider('Beacon spill intensity', ['vehicles', 'police', 'intensity'], 0, 300, 5)}{slider('Beacon spill range', ['vehicles', 'police', 'distance'], 1, 30, 0.5)}
                {slider('Beacon falloff', ['vehicles', 'police', 'decay'], 0, 3, 0.1)}{slider('Beacon flash cycle', ['vehicles', 'police', 'period'], 0.4, 4, 0.05, 's')}
                {slider('Beacon halos', ['vehicles', 'police', 'halo'], 0, 1)}{slider('Beacon brightness', ['vehicles', 'police', 'emissive'], 0, 10, 0.1)}
                {color('Red beacon', ['vehicles', 'police', 'red'])}{color('Blue beacon', ['vehicles', 'police', 'blue'])}{color('Amber beacon', ['vehicles', 'police', 'amber'])}
            </details>
            <details><summary>Shadows</summary>
                {toggle('Shadows enabled', ['shadows', 'enabled'])}
                <p>Directional shadows require a desktop pointer; contact shadows work at all sizes.</p>
                {slider('Directional shadow strength', ['shadows', 'intensity'], 0, 1)}{slider('Contact shadow opacity', ['shadows', 'contactOpacity'], 0, 0.6)}{slider('Shadow softness', ['shadows', 'radius'], 0, 6, 0.1)}
                <details><summary>Shadow tuning</summary>{slider('Shadow normal bias', ['shadows', 'normalBias'], 0, 1)}{slider('Shadow bias', ['shadows', 'bias'], -0.01, 0.01, 0.001)}
                    <label className="lighting-color">Shadow map size<select value={settings.shadows.mapSize} onChange={event => set(['shadows', 'mapSize'], Number(event.target.value))}>{[512, 1024, 2048].map(size => <option key={size}>{size}</option>)}</select></label>
                </details>
            </details>
        </div>
    </aside>
}
