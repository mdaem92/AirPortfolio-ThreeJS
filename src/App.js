import { Canvas } from '@react-three/fiber'
import Three from './components/ThreeComponent/Three.component';
import './App.css'
import { Color } from 'three';
import "antd/dist/antd.min.css";
import StaticItemsComponent from './components/static-items/StaticItems.component';
import { OrbitControls, PerspectiveCamera, Stars, Stats } from '@react-three/drei';
import { useRef } from 'react';
import { AirportScene } from './components/airport-scene/AirportScene.component';




function App({ ready }) {
  const angleToRadians = (ang) => (Math.PI / 180) * ang
  const orbitControlRef = useRef(null)

  return (
    <Canvas
      id='three-canvas-container'
      // shadows

      onCreated={(canvasCtx) => {
        canvasCtx.gl.physicallyCorrectLights = true
        // canvasCtx.gl.toneMapping = THREE.NoToneMapping
        canvasCtx.scene.background = new Color('#031138')

      }}

    >
      {/* <EffectComposer>
          <Vignette eskil={true} offset={0.1} darkness={0.6} />
        </EffectComposer> */}
      <Stats />

      <Three ready={ready} />

      {/* 

      <PerspectiveCamera makeDefault position={[80, 8.26, 9.51]} />
      <OrbitControls
        ref={orbitControlRef}
        minPolarAngle={angleToRadians(45)}
        maxPolarAngle={angleToRadians(85)}
        minDistance={60}
        maxDistance={90}
        rotateSpeed={0.35}
        enablePan={false}
      />
      <ambientLight args={['#D5DAEB', 0.5]} />
      <Stars radius={100} depth={200} count={3000} factor={4} saturation={0} fade speed={2} />
      <AirportScene orbitControlRef={orbitControlRef} ready={ready} /> */}


    </Canvas>
  );

}

export default App;
