import React, { useRef, useEffect, useState } from 'react'
import { useGLTF, useAnimations, useVideoTexture, PositionalAudio } from '@react-three/drei'

import { useFrame, useThree } from '@react-three/fiber';

import { Vector3 } from 'three';
import { useKeyState } from 'use-key-state'
import Skills from '../overlay/skills/Skills.component';
import AudioToggleButton from '../audio-toggle-button/AudioToggleButton.component';
import Projects from '../overlay/projects/Projects.component';
import { HtmlContainer } from '../audio-toggle-button/AudioToggleButton.styles';
import ButtonSoundEffect from '../button-sound-effect/ButtonSoundEffect.component';
import useTabInUse from '../../hooks/useTabInUse';
import useWindowWidth from '../../hooks/useWindowWidth';
import Credits from '../credits/Credits.component';
import StaticItems from '../static-items/StaticItems.component';


export const AirportScene = (props) => {

  const group = useRef()
  const { scene } = useThree()

  const lightRef1 = useRef(null)
  const lightRef2 = useRef(null)
  const lightRef3 = useRef(null)
  const lightRef4 = useRef(null)
  const lightRef5 = useRef(null)

  const targetRef1 = useRef(null)
  const targetRef2 = useRef(null)
  const targetRef3 = useRef(null)
  const targetRef4 = useRef(null)
  const targetRef5 = useRef(null)

  const aboutMeScreenRef = useRef(null)
  const projectsScreenRef = useRef(null)
  const skillsScreenRef = useRef(null)

  const planeGreenLightRef = useRef(null)
  const planeRedLightRef = useRef(null)

  const planeGreenLightTarget = useRef(null)
  const planeRedLightTarget = useRef(null)

  const rearLightRef1 = useRef(null)
  const rearLightRef2 = useRef(null)
  const rearLightRef3 = useRef(null)

  const rearLightTarget1 = useRef(null)
  const rearLightTarget2 = useRef(null)
  const rearLightTarget3 = useRef(null)
  const billboardLCDRef = useRef(null)
  const creditsAreaRef = useRef(null)

  const jetEngineSoundRef = useRef(null)

  const { nodes, materials, animations } = useGLTF('./models/cars/scene-transformed.glb')
  const { actions } = useAnimations(animations, group)
  const { esc } = useKeyState({ esc: "esc" })
  const animationsList = ['threeJsAnimate', 'pythonAnimate', 'cssAnimate', 'cppAnimate', 'javascriptAnimate', 'htmlAnimate', 'nodeJSAnimate', 'reactAnimate', 'gatsbyAnimate', 'SuzanneAction']
  const [skillsAnimPlaying, setSkillsAnimPlaying] = useState(false)
  const infoLCD2Video = useVideoTexture("/videos/videoplayback.mp4")


  // play main animations 
  useEffect(() => {
    Object.keys(actions).forEach((key) => {
      if (!animationsList.includes(key)) {
        actions[key].play()
      }
    })
  }, [])

  // play skills animations
  useEffect(() => {
    if (skillsAnimPlaying) {
      animationsList.forEach(key => {
        actions[key].play()

      })
    } else {
      animationsList.forEach(key => {
        actions[key].stop()

      })
    }
  }, [skillsAnimPlaying])


  // const angleToRadians = (ang) => (Math.PI / 180) * ang

  // set the light references
  useEffect(() => {
    scene.add(lightRef1.current.target)
    scene.add(lightRef2.current.target)
    scene.add(lightRef3.current.target)
    scene.add(lightRef4.current.target)
    scene.add(lightRef5.current.target)
    scene.add(planeGreenLightRef.current.target)
    scene.add(planeRedLightRef.current.target)
    scene.add(rearLightRef1.current.target)
    scene.add(rearLightRef2.current.target)
    scene.add(rearLightRef3.current.target)

    scene.add(targetRef1.current)
    scene.add(targetRef2.current)
    scene.add(targetRef3.current)
    scene.add(targetRef4.current)
    scene.add(targetRef5.current)
    scene.add(planeGreenLightTarget.current)
    scene.add(planeRedLightTarget.current)
    scene.add(rearLightTarget1.current)
    scene.add(rearLightTarget2.current)
    scene.add(rearLightTarget3.current)


    lightRef1.current.target = targetRef1.current
    lightRef2.current.target = targetRef2.current
    lightRef3.current.target = targetRef3.current
    lightRef4.current.target = targetRef4.current
    lightRef5.current.target = targetRef5.current
    planeGreenLightRef.current.target = planeGreenLightTarget.current
    planeRedLightRef.current.target = planeRedLightTarget.current
    rearLightRef1.current.target = rearLightTarget1.current
    rearLightRef2.current.target = rearLightTarget2.current
    rearLightRef3.current.target = rearLightTarget3.current
  }, [scene])



  const [aboutMeclicked, setAboutMeClicked] = useState(false)
  const [projectsClicked, setProjectsClicked] = useState(false)
  const [skillsClicked, setSkillsClicked] = useState(false)
  // must be set to true initially
  const [mainScreenFocus, setMainScreenFocus] = useState(true)
  const [exitFocusClicked, setExitFocusClicked] = useState(false)
  const [bingPlaying, setBingPlaying] = useState(false)
  const [creditsClicked, setCreditsClicked] = useState(false)
  const aboutMeScreenVector = new Vector3(36, 3.97, 21)
  const skillsScreenVector = new Vector3(-25.69, 3.78, -4.08)
  const projectsScreenVector = new Vector3(-27.58, 4.88, 25.66)
  const creditsScreenVector = new Vector3(40, 4, -8)
  const mainScreenVector = new Vector3(64.6, 7.12, 10.46)





  // returns the current screen width
  const width = useWindowWidth()

  // when about me is clicked
  useFrame(({ camera }) => {
    if (aboutMeclicked) {
      camera.lookAt(aboutMeScreenRef.current.position)
      if (width < 600) {
        // camera.position.lerp(new Vector3(36, 3.97, 21), 0.05)
        camera.position.lerp(aboutMeScreenVector, 0.05)


      } else {
        camera.position.lerp(new Vector3(32.7, 3.97, 20.6), 0.05)

      }
      // on mobile
      props.orbitControlRef.current.minDistance = 20
    }
    else {
      if (props.orbitControlRef.current.minDistance < 60) {
        return props.orbitControlRef.current.minDistance = 60

      }

    }
  })

  // when skills is clicked
  useFrame(({ camera }) => {
    if (skillsClicked) {

      camera.lookAt(skillsScreenRef.current.position)
      // const skillsArea = new Vector3(-25.69, 3.78, -4.08)
      camera.position.lerp(skillsScreenVector, 0.08)
      setSkillsAnimPlaying(true)

    }
  })

  // when credits is clicked
  useFrame(({ camera }) => {
    if (creditsClicked) {
      camera.lookAt(creditsAreaRef.current.position)
      // camera.position.lerp(new Vector3(40, 4, -8), 0.08)
      camera.position.lerp(creditsScreenVector, 0.08)


    }
  })

  // when projects is clicked
  useFrame(({ camera }) => {
    if (projectsScreenRef.current) {
      if (projectsClicked) {
        camera.lookAt(projectsScreenRef.current.position)
        // const projectArea = new Vector3(-27.58, 4.88, 25.66)
        camera.position.lerp(projectsScreenVector, 0.05)
      }
    }

  })


  const exitFocus = () => {
    console.log('exit focus');

    setSkillsAnimPlaying(false)
    setProjectsClicked(false)
    setSkillsClicked(false)
    setAboutMeClicked(false)
    setMainScreenFocus(true)
    setCreditsClicked(false)

  }

  // when esc is clicked
  useEffect(() => {

    if (esc.down || exitFocusClicked) {
      if (!mainScreenFocus) {
        exitFocus()

      } else {
        setMainScreenFocus(false)

      }
      return setExitFocusClicked(false)
    }
  }, [esc, exitFocusClicked, mainScreenFocus])

  // when main screen is in focus 
  useFrame(({ camera }) => {
    if (mainScreenFocus) {
      camera.lookAt(billboardLCDRef.current.position)
      // camera.position.lerp(new Vector3(64.6, 7.12, 10.46), 0.05)
      camera.position.lerp(mainScreenVector, 0.05)

    }
  })

  // returns true if the current browser tab loses focus
  const tabInUse = useTabInUse()

  // handles all click events
  const handleClickArea = ({ eventObject: { name } }) => {
    setBingPlaying(true)

    if (name === 'aboutmeArea' || name === 'infoLCD1') {
      setMainScreenFocus(false)
      setCreditsClicked(false)
      setProjectsClicked(false)
      setSkillsClicked(false)
      return setAboutMeClicked(true)
    }
    if (name === 'projectsArea') {
      setCreditsClicked(false)
      setMainScreenFocus(false)
      setSkillsClicked(false)
      setAboutMeClicked(false)
      return setProjectsClicked(true)
    }
    if (name === 'skillsArea') {
      console.log('skills area');
      setMainScreenFocus(false)
      setProjectsClicked(false)
      setAboutMeClicked(false)
      setCreditsClicked(false)
      return setSkillsClicked(true)
    }
    if (name === 'linkedinArea') {
      setMainScreenFocus(false)
      setProjectsClicked(false)
      setAboutMeClicked(false)
      setCreditsClicked(false)
      return window.open('https://www.linkedin.com/in/mahyardaem', '_blank');
    }
    if (name === 'creditsArea') {
      setMainScreenFocus(false)
      return setCreditsClicked(true)
    }
    if (name === 'returnArea' || name === 'returnArea2') {

      return setExitFocusClicked(true)
    }

  }

  return (
    <group ref={group} {...props} dispose={null}>
      <ButtonSoundEffect playing={props.ready && bingPlaying} />
      <group name="Scene">
        {/* <AudioToggleButton toggleAudio={toggleAudio} audioPlaying={audioPlaying} /> */}
        <group name="backLight" position={[-75.87, 20.41, -34.92]} rotation={[0.29, -0.22, 1.45]}>
          <directionalLight name="backLight_Orientation" intensity={3} color="#38464f" rotation={[-Math.PI / 2, 0, 0]}>
            <group position={[0, 0, -1]} />
          </directionalLight>
        </group>
        <group name="fillLight" position={[-63.23, 21.55, 7.1]} rotation={[0.53, -0.99, 1.84]}>
          <directionalLight name="fillLight_Orientation" intensity={3} color="#38464f" rotation={[-Math.PI / 2, 0, 0]}>
            <group position={[0, 0, -1]} />
          </directionalLight>
        </group>
        <group name="keyLight" position={[51.84, 35.17, 67.67]} rotation={[1.3, 0.18, -0.58]}>
          <directionalLight name="keyLight_Orientation" intensity={6} color="#38464f" rotation={[-Math.PI / 2, 0, 0]}>
            <group position={[0, 0, -1]} />
          </directionalLight>
        </group>
        <group name="rearLight1" position={[-32.59, 7.01, -17.31]} rotation={[Math.PI / 2, 0, 0]} scale={0.55}>
          <spotLight name="rearLight1_Orientation" intensity={200} angle={0.42} penumbra={0.19} decay={2} rotation={[-Math.PI / 2, 0, 0]} ref={rearLightRef1}>
            <group position={[0, 0, -1]} />
          </spotLight>
        </group>
        <group name="spotlight5" position={[59.6, 5.61, 44.36]} rotation={[0, 0, -0.07]} scale={0.92}>
          <spotLight name="spotlight5_Orientation" intensity={500} angle={0.51} penumbra={0.23} decay={2} color="#ffebbf" rotation={[-Math.PI / 2, 0, 0]} ref={lightRef5}>
            <group position={[0, 0, -1]} />
          </spotLight>
        </group>
        <group name="spotlight4" position={[59.6, 5.61, 26.09]} rotation={[0, 0, -0.07]}>
          <spotLight name="spotlight4_Orientation" intensity={500} angle={0.51} penumbra={0.23} decay={2} color="#ffebbf" rotation={[-Math.PI / 2, 0, 0]} ref={lightRef4}>
            <group position={[0, 0, -1]} />
          </spotLight>
        </group>
        <group name="spotlight3" position={[59.6, 5.61, 4.51]} rotation={[0, 0, -0.07]}>
          <spotLight name="spotlight3_Orientation" intensity={500} angle={0.51} penumbra={0.23} decay={2} color="#ffebbf" rotation={[-Math.PI / 2, 0, 0]} ref={lightRef3}>
            <group position={[0, 0, -1]} />
          </spotLight>
        </group>
        <group name="spotlight2" position={[59.6, 5.61, -14.85]} rotation={[0, 0, -0.07]}>
          <spotLight name="spotlight2_Orientation" intensity={500} angle={0.51} penumbra={0.23} decay={2} color="#ffebbf" rotation={[-Math.PI / 2, 0, 0]} ref={lightRef2}>
            <group position={[0, 0, -1]} />
          </spotLight>
        </group>
        <group name="spotlight1" position={[59.6, 5.61, -33.89]} rotation={[0, 0, -0.07]}>
          <spotLight name="spotlight1_Orientation" intensity={500} angle={0.51} penumbra={0.23} decay={2} color="#ffebbf" rotation={[-Math.PI / 2, 0, 0]} ref={lightRef1}>
            <group position={[0, 0, -1]} />
          </spotLight>
        </group>
        <group name="rearLight3" position={[-12.08, 5.95, 4.48]} rotation={[Math.PI / 2, 0, 0]} scale={0.32}>
          <spotLight name="rearLight3_Orientation" intensity={200} angle={0.42} penumbra={0.19} decay={2} rotation={[-Math.PI / 2, 0, 0]} ref={rearLightRef3}>
            <group position={[0, 0, -1]} />
          </spotLight>
        </group>
        <group name="planeGreenLight" position={[-52.9, 5.95, 5.53]} rotation={[-Math.PI / 2, 0, 0]} scale={0.49}>
          <spotLight name="planeGreenLight_Orientation" intensity={100} angle={0.22} penumbra={0.26} decay={2} color="#ff0708" rotation={[-Math.PI / 2, 0, 0]} ref={planeGreenLightRef}>
            <group position={[0, 0, -1]} />
          </spotLight>
        </group>
        <group name="rearLight2" position={[-53.04, 5.95, 4.48]} rotation={[Math.PI / 2, 0, 0]} scale={0.32}>
          <spotLight name="rearLight2_Orientation" intensity={200} angle={0.42} penumbra={0.19} decay={2} rotation={[-Math.PI / 2, 0, 0]} ref={rearLightRef2}>
            <group position={[0, 0, -1]} />
          </spotLight>
        </group>
        <group name="planeRedLight" position={[-12.26, 5.95, 5.53]} rotation={[-Math.PI / 2, 0, 0]} scale={0.49}>
          <spotLight name="planeRedLight_Orientation" intensity={100} angle={0.22} penumbra={0.26} decay={2} color="#025500" rotation={[-Math.PI / 2, 0, 0]} ref={planeRedLightRef}>
            <group position={[0, 0, -1]} />
          </spotLight>
        </group>



        <mesh name="lightPost1" castShadow receiveShadow geometry={nodes.lightPost1.geometry} material={materials['black.006']} position={[59.47, 1.15, 48.16]} rotation={[Math.PI, -1.53, Math.PI]} scale={0.15} />
        <mesh name="lightPost2" castShadow receiveShadow geometry={nodes.lightPost2.geometry} material={materials['black.006']} position={[59.47, 1.15, 29.87]} rotation={[Math.PI, -1.53, Math.PI]} scale={0.15} />
        <mesh name="lightPost3" castShadow receiveShadow geometry={nodes.lightPost3.geometry} material={materials['black.006']} position={[60.23, 4.65, 4.56]} rotation={[Math.PI, -1.53, Math.PI]} scale={0.15} />
        <mesh name="lightPost4" castShadow receiveShadow geometry={nodes.lightPost4.geometry} material={materials['black.006']} position={[60.23, 4.65, -14.83]} rotation={[Math.PI, -1.53, Math.PI]} scale={0.15} />
        <mesh name="lightPost5" castShadow receiveShadow geometry={nodes.lightPost5.geometry} material={materials['black.006']} position={[60.23, 4.65, -33.8]} rotation={[Math.PI, -1.53, Math.PI]} scale={0.15} />


        <mesh name="linkedinArea" castShadow receiveShadow geometry={nodes.linkedinArea.geometry} material={nodes.linkedinArea.material} position={[52.35, 4.26, 8.5]} scale={[0.1, 0.6, 0.4]} visible={false} onClick={handleClickArea} />
        <mesh name="aboutmeArea" castShadow receiveShadow geometry={nodes.aboutmeArea.geometry} material={nodes.aboutmeArea.material} position={[52.35, 4.26, 12.32]} scale={[0.09, 0.54, 0.36]} visible={false} onClick={handleClickArea} />
        <mesh name="projectsArea" castShadow receiveShadow geometry={nodes.projectsArea.geometry} material={nodes.projectsArea.material} position={[52.35, 4.26, 10.97]} scale={[0.1, 0.59, 0.4]} visible={false} onClick={handleClickArea} />

        <mesh name="skillsArea" castShadow receiveShadow geometry={nodes.skillsArea.geometry} material={nodes.skillsArea.material} position={[52.35, 4.26, 9.71]} scale={[0.1, 0.6, 0.4]} visible={false} onClick={handleClickArea} />
        <mesh name="returnArea" castShadow receiveShadow geometry={nodes.returnArea.geometry} material={nodes.returnArea.material} position={[52.4, 3.05, 10.4]} onClick={handleClickArea} visible={false} />
        <mesh name="returnArea2" castShadow receiveShadow geometry={nodes.returnArea2.geometry} material={nodes.returnArea2.material} position={[29.4, 3.05, 19.54]} scale={[0.05, 0.12, 0.11]} onClick={handleClickArea} visible={false} />


        <mesh name="spotlightTarget3" castShadow receiveShadow geometry={nodes.spotlightTarget3.geometry} material={nodes.spotlightTarget3.material} position={[56.81, 1.05, 4.66]} scale={0.84} ref={targetRef3} visible={false} />
        <mesh name="spotlightTarget2" castShadow receiveShadow geometry={nodes.spotlightTarget2.geometry} material={nodes.spotlightTarget2.material} position={[56.81, 1.05, -14.44]} scale={0.84} ref={targetRef2} visible={false} />
        <mesh name="spotLightTarget1" castShadow receiveShadow geometry={nodes.spotLightTarget1.geometry} material={nodes.spotLightTarget1.material} position={[56.81, 1.05, -33.64]} scale={0.84} ref={targetRef1} visible={false} />
        <mesh name="spotlightTarget4" castShadow receiveShadow geometry={nodes.spotlightTarget4.geometry} material={nodes.spotlightTarget4.material} position={[56.81, 1.05, 26.35]} scale={0.84} ref={targetRef4} visible={false} />
        <mesh name="spotlightTarget5" castShadow receiveShadow geometry={nodes.spotlightTarget5.geometry} material={nodes.spotlightTarget5.material} position={[56.81, 1.05, 44.3]} scale={0.84} ref={targetRef5} visible={false} />
        <mesh name="planeGreenLightTarget" castShadow receiveShadow geometry={nodes.planeGreenLightTarget.geometry} material={nodes.planeGreenLightTarget.material} position={[-52.9, 5.95, 6.7]} scale={0.34} ref={planeGreenLightTarget} visible={false} />
        <mesh name="planeRedLightTarget" castShadow receiveShadow geometry={nodes.planeRedLightTarget.geometry} material={nodes.planeRedLightTarget.material} position={[-12.26, 5.95, 7.05]} scale={0.34} ref={planeRedLightTarget} visible={false} />
        <mesh name="rearLightTarget1" castShadow receiveShadow geometry={nodes.rearLightTarget1.geometry} material={nodes.rearLightTarget1.material} position={[-32.59, 7.01, -18.44]} scale={0.23} ref={rearLightTarget1} visible={false} />
        <mesh name="rearLightTarget3" castShadow receiveShadow geometry={nodes.rearLightTarget3.geometry} material={nodes.rearLightTarget3.material} position={[-12.08, 5.92, 3.86]} scale={0.23} ref={rearLightTarget3} visible={false} />
        <mesh name="rearLightTarget2" castShadow receiveShadow geometry={nodes.rearLightTarget2.geometry} material={nodes.rearLightTarget2.material} position={[-52.88, 5.97, 3.29]} scale={0.23} ref={rearLightTarget2} visible={false} />
        
        <StaticItems />

        <group name="engine2" position={[-38.5, 3.02, 14.62]} rotation={[Math.PI / 2, 0, 0]} scale={0.41} ref={projectsScreenRef}>
          <mesh name="Cone003" castShadow receiveShadow geometry={nodes.Cone003.geometry} material={materials['black.006']} />
          <mesh name="Cone003_1" castShadow receiveShadow geometry={nodes.Cone003_1.geometry} material={materials.metal} />
          {projectsClicked &&
            <HtmlContainer
              center
            >
              <Projects exitFocus={exitFocus} />
            </HtmlContainer>

          }
        </group>

        <group name="airplane" position={[-32.6, 5.02, 8.14]} scale={2.26} >
          <mesh name="Cube034" castShadow receiveShadow geometry={nodes.Cube034.geometry} material={materials.airplane_white} />
          <mesh name="Cube034_1" castShadow receiveShadow geometry={nodes.Cube034_1.geometry} material={materials.airplane_dark_blue} />
          <mesh name="Cube034_2" castShadow receiveShadow geometry={nodes.Cube034_2.geometry} material={materials.metal} />
          <mesh name="Cube034_3" castShadow receiveShadow geometry={nodes.Cube034_3.geometry} material={materials.airplane_interior_lights} />
          <mesh name="Cube034_4" castShadow receiveShadow geometry={nodes.Cube034_4.geometry} material={materials['black.006']} />
          <mesh name="Cube034_5" castShadow receiveShadow geometry={nodes.Cube034_5.geometry} material={materials['metal_frame.002']} />
          <mesh name="Cube034_6" castShadow receiveShadow geometry={nodes.Cube034_6.geometry} material={materials['headlights.004']} />
          {tabInUse && <PositionalAudio
            url='/audio/jet-idle.mp3'
            distance={0.8}
            autoplay
            loop
            ref={jetEngineSoundRef}
          />}
        </group>
        
        <group name="police_car" position={[58.08, 200, 46.56]} rotation={[Math.PI, 0, Math.PI]} scale={0.93}>
          <mesh name="Cube001" castShadow receiveShadow geometry={nodes.Cube001.geometry} material={materials['black.006']} />
          <mesh name="Cube001_1" castShadow receiveShadow geometry={nodes.Cube001_1.geometry} material={materials['Material.002']} />
          <mesh name="Cube001_2" castShadow receiveShadow geometry={nodes.Cube001_2.geometry} material={materials.window} />
          <mesh name="Cube001_3" castShadow receiveShadow geometry={nodes.Cube001_3.geometry} material={materials['headlights.004']} />
          <mesh name="Cube001_4" castShadow receiveShadow geometry={nodes.Cube001_4.geometry} material={materials.taillights} />
          <mesh name="Cube001_5" castShadow receiveShadow geometry={nodes.Cube001_5.geometry} material={materials['metal_frame.002']} />
          <mesh name="Cube001_6" castShadow receiveShadow geometry={nodes.Cube001_6.geometry} material={materials.siren_blue} />
          <mesh name="Cube001_7" castShadow receiveShadow geometry={nodes.Cube001_7.geometry} material={materials.siren_red} />
          {tabInUse && <group>
            <PositionalAudio
              url='/audio/police-siren.mp3'
              distance={1}
              autoplay
            // loop
            />
            <PositionalAudio
              url='/audio/car-passing2.mp3'
              distance={1}
              autoplay
              loop
            />
          </group>}
        </group>

        <group name="turningTaxi" position={[54.24, 1.47, -34.57]} scale={0.93}>
          <mesh name="Cube039" castShadow receiveShadow geometry={nodes.Cube039.geometry} material={materials['taxi_yellow.002']} />
          <mesh name="Cube039_1" castShadow receiveShadow geometry={nodes.Cube039_1.geometry} material={materials['Material.002']} />
          <mesh name="Cube039_2" castShadow receiveShadow geometry={nodes.Cube039_2.geometry} material={materials.window} />
          <mesh name="Cube039_3" castShadow receiveShadow geometry={nodes.Cube039_3.geometry} material={materials['headlights.004']} />
          <mesh name="Cube039_4" castShadow receiveShadow geometry={nodes.Cube039_4.geometry} material={materials['black.006']} />
          <mesh name="Cube039_5" castShadow receiveShadow geometry={nodes.Cube039_5.geometry} material={materials.metal} />
          <mesh name="Cube039_6" castShadow receiveShadow geometry={nodes.Cube039_6.geometry} material={materials.taillights} />
          <mesh name="Cube039_7" castShadow receiveShadow geometry={nodes.Cube039_7.geometry} material={materials.taxi_sign} />
          {/* props.ready can be used only once. the browser only needs to know if the user interaction triggered the sound */}
          {props.ready && tabInUse && <PositionalAudio
            url='/audio/car-passing1.mp3'
            distance={3}
            autoplay
            loop
          />}
        </group>
        
        <group name="redMovingCar" position={[54.49, 200, -34.77]} rotation={[0, 0.01, 0]} scale={[0.74, 0.3, 1.2]}>
          <mesh name="Cube041" castShadow receiveShadow geometry={nodes.Cube041.geometry} material={materials['headlights.004']} />
          <mesh name="Cube041_1" castShadow receiveShadow geometry={nodes.Cube041_1.geometry} material={materials.firefighter_red} />
          <mesh name="Cube041_2" castShadow receiveShadow geometry={nodes.Cube041_2.geometry} material={materials.window} />
          <mesh name="Cube041_3" castShadow receiveShadow geometry={nodes.Cube041_3.geometry} material={materials.taillights} />
          <mesh name="Cube041_4" castShadow receiveShadow geometry={nodes.Cube041_4.geometry} material={materials['black.006']} />
          <mesh name="Cube041_5" castShadow receiveShadow geometry={nodes.Cube041_5.geometry} material={materials.metal} />

          {tabInUse && <PositionalAudio
            url='/audio/car-passing2.mp3'
            distance={2}
            autoplay
            loop
          />}
        </group>
        
        <group name="blueMovingCar" position={[54.27, 200, -34.58]} scale={0.93}>
          <mesh name="Cube043" castShadow receiveShadow geometry={nodes.Cube043.geometry} material={materials['headlights.004']} />
          <mesh name="Cube043_1" castShadow receiveShadow geometry={nodes.Cube043_1.geometry} material={materials['black.006']} />
          <mesh name="Cube043_2" castShadow receiveShadow geometry={nodes.Cube043_2.geometry} material={materials['metal_frame.002']} />
          <mesh name="Cube043_3" castShadow receiveShadow geometry={nodes.Cube043_3.geometry} material={materials.taillights} />
          <mesh name="Cube043_4" castShadow receiveShadow geometry={nodes.Cube043_4.geometry} material={materials.DARK_BLUE} />
          <mesh name="Cube043_5" castShadow receiveShadow geometry={nodes.Cube043_5.geometry} material={materials.window} />

          {tabInUse && <PositionalAudio
            url='/audio/car-passing1.mp3'
            distance={2}
            autoplay
            loop
          />}
        </group>
       
        <group name="tree3" position={[47.24, 3.95, 29.79]} rotation={[0, 1.35, 0]}>
          <mesh name="Cube177" castShadow receiveShadow geometry={nodes.Cube177.geometry} material={materials.tree_branch} />
          <mesh name="Cube177_1" castShadow receiveShadow geometry={nodes.Cube177_1.geometry} material={materials.tree_green} />
          <mesh name="Cube177_2" castShadow receiveShadow geometry={nodes.Cube177_2.geometry} material={materials.tree_green_2} />
          {tabInUse && <PositionalAudio
            url='/audio/cricket.mp3'
            distance={1.5}
            autoplay
            loop
          />}
        </group>
        
        <mesh name="billboard" castShadow receiveShadow geometry={nodes.billboard.geometry} material={materials.dark_metal_frame} position={[52.25, 4.43, 10.49]} scale={[0.11, 1.78, 3.03]} />
        <group name="Bus_animated" position={[58.17, 2.06, 45.89]} rotation={[-Math.PI, 0, -Math.PI]} scale={[1.17, 1.35, 1.23]}>
          <mesh name="Cube006" castShadow receiveShadow geometry={nodes.Cube006.geometry} material={materials['black.006']} />
          <mesh name="Cube006_1" castShadow receiveShadow geometry={nodes.Cube006_1.geometry} material={materials.light_blue} />
          <mesh name="Cube006_2" castShadow receiveShadow geometry={nodes.Cube006_2.geometry} material={materials.window} />
          <mesh name="Cube006_3" castShadow receiveShadow geometry={nodes.Cube006_3.geometry} material={materials['headlights.004']} />
          <mesh name="Cube006_4" castShadow receiveShadow geometry={nodes.Cube006_4.geometry} material={materials.taillights} />
          <mesh name="Cube006_5" castShadow receiveShadow geometry={nodes.Cube006_5.geometry} material={materials.metal} />

          {tabInUse && <PositionalAudio
            url='/audio/car-passing1.mp3'
            distance={4}
            autoplay
            loop
          />}
        </group>

        <mesh name="billboardLCD" castShadow receiveShadow geometry={nodes.billboardLCD.geometry} material={materials.mainScreen} position={[52.43, 4.43, 10.43]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={3.32} ref={billboardLCDRef} />
        <mesh name="infoLCD2" castShadow receiveShadow geometry={nodes.infoLCD2.geometry} material={nodes.infoLCD2.material}  >
          <meshBasicMaterial map={infoLCD2Video} toneMapped={false} />
        </mesh>
        <mesh name="infoLCD1" castShadow receiveShadow geometry={nodes.infoLCD1.geometry} material={materials.aboutMePage} position={[29.41, 3.94, 20.57]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={[1.6, 2.83, 3.02]} onClick={handleClickArea} />
        
        <group name="straight_taxi" position={[58.15, 200, 46.47]} rotation={[Math.PI, 0, Math.PI]} scale={0.93}>
          <mesh name="Cube003" castShadow receiveShadow geometry={nodes.Cube003.geometry} material={materials.window} />
          <mesh name="Cube003_1" castShadow receiveShadow geometry={nodes.Cube003_1.geometry} material={materials['headlights.004']} />
          <mesh name="Cube003_2" castShadow receiveShadow geometry={nodes.Cube003_2.geometry} material={materials['taxi_yellow.002']} />
          <mesh name="Cube003_3" castShadow receiveShadow geometry={nodes.Cube003_3.geometry} material={materials['Material.002']} />
          <mesh name="Cube003_4" castShadow receiveShadow geometry={nodes.Cube003_4.geometry} material={materials['black.006']} />
          <mesh name="Cube003_5" castShadow receiveShadow geometry={nodes.Cube003_5.geometry} material={materials.metal} />
          <mesh name="Cube003_6" castShadow receiveShadow geometry={nodes.Cube003_6.geometry} material={materials.taillights} />
          <mesh name="Cube003_7" castShadow receiveShadow geometry={nodes.Cube003_7.geometry} material={materials.taxi_sign} />

          {tabInUse && <PositionalAudio
            url='/audio/car-passing2.mp3'
            distance={2}
            autoplay
            loop
          />}
        </group>
        <group name="creditsArea" position={[51.65, 3.86, -2.85]} scale={[0.33, 0.1, 0.39]} onClick={handleClickArea} ref={creditsAreaRef}>
          <mesh name="Cube014" castShadow receiveShadow geometry={nodes.Cube014.geometry} material={materials.airplane_dark_blue} />
          <mesh name="Cube014_1" castShadow receiveShadow geometry={nodes.Cube014_1.geometry} material={materials.emissive_white} />
          {creditsClicked && <HtmlContainer center>
            <Credits exitFocus={exitFocus} />
          </HtmlContainer>}
        </group>
        
        <group name="radar" position={[15.54, 34.28, -27.27]} rotation={[0.06, 0, 0]} scale={0.86}>
          <mesh name="Cube010" castShadow receiveShadow geometry={nodes.Cube010.geometry} material={materials.radar_red} />
          <mesh name="Cube010_1" castShadow receiveShadow geometry={nodes.Cube010_1.geometry} material={materials.radar_white} />

          {tabInUse && <PositionalAudio
            url={'/audio/radar.mp3'}
            distance={2}
            autoplay
            loop
          />}
        </group>

        <group name="conveyor-truck" position={[-37.06, 2.21, 1.08]} scale={[3.69, 0.8, 1]} ref={skillsScreenRef} >
          <mesh name="Cube009" castShadow receiveShadow geometry={nodes.Cube009.geometry} material={materials['airplane_white.001']} />
          <mesh name="Cube009_1" castShadow receiveShadow geometry={nodes.Cube009_1.geometry} material={materials.window} />
          <mesh name="Cube009_2" castShadow receiveShadow geometry={nodes.Cube009_2.geometry} material={materials['headlights.004']} />
          <mesh name="Cube009_3" castShadow receiveShadow geometry={nodes.Cube009_3.geometry} material={materials.orange} />
          <mesh name="Cube009_4" castShadow receiveShadow geometry={nodes.Cube009_4.geometry} material={materials.taillights} />
          <mesh name="Cube009_5" castShadow receiveShadow geometry={nodes.Cube009_5.geometry} material={materials['black.006']} />
          <mesh name="Cube009_6" castShadow receiveShadow geometry={nodes.Cube009_6.geometry} material={materials['metal_frame.002']} />
          {skillsClicked &&
            <HtmlContainer center >
              <Skills exitFocus={exitFocus} />
            </HtmlContainer>

          }

        </group>

        <group name="revolvingDoor" position={[27.65, 2.67, 10.48]} scale={[67.28, 48.07, 48.07]}>
          <mesh name="Plane003" castShadow receiveShadow geometry={nodes.Plane003.geometry} material={materials.dark_metal_frame} />
          <mesh name="Plane003_1" castShadow receiveShadow geometry={nodes.Plane003_1.geometry} material={materials.dark_glass} />

          {tabInUse && <PositionalAudio
            url='/audio/airport-ambiance.mp3'
            distance={100}
            autoplay
            loop
          />}
        </group>
        <mesh name="infoDisplay1" castShadow receiveShadow geometry={nodes.infoDisplay1.geometry} material={materials.dark_metal_frame} position={[29.25, 3.69, 20.61]} scale={[0.08, 1.62, 1.51]} ref={aboutMeScreenRef} />
      </group>
    </group>
  )
}

useGLTF.preload('./models/cars/scene-transformed.glb')
