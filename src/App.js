import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Three from './components/ThreeComponent/Three.component';
import './App.css'
import * as THREE from 'three'
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette, ToneMapping,GodRays } from '@react-three/postprocessing'
import { Color } from 'three';
import InfoScreen from './components/info-screen/InfoScreen.component';

function App() {
  return (
    <Canvas
      id='three-canvas-container'
      shadows
      onCreated={(canvasCtx) => {
        canvasCtx.gl.physicallyCorrectLights = true
        canvasCtx.gl.toneMapping = THREE.NoToneMapping
        canvasCtx.gl.outputEncoding = THREE.sRGBEncoding
        canvasCtx.scene.background = new Color('#000000')
        console.log(canvasCtx);
      }}
      
    >
      <EffectComposer>
        <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={0.3} height={500} />

        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.5} height={500} />
        {/* <Noise opacity={0.03} /> */}
        <Vignette eskil={false} offset={0.1} darkness={0.6} />
        {/* <ToneMapping exposure={2} middleGrey={1} /> */}
        
      </EffectComposer>
      <Suspense fallback={null}>
        <Three />

      </Suspense>
    </Canvas>


    // <InfoScreen title={'MAHYAR AIRPORT PROJECTS'} />
  );
}

export default App;
