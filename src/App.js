import { Canvas } from '@react-three/fiber'
import Three from './components/ThreeComponent/Three.component';
import './App.css'
import { EffectComposer, Vignette } from '@react-three/postprocessing'
import { Color } from 'three';
import "antd/dist/antd.min.css";
import StaticItemsComponent from './components/static-items/StaticItems.component';




function App({ready}) {


  return (
    <Canvas
      id='three-canvas-container'
      // shadows
      
      onCreated={(canvasCtx) => {
        canvasCtx.gl.physicallyCorrectLights = true
        // canvasCtx.gl.toneMapping = THREE.NoToneMapping
        canvasCtx.scene.background = new Color('#00071a')
        
      }}

    >
        {/* <EffectComposer>
          <Vignette eskil={true} offset={0.1} darkness={0.6} />
        </EffectComposer> */}
        <Three ready={ready} />
    </Canvas>
  );

}

export default App;
