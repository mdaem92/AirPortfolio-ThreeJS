import { Canvas } from '@react-three/fiber'
import Three from './components/ThreeComponent/Three.component';
import './App.css'
import { Color } from 'three';
import "antd/dist/antd.min.css";
import { Stats } from '@react-three/drei';




function App({ ready }) {


  return (
    <Canvas
      id='three-canvas-container'
      onCreated={(canvasCtx) => {
        canvasCtx.gl.physicallyCorrectLights = true
        // canvasCtx.gl.toneMapping = THREE.NoToneMapping
        canvasCtx.scene.background = new Color('#031138')
      }}
    >
      <Three ready={ready} />
    </Canvas>
  );

}

export default App;
