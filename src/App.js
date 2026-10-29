import { Canvas } from '@react-three/fiber'
import Three from './components/ThreeComponent/Three.component';
import './App.css'
import { Color } from 'three';
import "antd/dist/antd.min.css";




function App({ ready, onReady }) {


  return (
    <Canvas
      id='three-canvas-container'
      onCreated={(canvasCtx) => {
        canvasCtx.gl.physicallyCorrectLights = true
        canvasCtx.scene.background = new Color('#031138')
        
      }}
    >
      <Three ready={ready} onReady={onReady} />
    </Canvas>
  );

}

export default App;
