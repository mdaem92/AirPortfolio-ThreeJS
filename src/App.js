import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Three from './components/ThreeComponent/Three.component';
import './App.css'
import * as THREE from 'three'
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette, ToneMapping,GodRays } from '@react-three/postprocessing'
import { Color } from 'three';


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
        {/* <DepthOfField focusDistance={0} focalLength={1} bokehScale={0.6} height={500} /> */}

        {/* <Bloom luminanceThreshold={0.4} luminanceSmoothing={0.5} height={500} /> */}
        <Noise opacity={0.04} />
        <Vignette eskil={true} offset={0.1} darkness={0.6} />
        
        {/* <ToneMapping exposure={2} middleGrey={1} /> */}
        
      </EffectComposer>
      <Suspense fallback={"loading"}>
        <Three />

      </Suspense>
    </Canvas>


  );
}

export default App;
