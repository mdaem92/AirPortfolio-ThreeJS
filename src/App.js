import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import Three from './components/ThreeComponent/Three.component';
import './App.css'
import * as THREE from 'three'
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette, ToneMapping } from '@react-three/postprocessing'
import { Color } from 'three';
import { Html } from '@react-three/drei';
import "antd/dist/antd.min.css";
import Spinner from './components/spinner/Spinner.component';



function App() {

  return (
    <Canvas
      id='three-canvas-container'
      shadows
      onCreated={(canvasCtx) => {
        canvasCtx.gl.physicallyCorrectLights = true
        canvasCtx.gl.toneMapping = THREE.NoToneMapping
        canvasCtx.scene.background = new Color('#00071a')
      }}

    >
      <Suspense fallback={<Html><Spinner /> </Html>}>
        <EffectComposer>
          <Vignette eskil={true} offset={0.1} darkness={0.6} />
        </EffectComposer>
        <Three />
      </Suspense>
    </Canvas>
  );

}

export default App;
