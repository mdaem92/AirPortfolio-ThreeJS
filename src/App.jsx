import { Canvas } from '@react-three/fiber'
import { lazy, Suspense, useEffect, useState } from 'react'
import { baselineEnabled } from './performance/baseline-markers'
import Three from './components/ThreeComponent/Three.component';
import './App.css'
import { ACESFilmicToneMapping, Color, PCFShadowMap, SRGBColorSpace } from 'three';
import useDesktopShadows from './components/airport-lighting/useDesktopShadows'
import LightingControls from './components/airport-lighting/LightingControls'
import { loadLightingSettings, saveLightingSettings } from './components/airport-lighting/lighting-settings'
import "antd/dist/reset.css";
const BaselineCapture = lazy(() => import('./performance/PerformanceBaseline'))
const BaselinePanel = lazy(() => import('./performance/PerformanceBaseline').then(module => ({ default: module.BaselinePanel })))





function App({ ready, onReady }) {
  const desktopShadows = useDesktopShadows()
  const [lighting, setLighting] = useState(loadLightingSettings)
  const [animationsPaused, setAnimationsPaused] = useState(false)
  const shadowsEnabled = lighting.shadows.enabled
  useEffect(() => { if (import.meta.env.DEV) saveLightingSettings(lighting) }, [lighting])

  return (
    <>
    <Canvas
      id='three-canvas-container'
      dpr={[1, desktopShadows ? 2 : 1.5]}
      shadows={desktopShadows && shadowsEnabled ? PCFShadowMap : false}
      gl={{ outputColorSpace: SRGBColorSpace, toneMapping: ACESFilmicToneMapping, toneMappingExposure: 1 }}
      onCreated={(canvasCtx) => {
        // r143 cleared with raw linear RGB; compensate only the sky for the
        // modern renderer's output conversion to preserve its original darkness.
        canvasCtx.scene.background = new Color('#031138').convertSRGBToLinear()
        
      }}
    >
      {baselineEnabled && <Suspense fallback={null}><BaselineCapture lighting={lighting} /></Suspense>}
      <Three ready={ready} onReady={onReady} desktopShadows={desktopShadows && shadowsEnabled} shadowsEnabled={shadowsEnabled} lighting={lighting} animationsPaused={animationsPaused} />
    </Canvas>
    {baselineEnabled && <Suspense fallback={null}><BaselinePanel /></Suspense>}
    {import.meta.env.DEV && ready && <LightingControls settings={lighting} onChange={setLighting} animationsPaused={animationsPaused} onToggleAnimations={() => setAnimationsPaused(paused => !paused)} />}
    </>
  );

}

export default App;
