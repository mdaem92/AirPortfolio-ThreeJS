import { Canvas } from '@react-three/fiber'
import Three from './components/ThreeComponent/Three.component';
import './App.css'
import { ACESFilmicToneMapping, Color, SRGBColorSpace } from 'three';
import "antd/dist/reset.css";




function App({ ready, onReady }) {


  return (
    <Canvas
      id='three-canvas-container'
      gl={{ outputColorSpace: SRGBColorSpace, toneMapping: ACESFilmicToneMapping, toneMappingExposure: 1 }}
      onCreated={(canvasCtx) => {
        // r143 cleared with raw linear RGB; compensate only the sky for the
        // modern renderer's output conversion to preserve its original darkness.
        canvasCtx.scene.background = new Color('#031138').convertSRGBToLinear()
        
      }}
    >
      <Three ready={ready} onReady={onReady} />
    </Canvas>
  );

}

export default App;
