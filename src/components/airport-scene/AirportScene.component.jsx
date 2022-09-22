import React, { useRef, useEffect, useState } from 'react'
import { useGLTF, useAnimations,useVideoTexture, PositionalAudio } from '@react-three/drei'

import { useFrame, useThree } from '@react-three/fiber';

import { Vector3} from 'three';
import { useKeyState } from 'use-key-state'
import Skills from '../overlay/skills/Skills.component';
import AudioToggleButton from '../audio-toggle-button/AudioToggleButton.component';
import Projects from '../overlay/projects/Projects.component';
import { HtmlContainer } from '../audio-toggle-button/AudioToggleButton.styles';
import ButtonSoundEffect from '../button-sound-effect/ButtonSoundEffect.component';
import useTabInUse from '../../hooks/useTabInUse';
import useWindowWidth from '../../hooks/useWindowWidth';
import Credits from '../credits/Credits.component';


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
  const [audioPlaying, setAudioPlaying] = useState(true)


  const toggleAudio = () => {
    setAudioPlaying(!audioPlaying)
  }

  // play main animations 
  useEffect(() => {
    console.log('started animations');
    Object.keys(actions).forEach((key) => {
      if (!animationsList.includes(key)) {
        actions[key].play()
      }
    })
  },[])

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

  // const showHelpers = false

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

  // useHelper(showHelpers && lightRef1, SpotLightHelper, 0xffff00)
  // useHelper(showHelpers && lightRef2, SpotLightHelper, 0xffff00)
  // useHelper(showHelpers && lightRef3, SpotLightHelper, 0xffff00)
  // useHelper(showHelpers && lightRef4, SpotLightHelper, 0xffff00)
  // useHelper(showHelpers && lightRef5, SpotLightHelper, 0xffff00)

  const [aboutMeclicked, setAboutMeClicked] = useState(false)
  const [projectsClicked, setProjectsClicked] = useState(false)
  const [skillsClicked, setSkillsClicked] = useState(false)
  const [mainScreenFocus, setMainScreenFocus] = useState(true)
  const [exitFocusClicked, setExitFocusClicked] = useState(false)
  const [bingPlaying, setBingPlaying] = useState(false)
  const [creditsClicked, setCreditsClicked] = useState(false)


  // when about me is clicked
  const width = useWindowWidth()
  useFrame(({ camera }) => {
    if (aboutMeclicked) {
      camera.lookAt(aboutMeScreenRef.current.position)
      if (width < 600) {
        camera.position.lerp(new Vector3(34.4, 3.97, 21.8), 0.05)

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
      const skillsArea = new Vector3(-25.69, 3.78, -4.08)
      camera.position.lerp(skillsArea, 0.08)
      setSkillsAnimPlaying(true)

    }
  })
  
  // when credits is clicked
  useFrame(({ camera }) => {
    if (creditsClicked) {
      camera.lookAt(creditsAreaRef.current.position)
      camera.position.lerp(new Vector3(40, 4, -8), 0.08)

    }
  })

  // when projects is clicked
  useFrame(({ camera }) => {
    if (projectsScreenRef.current) {
      if (projectsClicked) {
        camera.lookAt(projectsScreenRef.current.position)
        const projectArea = new Vector3(-27.58, 4.88, 25.66)
        camera.position.lerp(projectArea, 0.05)
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
  },[esc,exitFocusClicked,mainScreenFocus])

  // when main screen is in focus 
  useFrame(({ camera }) => {
    if (mainScreenFocus) {
      camera.lookAt(billboardLCDRef.current.position)
      camera.position.lerp(new Vector3(64.6, 7.12, 10.46), 0.05)
    }
  })

  // returns true if the current browser tab loses focus
  const tabInUse = useTabInUse()

  // disable audio if the tab is left
  useEffect(() => {

    if (!tabInUse) {
      setAudioPlaying(false)
    } 
    else {
      setAudioPlaying(true)
    }
  }, [tabInUse])


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
      <ButtonSoundEffect playing={bingPlaying}  />
      <group name="Scene">
        <AudioToggleButton toggleAudio={toggleAudio} audioPlaying={audioPlaying} />
        
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
        <mesh name="returnArea" castShadow receiveShadow geometry={nodes.returnArea.geometry} material={nodes.returnArea.material} position={[52.46, 3.08, 12.78]} scale={[0.05, 0.12, 0.18]} onClick={handleClickArea} visible={false} />
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





        <group name="cart" position={[28.58, 1.67, 3.86]} rotation={[0.09, 0, 0]} scale={[8.39, 10.86, 9.64]}>
          <mesh name="Cube022" castShadow receiveShadow geometry={nodes.Cube022.geometry} material={materials['headlights.004']} />
          <mesh name="Cube022_1" castShadow receiveShadow geometry={nodes.Cube022_1.geometry} material={materials['black.006']} />
          <mesh name="Cube022_2" castShadow receiveShadow geometry={nodes.Cube022_2.geometry} material={materials['metal_frame.002']} />
          <mesh name="Cube022_3" castShadow receiveShadow geometry={nodes.Cube022_3.geometry} material={materials.DARK_BLUE} />
          <mesh name="Cube022_4" castShadow receiveShadow geometry={nodes.Cube022_4.geometry} material={materials.grey} />
        </group>
        <group name="cart001" position={[28.58, 1.67, 4.28]} rotation={[0.09, 0, 0]} scale={[8.39, 10.86, 9.64]}>
          <mesh name="Cube022" castShadow receiveShadow geometry={nodes.Cube022.geometry} material={materials['headlights.004']} />
          <mesh name="Cube022_1" castShadow receiveShadow geometry={nodes.Cube022_1.geometry} material={materials['black.006']} />
          <mesh name="Cube022_2" castShadow receiveShadow geometry={nodes.Cube022_2.geometry} material={materials['metal_frame.002']} />
          <mesh name="Cube022_3" castShadow receiveShadow geometry={nodes.Cube022_3.geometry} material={materials.DARK_BLUE} />
          <mesh name="Cube022_4" castShadow receiveShadow geometry={nodes.Cube022_4.geometry} material={materials.grey} />
        </group>
        <group name="cart002" position={[28.58, 1.67, 4.64]} rotation={[0.09, 0, 0]} scale={[8.39, 10.86, 9.64]}>
          <mesh name="Cube022" castShadow receiveShadow geometry={nodes.Cube022.geometry} material={materials['headlights.004']} />
          <mesh name="Cube022_1" castShadow receiveShadow geometry={nodes.Cube022_1.geometry} material={materials['black.006']} />
          <mesh name="Cube022_2" castShadow receiveShadow geometry={nodes.Cube022_2.geometry} material={materials['metal_frame.002']} />
          <mesh name="Cube022_3" castShadow receiveShadow geometry={nodes.Cube022_3.geometry} material={materials.DARK_BLUE} />
          <mesh name="Cube022_4" castShadow receiveShadow geometry={nodes.Cube022_4.geometry} material={materials.grey} />
        </group>
        <group name="cart003" position={[28.58, 1.67, 5.03]} rotation={[0.09, 0, 0]} scale={[8.39, 10.86, 9.64]}>
          <mesh name="Cube022" castShadow receiveShadow geometry={nodes.Cube022.geometry} material={materials['headlights.004']} />
          <mesh name="Cube022_1" castShadow receiveShadow geometry={nodes.Cube022_1.geometry} material={materials['black.006']} />
          <mesh name="Cube022_2" castShadow receiveShadow geometry={nodes.Cube022_2.geometry} material={materials['metal_frame.002']} />
          <mesh name="Cube022_3" castShadow receiveShadow geometry={nodes.Cube022_3.geometry} material={materials.DARK_BLUE} />
          <mesh name="Cube022_4" castShadow receiveShadow geometry={nodes.Cube022_4.geometry} material={materials.grey} />
        </group>
        <group name="cart004" position={[28.58, 1.67, 5.44]} rotation={[0.09, 0, 0]} scale={[8.39, 10.86, 9.64]}>
          <mesh name="Cube022" castShadow receiveShadow geometry={nodes.Cube022.geometry} material={materials['headlights.004']} />
          <mesh name="Cube022_1" castShadow receiveShadow geometry={nodes.Cube022_1.geometry} material={materials['black.006']} />
          <mesh name="Cube022_2" castShadow receiveShadow geometry={nodes.Cube022_2.geometry} material={materials['metal_frame.002']} />
          <mesh name="Cube022_3" castShadow receiveShadow geometry={nodes.Cube022_3.geometry} material={materials.DARK_BLUE} />
          <mesh name="Cube022_4" castShadow receiveShadow geometry={nodes.Cube022_4.geometry} material={materials.grey} />
        </group>
        <group name="cart005" position={[28.58, 1.67, 5.8]} rotation={[0.09, 0, 0]} scale={[8.39, 10.86, 9.64]}>
          <mesh name="Cube022" castShadow receiveShadow geometry={nodes.Cube022.geometry} material={materials['headlights.004']} />
          <mesh name="Cube022_1" castShadow receiveShadow geometry={nodes.Cube022_1.geometry} material={materials['black.006']} />
          <mesh name="Cube022_2" castShadow receiveShadow geometry={nodes.Cube022_2.geometry} material={materials['metal_frame.002']} />
          <mesh name="Cube022_3" castShadow receiveShadow geometry={nodes.Cube022_3.geometry} material={materials.DARK_BLUE} />
          <mesh name="Cube022_4" castShadow receiveShadow geometry={nodes.Cube022_4.geometry} material={materials.grey} />
        </group>
        <group name="cart006" position={[28.58, 1.67, 6.2]} rotation={[0.09, 0, 0]} scale={[8.39, 10.86, 9.64]}>
          <mesh name="Cube022" castShadow receiveShadow geometry={nodes.Cube022.geometry} material={materials['headlights.004']} />
          <mesh name="Cube022_1" castShadow receiveShadow geometry={nodes.Cube022_1.geometry} material={materials['black.006']} />
          <mesh name="Cube022_2" castShadow receiveShadow geometry={nodes.Cube022_2.geometry} material={materials['metal_frame.002']} />
          <mesh name="Cube022_3" castShadow receiveShadow geometry={nodes.Cube022_3.geometry} material={materials.DARK_BLUE} />
          <mesh name="Cube022_4" castShadow receiveShadow geometry={nodes.Cube022_4.geometry} material={materials.grey} />
        </group>
        <group name="cart007" position={[28.58, 1.67, 6.58]} rotation={[0.09, 0, 0]} scale={[8.39, 10.86, 9.64]}>
          <mesh name="Cube022" castShadow receiveShadow geometry={nodes.Cube022.geometry} material={materials['headlights.004']} />
          <mesh name="Cube022_1" castShadow receiveShadow geometry={nodes.Cube022_1.geometry} material={materials['black.006']} />
          <mesh name="Cube022_2" castShadow receiveShadow geometry={nodes.Cube022_2.geometry} material={materials['metal_frame.002']} />
          <mesh name="Cube022_3" castShadow receiveShadow geometry={nodes.Cube022_3.geometry} material={materials.DARK_BLUE} />
          <mesh name="Cube022_4" castShadow receiveShadow geometry={nodes.Cube022_4.geometry} material={materials.grey} />
        </group>
        <group name="cart008" position={[28.58, 1.67, 6.96]} rotation={[0.09, 0, 0]} scale={[8.39, 10.86, 9.64]}>
          <mesh name="Cube022" castShadow receiveShadow geometry={nodes.Cube022.geometry} material={materials['headlights.004']} />
          <mesh name="Cube022_1" castShadow receiveShadow geometry={nodes.Cube022_1.geometry} material={materials['black.006']} />
          <mesh name="Cube022_2" castShadow receiveShadow geometry={nodes.Cube022_2.geometry} material={materials['metal_frame.002']} />
          <mesh name="Cube022_3" castShadow receiveShadow geometry={nodes.Cube022_3.geometry} material={materials.DARK_BLUE} />
          <mesh name="Cube022_4" castShadow receiveShadow geometry={nodes.Cube022_4.geometry} material={materials.grey} />
        </group>
        <group name="engine1" position={[-26.72, 3.02, 13.7]} rotation={[Math.PI / 2, 0, 0]} scale={0.41}>
          <mesh name="Cone" castShadow receiveShadow geometry={nodes.Cone.geometry} material={materials['black.006']} />
          <mesh name="Cone_1" castShadow receiveShadow geometry={nodes.Cone_1.geometry} material={materials.metal} />
        </group>



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
          {audioPlaying && <PositionalAudio
            url='/audio/jet-idle.mp3'
            distance={1}
            autoplay
            loop
            ref={jetEngineSoundRef}
          />}


        </group>
        <group name="orangeRunwayCar2" position={[-52.85, 1.12, -14.27]} rotation={[Math.PI, -0.72, Math.PI]} scale={[0.87, 0.35, 1.41]}>
          <mesh name="Cube185" castShadow receiveShadow geometry={nodes.Cube185.geometry} material={materials.window} />
          <mesh name="Cube185_1" castShadow receiveShadow geometry={nodes.Cube185_1.geometry} material={materials['headlights.004']} />
          <mesh name="Cube185_2" castShadow receiveShadow geometry={nodes.Cube185_2.geometry} material={materials.siren_red} />
          <mesh name="Cube185_3" castShadow receiveShadow geometry={nodes.Cube185_3.geometry} material={materials['taxi_yellow.002']} />
          <mesh name="Cube185_4" castShadow receiveShadow geometry={nodes.Cube185_4.geometry} material={materials['black.006']} />
          <mesh name="Cube185_5" castShadow receiveShadow geometry={nodes.Cube185_5.geometry} material={materials.orange} />
          <mesh name="Cube185_6" castShadow receiveShadow geometry={nodes.Cube185_6.geometry} material={materials.dark_metal_frame} />
          <mesh name="Cube185_7" castShadow receiveShadow geometry={nodes.Cube185_7.geometry} material={materials['metal_frame.002']} />
          <mesh name="Cube185_8" castShadow receiveShadow geometry={nodes.Cube185_8.geometry} material={materials.siren_orange} />
        </group>
        <group name="runwayBackup" position={[-32.58, 1.75, 35.35]} scale={[1, 1, 2]}>
          <mesh name="Cube199" castShadow receiveShadow geometry={nodes.Cube199.geometry} material={materials.airplane_white} />
          <mesh name="Cube199_1" castShadow receiveShadow geometry={nodes.Cube199_1.geometry} material={materials.YELLOW} />
          <mesh name="Cube199_2" castShadow receiveShadow geometry={nodes.Cube199_2.geometry} material={materials['headlights.004']} />
          <mesh name="Cube199_3" castShadow receiveShadow geometry={nodes.Cube199_3.geometry} material={materials['black.006']} />
          <mesh name="Cube199_4" castShadow receiveShadow geometry={nodes.Cube199_4.geometry} material={materials.siren_orange} />
          <mesh name="Cube199_5" castShadow receiveShadow geometry={nodes.Cube199_5.geometry} material={materials['metal_frame.002']} />
          <mesh name="Cube199_6" castShadow receiveShadow geometry={nodes.Cube199_6.geometry} material={materials.window} />
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
          {audioPlaying &&
            <group>
              <PositionalAudio
                url='/audio/police-siren.mp3'
                distance={1.5}
                autoplay
                loop
              />
              <PositionalAudio
                url='/audio/car-passing2.mp3'
                distance={1}
                autoplay
                loop
              />
            </group>


          }
        </group>
        <group name="runwayPolice" position={[-46.7, 2.49, 6.09]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.93}>
          <mesh name="Cube002" castShadow receiveShadow geometry={nodes.Cube002.geometry} material={materials['black.006']} />
          <mesh name="Cube002_1" castShadow receiveShadow geometry={nodes.Cube002_1.geometry} material={materials['Material.002']} />
          <mesh name="Cube002_2" castShadow receiveShadow geometry={nodes.Cube002_2.geometry} material={materials.window} />
          <mesh name="Cube002_3" castShadow receiveShadow geometry={nodes.Cube002_3.geometry} material={materials['headlights.004']} />
          <mesh name="Cube002_4" castShadow receiveShadow geometry={nodes.Cube002_4.geometry} material={materials.taillights} />
          <mesh name="Cube002_5" castShadow receiveShadow geometry={nodes.Cube002_5.geometry} material={materials['metal_frame.002']} />
          <mesh name="Cube002_6" castShadow receiveShadow geometry={nodes.Cube002_6.geometry} material={materials.siren_blue} />
          <mesh name="Cube002_7" castShadow receiveShadow geometry={nodes.Cube002_7.geometry} material={materials.siren_red} />
        </group>
        <group name="firefighter1" position={[-52.8, 1.75, 40.1]} rotation={[0, 1.56, 0]} scale={[1.1, 1.1, 4.46]}>
          <mesh name="Cube120" castShadow receiveShadow geometry={nodes.Cube120.geometry} material={materials['headlights.004']} />
          <mesh name="Cube120_1" castShadow receiveShadow geometry={nodes.Cube120_1.geometry} material={materials.window} />
          <mesh name="Cube120_2" castShadow receiveShadow geometry={nodes.Cube120_2.geometry} material={materials.red_siren} />
          <mesh name="Cube120_3" castShadow receiveShadow geometry={nodes.Cube120_3.geometry} material={materials.blue_siren} />
          <mesh name="Cube120_4" castShadow receiveShadow geometry={nodes.Cube120_4.geometry} material={materials.metal} />
          <mesh name="Cube120_5" castShadow receiveShadow geometry={nodes.Cube120_5.geometry} material={materials.firefighter_red} />
          <mesh name="Cube120_6" castShadow receiveShadow geometry={nodes.Cube120_6.geometry} material={materials.airplane_white} />
          <mesh name="Cube120_7" castShadow receiveShadow geometry={nodes.Cube120_7.geometry} material={materials.taillights} />
          <mesh name="Cube120_8" castShadow receiveShadow geometry={nodes.Cube120_8.geometry} material={materials['black.006']} />
        </group>
        <group name="firefighter2" position={[-52.93, 1.75, 36.39]} rotation={[0, 1.56, 0]} scale={[1.1, 1.1, 4.46]}>
          <mesh name="Cube120" castShadow receiveShadow geometry={nodes.Cube120.geometry} material={materials['headlights.004']} />
          <mesh name="Cube120_1" castShadow receiveShadow geometry={nodes.Cube120_1.geometry} material={materials.window} />
          <mesh name="Cube120_2" castShadow receiveShadow geometry={nodes.Cube120_2.geometry} material={materials.red_siren} />
          <mesh name="Cube120_3" castShadow receiveShadow geometry={nodes.Cube120_3.geometry} material={materials.blue_siren} />
          <mesh name="Cube120_4" castShadow receiveShadow geometry={nodes.Cube120_4.geometry} material={materials.metal} />
          <mesh name="Cube120_5" castShadow receiveShadow geometry={nodes.Cube120_5.geometry} material={materials.firefighter_red} />
          <mesh name="Cube120_6" castShadow receiveShadow geometry={nodes.Cube120_6.geometry} material={materials.airplane_white} />
          <mesh name="Cube120_7" castShadow receiveShadow geometry={nodes.Cube120_7.geometry} material={materials.taillights} />
          <mesh name="Cube120_8" castShadow receiveShadow geometry={nodes.Cube120_8.geometry} material={materials['black.006']} />
        </group>
        <group name="runwayWhiteCar" position={[-19.72, 1.42, -20.94]} rotation={[0, -0.77, 0]} scale={[1.22, 0.26, 2.57]}>
          <mesh name="Cube183" castShadow receiveShadow geometry={nodes.Cube183.geometry} material={materials['black.006']} />
          <mesh name="Cube183_1" castShadow receiveShadow geometry={nodes.Cube183_1.geometry} material={materials.window} />
          <mesh name="Cube183_2" castShadow receiveShadow geometry={nodes.Cube183_2.geometry} material={materials.red_siren} />
          <mesh name="Cube183_3" castShadow receiveShadow geometry={nodes.Cube183_3.geometry} material={materials.airplane_white} />
          <mesh name="Cube183_4" castShadow receiveShadow geometry={nodes.Cube183_4.geometry} material={materials.YELLOW} />
          <mesh name="Cube183_5" castShadow receiveShadow geometry={nodes.Cube183_5.geometry} material={materials['metal_frame.002']} />
          <mesh name="Cube183_6" castShadow receiveShadow geometry={nodes.Cube183_6.geometry} material={materials.siren_orange} />
          <mesh name="Cube183_7" castShadow receiveShadow geometry={nodes.Cube183_7.geometry} material={materials['headlights.004']} />
        </group>
        <group name="ground" scale={[67.28, 48.07, 48.07]}>
          <mesh name="Plane001" castShadow receiveShadow geometry={nodes.Plane001.geometry} material={materials.surface_yellow} />
          <mesh name="Plane001_1" castShadow receiveShadow geometry={nodes.Plane001_1.geometry} material={materials.surface} />
          <mesh name="Plane001_2" castShadow receiveShadow geometry={nodes.Plane001_2.geometry} material={materials.exterior_white} />
          <mesh name="Plane001_3" castShadow receiveShadow geometry={nodes.Plane001_3.geometry} material={materials.green_grass} />
          <mesh name="Plane001_4" castShadow receiveShadow geometry={nodes.Plane001_4.geometry} material={materials.spanish_purple} />
          <mesh name="Plane001_5" castShadow receiveShadow geometry={nodes.Plane001_5.geometry} material={materials.dark_metal_frame} />
          <mesh name="Plane001_6" castShadow receiveShadow geometry={nodes.Plane001_6.geometry} material={materials.dark_glass} />
          <mesh name="Plane001_7" castShadow receiveShadow geometry={nodes.Plane001_7.geometry} material={materials.SURFACE_GREY} />
          <mesh name="Plane001_8" castShadow receiveShadow geometry={nodes.Plane001_8.geometry} material={materials.tree_green} />
          <mesh name="Plane001_9" castShadow receiveShadow geometry={nodes.Plane001_9.geometry} material={materials.tree_brown} />
          <mesh name="Plane001_10" castShadow receiveShadow geometry={nodes.Plane001_10.geometry} material={materials.tree_green_2} />
          <mesh name="Plane001_11" castShadow receiveShadow geometry={nodes.Plane001_11.geometry} material={materials['warm light ']} />
          <mesh name="Plane001_12" castShadow receiveShadow geometry={nodes.Plane001_12.geometry} material={materials.emissive_white} />
          <mesh name="Plane001_13" castShadow receiveShadow geometry={nodes.Plane001_13.geometry} material={materials.metal} />
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
          {audioPlaying && <PositionalAudio
            url='/audio/car-passing1.mp3'
            distance={3}
            autoplay
            loop
          />}
        </group>
        <group name="yellowparkingTaxi" position={[43.74, 1.48, 12.64]} scale={0.93}>
          <mesh name="Cube039" castShadow receiveShadow geometry={nodes.Cube039.geometry} material={materials['taxi_yellow.002']} />
          <mesh name="Cube039_1" castShadow receiveShadow geometry={nodes.Cube039_1.geometry} material={materials['Material.002']} />
          <mesh name="Cube039_2" castShadow receiveShadow geometry={nodes.Cube039_2.geometry} material={materials.window} />
          <mesh name="Cube039_3" castShadow receiveShadow geometry={nodes.Cube039_3.geometry} material={materials['headlights.004']} />
          <mesh name="Cube039_4" castShadow receiveShadow geometry={nodes.Cube039_4.geometry} material={materials['black.006']} />
          <mesh name="Cube039_5" castShadow receiveShadow geometry={nodes.Cube039_5.geometry} material={materials.metal} />
          <mesh name="Cube039_6" castShadow receiveShadow geometry={nodes.Cube039_6.geometry} material={materials.taillights} />
          <mesh name="Cube039_7" castShadow receiveShadow geometry={nodes.Cube039_7.geometry} material={materials.taxi_sign} />
        </group>
        <group name="redParkingCar" position={[43.77, 1.28, 8.46]} rotation={[Math.PI, -0.01, Math.PI]} scale={[0.74, 0.3, 1.2]}>
          <mesh name="Cube041" castShadow receiveShadow geometry={nodes.Cube041.geometry} material={materials['headlights.004']} />
          <mesh name="Cube041_1" castShadow receiveShadow geometry={nodes.Cube041_1.geometry} material={materials.firefighter_red} />
          <mesh name="Cube041_2" castShadow receiveShadow geometry={nodes.Cube041_2.geometry} material={materials.window} />
          <mesh name="Cube041_3" castShadow receiveShadow geometry={nodes.Cube041_3.geometry} material={materials.taillights} />
          <mesh name="Cube041_4" castShadow receiveShadow geometry={nodes.Cube041_4.geometry} material={materials['black.006']} />
          <mesh name="Cube041_5" castShadow receiveShadow geometry={nodes.Cube041_5.geometry} material={materials.metal} />
        </group>
        <group name="redMovingCar" position={[54.49, 200, -34.77]} rotation={[0, 0.01, 0]} scale={[0.74, 0.3, 1.2]}>
          <mesh name="Cube041" castShadow receiveShadow geometry={nodes.Cube041.geometry} material={materials['headlights.004']} />
          <mesh name="Cube041_1" castShadow receiveShadow geometry={nodes.Cube041_1.geometry} material={materials.firefighter_red} />
          <mesh name="Cube041_2" castShadow receiveShadow geometry={nodes.Cube041_2.geometry} material={materials.window} />
          <mesh name="Cube041_3" castShadow receiveShadow geometry={nodes.Cube041_3.geometry} material={materials.taillights} />
          <mesh name="Cube041_4" castShadow receiveShadow geometry={nodes.Cube041_4.geometry} material={materials['black.006']} />
          <mesh name="Cube041_5" castShadow receiveShadow geometry={nodes.Cube041_5.geometry} material={materials.metal} />
          {audioPlaying && <PositionalAudio
            url='/audio/car-passing2.mp3'
            distance={2}
            autoplay
            loop
          />}
        </group>
        <group name="blueParkingCar" position={[49.79, 1.44, 8.31]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.93}>
          <mesh name="Cube043" castShadow receiveShadow geometry={nodes.Cube043.geometry} material={materials['headlights.004']} />
          <mesh name="Cube043_1" castShadow receiveShadow geometry={nodes.Cube043_1.geometry} material={materials['black.006']} />
          <mesh name="Cube043_2" castShadow receiveShadow geometry={nodes.Cube043_2.geometry} material={materials['metal_frame.002']} />
          <mesh name="Cube043_3" castShadow receiveShadow geometry={nodes.Cube043_3.geometry} material={materials.taillights} />
          <mesh name="Cube043_4" castShadow receiveShadow geometry={nodes.Cube043_4.geometry} material={materials.DARK_BLUE} />
          <mesh name="Cube043_5" castShadow receiveShadow geometry={nodes.Cube043_5.geometry} material={materials.window} />
        </group>
        <group name="blueMovingCar" position={[54.27, 200, -34.58]} scale={0.93}>
          <mesh name="Cube043" castShadow receiveShadow geometry={nodes.Cube043.geometry} material={materials['headlights.004']} />
          <mesh name="Cube043_1" castShadow receiveShadow geometry={nodes.Cube043_1.geometry} material={materials['black.006']} />
          <mesh name="Cube043_2" castShadow receiveShadow geometry={nodes.Cube043_2.geometry} material={materials['metal_frame.002']} />
          <mesh name="Cube043_3" castShadow receiveShadow geometry={nodes.Cube043_3.geometry} material={materials.taillights} />
          <mesh name="Cube043_4" castShadow receiveShadow geometry={nodes.Cube043_4.geometry} material={materials.DARK_BLUE} />
          <mesh name="Cube043_5" castShadow receiveShadow geometry={nodes.Cube043_5.geometry} material={materials.window} />
          {audioPlaying && <PositionalAudio
            url='/audio/car-passing1.mp3'
            distance={2}
            autoplay
            loop
          />}
        </group>
        <group name="blackParkingCar" position={[40.64, 1.44, 12.83]} scale={0.93}>
          <mesh name="Cube157" castShadow receiveShadow geometry={nodes.Cube157.geometry} material={materials['headlights.004']} />
          <mesh name="Cube157_1" castShadow receiveShadow geometry={nodes.Cube157_1.geometry} material={materials['black.006']} />
          <mesh name="Cube157_2" castShadow receiveShadow geometry={nodes.Cube157_2.geometry} material={materials['metal_frame.002']} />
          <mesh name="Cube157_3" castShadow receiveShadow geometry={nodes.Cube157_3.geometry} material={materials.taillights} />
          <mesh name="Cube157_4" castShadow receiveShadow geometry={nodes.Cube157_4.geometry} material={materials.window} />
          <mesh name="Cube157_5" castShadow receiveShadow geometry={nodes.Cube157_5.geometry} material={materials.grey} />
        </group>
        <mesh name="airportName" castShadow receiveShadow geometry={nodes.airportName.geometry} material={materials['siren_blue.001']} position={[30.2, 13.13, 8.52]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={2.43} />
        <mesh name="runwayNumber19" castShadow receiveShadow geometry={nodes.runwayNumber19.geometry} material={materials.surface_yellow} position={[-20.2, 1.04, 26.02]} rotation={[Math.PI, 0, Math.PI]} scale={[11.74, 6.54, 11.74]} />
        <mesh name="runwayNumber92" castShadow receiveShadow geometry={nodes.runwayNumber92.geometry} material={materials.surface_yellow} position={[-42.28, 1.03, 26.02]} rotation={[Math.PI, 0, Math.PI]} scale={[11.74, 6.54, 11.74]} />
        <mesh name="iranair" castShadow receiveShadow geometry={nodes.iranair.geometry} material={materials.iranair} position={[-31.79, 10.82, -15.67]} rotation={[1.42, 0, Math.PI / 2]} scale={5.23} />
        <mesh name="iranair001" castShadow receiveShadow geometry={nodes.iranair001.geometry} material={materials.iranair} position={[-33.69, 10.82, -15.67]} rotation={[1.42, 0, Math.PI / 2]} scale={5.23} />
        <group name="Bus" position={[-15.95, 2.06, 38.39]} rotation={[0, -Math.PI / 2, 0]} scale={[1.17, 1.35, 1.23]}>
          <mesh name="Cube160" castShadow receiveShadow geometry={nodes.Cube160.geometry} material={materials['black.006']} />
          <mesh name="Cube160_1" castShadow receiveShadow geometry={nodes.Cube160_1.geometry} material={materials.light_blue} />
          <mesh name="Cube160_2" castShadow receiveShadow geometry={nodes.Cube160_2.geometry} material={materials.window} />
          <mesh name="Cube160_3" castShadow receiveShadow geometry={nodes.Cube160_3.geometry} material={materials['headlights.004']} />
          <mesh name="Cube160_4" castShadow receiveShadow geometry={nodes.Cube160_4.geometry} material={materials.taillights} />
          <mesh name="Cube160_5" castShadow receiveShadow geometry={nodes.Cube160_5.geometry} material={materials.metal} />
        </group>
        <group name="escalator" position={[-28.03, 1.58, 26.17]} scale={[0.83, 0.29, 0.75]}>
          <mesh name="Cube" castShadow receiveShadow geometry={nodes.Cube.geometry} material={materials.orange} />
          <mesh name="Cube_1" castShadow receiveShadow geometry={nodes.Cube_1.geometry} material={materials.window} />
          <mesh name="Cube_2" castShadow receiveShadow geometry={nodes.Cube_2.geometry} material={materials['headlights.004']} />
          <mesh name="Cube_3" castShadow receiveShadow geometry={nodes.Cube_3.geometry} material={materials.taillights} />
          <mesh name="Cube_4" castShadow receiveShadow geometry={nodes.Cube_4.geometry} material={materials.dark_metal_frame} />
          <mesh name="Cube_5" castShadow receiveShadow geometry={nodes.Cube_5.geometry} material={materials['metal_frame.002']} />
          <mesh name="Cube_6" castShadow receiveShadow geometry={nodes.Cube_6.geometry} material={materials['black.006']} />
          <mesh name="Cube_7" castShadow receiveShadow geometry={nodes.Cube_7.geometry} material={materials.airplane_white} />
          <mesh name="Cube_8" castShadow receiveShadow geometry={nodes.Cube_8.geometry} material={materials.dark_glass} />
        </group>
        <group name="fuelTruck" position={[-23.92, 1.96, -0.98]} rotation={[0, Math.PI / 2, 0]} scale={[1.01, 1, 1.14]}>
          <mesh name="Cube197" castShadow receiveShadow geometry={nodes.Cube197.geometry} material={materials.YELLOW} />
          <mesh name="Cube197_1" castShadow receiveShadow geometry={nodes.Cube197_1.geometry} material={materials['window.005']} />
          <mesh name="Cube197_2" castShadow receiveShadow geometry={nodes.Cube197_2.geometry} material={materials['headlights.004']} />
          <mesh name="Cube197_3" castShadow receiveShadow geometry={nodes.Cube197_3.geometry} material={materials['metal_frame.002']} />
          <mesh name="Cube197_4" castShadow receiveShadow geometry={nodes.Cube197_4.geometry} material={materials.RED} />
          <mesh name="Cube197_5" castShadow receiveShadow geometry={nodes.Cube197_5.geometry} material={materials['black.006']} />
          <mesh name="Cube197_6" castShadow receiveShadow geometry={nodes.Cube197_6.geometry} material={materials.taillights} />
          <mesh name="Cube197_7" castShadow receiveShadow geometry={nodes.Cube197_7.geometry} material={materials['black.006']} />
          <mesh name="Cube197_8" castShadow receiveShadow geometry={nodes.Cube197_8.geometry} material={materials['metal_frame.002']} />
          <mesh name="Cube197_9" castShadow receiveShadow geometry={nodes.Cube197_9.geometry} material={materials.siren_orange} />
        </group>
        <mesh name="fuelPipe" castShadow receiveShadow geometry={nodes.fuelPipe.geometry} material={materials['black.006']} position={[-29.98, 1.55, -1.04]} rotation={[0, Math.PI / 2, 0]} scale={[1.01, 1, 1.14]} />
        <group name="orangeRunwayCar1" position={[-24.82, 1.1, 18.85]} rotation={[Math.PI, -0.72, Math.PI]} scale={[0.87, 0.35, 1.41]}>
          <mesh name="Cube171" castShadow receiveShadow geometry={nodes.Cube171.geometry} material={materials.window} />
          <mesh name="Cube171_1" castShadow receiveShadow geometry={nodes.Cube171_1.geometry} material={materials['headlights.004']} />
          <mesh name="Cube171_2" castShadow receiveShadow geometry={nodes.Cube171_2.geometry} material={materials.siren_red} />
          <mesh name="Cube171_3" castShadow receiveShadow geometry={nodes.Cube171_3.geometry} material={materials['taxi_yellow.002']} />
          <mesh name="Cube171_4" castShadow receiveShadow geometry={nodes.Cube171_4.geometry} material={materials['black.006']} />
          <mesh name="Cube171_5" castShadow receiveShadow geometry={nodes.Cube171_5.geometry} material={materials.orange} />
          <mesh name="Cube171_6" castShadow receiveShadow geometry={nodes.Cube171_6.geometry} material={materials.dark_metal_frame} />
          <mesh name="Cube171_7" castShadow receiveShadow geometry={nodes.Cube171_7.geometry} material={materials['metal_frame.002']} />
          <mesh name="Cube171_8" castShadow receiveShadow geometry={nodes.Cube171_8.geometry} material={materials.siren_orange} />
        </group>
        <mesh name="Plane005" castShadow receiveShadow geometry={nodes.Plane005.geometry} material={materials['Material.009']} position={[-30.35, 5.39, -5.7]} rotation={[0, 0, -Math.PI / 2]} scale={[0.2, 0.9, 0.32]} />
        <group name="tree5" position={[47.48, 3.62, -21.15]} rotation={[-Math.PI, 1.44, -Math.PI]}>
          <mesh name="Cube175" castShadow receiveShadow geometry={nodes.Cube175.geometry} material={materials.tree_branch} />
          <mesh name="Cube175_1" castShadow receiveShadow geometry={nodes.Cube175_1.geometry} material={materials.tree_green} />
          <mesh name="Cube175_2" castShadow receiveShadow geometry={nodes.Cube175_2.geometry} material={materials.tree_green_2} />
        </group>
        <group name="tree7" position={[41.74, 2.86, -27.83]} rotation={[0, -0.34, 0]} scale={1.08}>
          <mesh name="Cube176" castShadow receiveShadow geometry={nodes.Cube176.geometry} material={materials.tree_branch} />
          <mesh name="Cube176_1" castShadow receiveShadow geometry={nodes.Cube176_1.geometry} material={materials.tree_green} />
          <mesh name="Cube176_2" castShadow receiveShadow geometry={nodes.Cube176_2.geometry} material={materials.tree_green_2} />
        </group>
        <group name="tree3" position={[47.24, 3.95, 29.79]} rotation={[0, 1.35, 0]}>
          <mesh name="Cube177" castShadow receiveShadow geometry={nodes.Cube177.geometry} material={materials.tree_branch} />
          <mesh name="Cube177_1" castShadow receiveShadow geometry={nodes.Cube177_1.geometry} material={materials.tree_green} />
          <mesh name="Cube177_2" castShadow receiveShadow geometry={nodes.Cube177_2.geometry} material={materials.tree_green_2} />
        </group>
        <group name="tree2" position={[47.38, 4.45, 35.16]}>
          <mesh name="Cube178" castShadow receiveShadow geometry={nodes.Cube178.geometry} material={materials.tree_branch} />
          <mesh name="Cube178_1" castShadow receiveShadow geometry={nodes.Cube178_1.geometry} material={materials.tree_green} />
          <mesh name="Cube178_2" castShadow receiveShadow geometry={nodes.Cube178_2.geometry} material={materials.tree_green_2} />
        </group>
        <group name="tree4" position={[47.49, 4.83, -15.93]} rotation={[-Math.PI, 1.25, -Math.PI]}>
          <mesh name="Cube180" castShadow receiveShadow geometry={nodes.Cube180.geometry} material={materials.tree_branch} />
          <mesh name="Cube180_1" castShadow receiveShadow geometry={nodes.Cube180_1.geometry} material={materials.tree_green_2} />
          <mesh name="Cube180_2" castShadow receiveShadow geometry={nodes.Cube180_2.geometry} material={materials.tree_green} />
        </group>
        <group name="tree6" position={[47.66, 4.73, -26.53]} rotation={[-0.33, -0.19, 0.17]} scale={1.13}>
          <mesh name="Icosphere014" castShadow receiveShadow geometry={nodes.Icosphere014.geometry} material={materials.tree_branch} />
          <mesh name="Icosphere014_1" castShadow receiveShadow geometry={nodes.Icosphere014_1.geometry} material={materials.tree_green} />
          <mesh name="Icosphere014_2" castShadow receiveShadow geometry={nodes.Icosphere014_2.geometry} material={materials.tree_green_2} />
        </group>
        <group name="tree1" position={[47.38, 4.15, 40.25]} rotation={[-1.37, -0.23, -0.55]} scale={0.91}>
          <mesh name="Icosphere018" castShadow receiveShadow geometry={nodes.Icosphere018.geometry} material={materials.tree_green} />
          <mesh name="Icosphere018_1" castShadow receiveShadow geometry={nodes.Icosphere018_1.geometry} material={materials.tree_green_2} />
          <mesh name="Icosphere018_2" castShadow receiveShadow geometry={nodes.Icosphere018_2.geometry} material={materials.tree_branch} />
        </group>
        <mesh name="billboard" castShadow receiveShadow geometry={nodes.billboard.geometry} material={materials.dark_metal_frame} position={[52.25, 4.43, 10.49]} scale={[0.11, 1.78, 3.03]} />
        <group name="Bus_animated" position={[58.17, 2.06, 45.89]} rotation={[-Math.PI, 0, -Math.PI]} scale={[1.17, 1.35, 1.23]}>
          <mesh name="Cube006" castShadow receiveShadow geometry={nodes.Cube006.geometry} material={materials['black.006']} />
          <mesh name="Cube006_1" castShadow receiveShadow geometry={nodes.Cube006_1.geometry} material={materials.light_blue} />
          <mesh name="Cube006_2" castShadow receiveShadow geometry={nodes.Cube006_2.geometry} material={materials.window} />
          <mesh name="Cube006_3" castShadow receiveShadow geometry={nodes.Cube006_3.geometry} material={materials['headlights.004']} />
          <mesh name="Cube006_4" castShadow receiveShadow geometry={nodes.Cube006_4.geometry} material={materials.taillights} />
          <mesh name="Cube006_5" castShadow receiveShadow geometry={nodes.Cube006_5.geometry} material={materials.metal} />
          {audioPlaying && <PositionalAudio
            url='/audio/car-passing1.mp3'
            distance={4}
            autoplay
            loop
          />}
        </group>
        <mesh name="runway_lights_white" castShadow receiveShadow geometry={nodes.runway_lights_white.geometry} material={materials.emissive_white} position={[-62.03, 0.99, 4.94]} scale={[67.28, 48.07, 48.07]} />




        <mesh name="billboardLCD" castShadow receiveShadow geometry={nodes.billboardLCD.geometry} material={materials.mainScreen} position={[52.43, 4.43, 10.43]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={3.32} ref={billboardLCDRef} />
        <mesh name="infoLCD2" castShadow receiveShadow geometry={nodes.infoLCD2.geometry} material={nodes.infoLCD2.material}  >
          <meshBasicMaterial map={infoLCD2Video} toneMapped={false} />
        </mesh>
        <mesh name="infoLCD1" castShadow receiveShadow geometry={nodes.infoLCD1.geometry} material={materials.aboutMePage} position={[29.41, 3.94, 20.57]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={[1.6, 2.83, 3.02]} onClick={handleClickArea} />
        <group name="sign_post" position={[51.59, 3.25, -2.9]} scale={[0.33, 0.1, 0.33]}>
          <mesh name="Cube011" castShadow receiveShadow geometry={nodes.Cube011.geometry} material={materials.metal} />
          <mesh name="Cube011_1" castShadow receiveShadow geometry={nodes.Cube011_1.geometry} material={materials.airplane_dark_blue} />
        </group>
        <group name="straight_taxi" position={[58.15, 200, 46.47]} rotation={[Math.PI, 0, Math.PI]} scale={0.93}>
          <mesh name="Cube003" castShadow receiveShadow geometry={nodes.Cube003.geometry} material={materials.window} />
          <mesh name="Cube003_1" castShadow receiveShadow geometry={nodes.Cube003_1.geometry} material={materials['headlights.004']} />
          <mesh name="Cube003_2" castShadow receiveShadow geometry={nodes.Cube003_2.geometry} material={materials['taxi_yellow.002']} />
          <mesh name="Cube003_3" castShadow receiveShadow geometry={nodes.Cube003_3.geometry} material={materials['Material.002']} />
          <mesh name="Cube003_4" castShadow receiveShadow geometry={nodes.Cube003_4.geometry} material={materials['black.006']} />
          <mesh name="Cube003_5" castShadow receiveShadow geometry={nodes.Cube003_5.geometry} material={materials.metal} />
          <mesh name="Cube003_6" castShadow receiveShadow geometry={nodes.Cube003_6.geometry} material={materials.taillights} />
          <mesh name="Cube003_7" castShadow receiveShadow geometry={nodes.Cube003_7.geometry} material={materials.taxi_sign} />
          {audioPlaying && <PositionalAudio
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
        <mesh name="signPostArrivalText" castShadow receiveShadow geometry={nodes.signPostArrivalText.geometry} material={materials.emissive_white} position={[51.37, 3.6, -2.99]} rotation={[Math.PI / 2, 0, Math.PI]} scale={0.32} />
        <mesh name="signPostDepartureText" castShadow receiveShadow geometry={nodes.signPostDepartureText.geometry} material={materials.emissive_white} position={[51.43, 3.26, -2.99]} rotation={[Math.PI / 2, 0, Math.PI]} scale={0.31} />
        <mesh name="signPostArrivalSign" castShadow receiveShadow geometry={nodes.signPostArrivalSign.geometry} material={materials.emissive_white} position={[51.9, 3.54, -2.99]} rotation={[Math.PI / 2, 0.56, 0]} scale={[0.29, 0.29, 0.02]} />
        <mesh name="signPostDepartureSign" castShadow receiveShadow geometry={nodes.signPostDepartureSign.geometry} material={materials.emissive_white} position={[51.89, 3.23, -2.99]} rotation={[Math.PI / 2, -0.47, 0]} scale={[0.29, 0.29, 0.02]} />
        <mesh name="runway_lights_red" castShadow receiveShadow geometry={nodes.runway_lights_red.geometry} material={materials.siren_red} position={[-32.59, 0.99, 47.24]} scale={[67.28, 48.07, 48.07]} />
        <mesh name="runway_lights_green" castShadow receiveShadow geometry={nodes.runway_lights_green.geometry} material={materials.green_light} position={[-32.57, 0.99, -35.33]} scale={[67.28, 48.07, 48.07]} />
        <group name="speedLimitSign1" position={[52.21, 2.84, -19.39]}>
          <mesh name="Cylinder002" castShadow receiveShadow geometry={nodes.Cylinder002.geometry} material={materials.exterior_white} />
          <mesh name="Cylinder002_1" castShadow receiveShadow geometry={nodes.Cylinder002_1.geometry} material={materials.RED} />
          <mesh name="Cylinder002_2" castShadow receiveShadow geometry={nodes.Cylinder002_2.geometry} material={materials.metal} />
          <mesh name="Cylinder002_3" castShadow receiveShadow geometry={nodes.Cylinder002_3.geometry} material={materials['black.006']} />
        </group>
        <group name="speedLimitSign2" position={[60.29, 2.94, 15.94]} rotation={[-Math.PI, 0, -Math.PI]}>
          <mesh name="Cylinder003" castShadow receiveShadow geometry={nodes.Cylinder003.geometry} material={materials.exterior_white} />
          <mesh name="Cylinder003_1" castShadow receiveShadow geometry={nodes.Cylinder003_1.geometry} material={materials.RED} />
          <mesh name="Cylinder003_2" castShadow receiveShadow geometry={nodes.Cylinder003_2.geometry} material={materials.metal} />
          <mesh name="Cylinder003_3" castShadow receiveShadow geometry={nodes.Cylinder003_3.geometry} material={materials['black.006']} />
        </group>
        <group name="radar" position={[15.54, 34.28, -27.27]} rotation={[0.06, 0, 0]} scale={0.86}>
          <mesh name="Cube010" castShadow receiveShadow geometry={nodes.Cube010.geometry} material={materials.radar_red} />
          <mesh name="Cube010_1" castShadow receiveShadow geometry={nodes.Cube010_1.geometry} material={materials.radar_white} />
          {audioPlaying && <PositionalAudio
            url={'/audio/radar.mp3'}
            distance={8}
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

        <mesh name="cplusplus" castShadow receiveShadow geometry={nodes.cplusplus.geometry} material={materials.css_blue2} position={[-40.76, 200, 1.42]} rotation={[-Math.PI / 2, -1.37, 0]} scale={[0.2, 0.45, 0.2]} />
        <group name="python" position={[-40.78, 1500, 1.5]} rotation={[Math.PI / 2, 0, 0]} scale={[51.58, 111.2, 51.58]}>
          <mesh name="Curve001" castShadow receiveShadow geometry={nodes.Curve001.geometry} material={materials['SVGMat.002']} />
          <mesh name="Curve001_1" castShadow receiveShadow geometry={nodes.Curve001_1.geometry} material={materials['SVGMat.001']} />
        </group>
        <group name="javascript" position={[-40.76, 1500, 1.42]} scale={[0.13, 0.21, 0.17]}>
          <mesh name="Cube008" castShadow receiveShadow geometry={nodes.Cube008.geometry} material={materials.js_yellow} />
          <mesh name="Cube008_1" castShadow receiveShadow geometry={nodes.Cube008_1.geometry} material={materials.js_yellow2} />
          <mesh name="Cube008_2" castShadow receiveShadow geometry={nodes.Cube008_2.geometry} material={materials.icon_white} />
        </group>
        <group name="css" position={[-40.76, 1500, 1.42]} scale={[0.14, 0.21, 0.17]}>
          <mesh name="Cube237" castShadow receiveShadow geometry={nodes.Cube237.geometry} material={materials.css_blue} />
          <mesh name="Cube237_1" castShadow receiveShadow geometry={nodes.Cube237_1.geometry} material={materials.css_blue2} />
          <mesh name="Cube237_2" castShadow receiveShadow geometry={nodes.Cube237_2.geometry} material={materials.icon_white} />
        </group>
        <group name="html" position={[-40.7, 1500, 1.42]} scale={[0.14, 0.21, 0.17]}>
          <mesh name="Cube239" castShadow receiveShadow geometry={nodes.Cube239.geometry} material={materials.icon_white} />
          <mesh name="Cube239_1" castShadow receiveShadow geometry={nodes.Cube239_1.geometry} material={materials.html_red} />
          <mesh name="Cube239_2" castShadow receiveShadow geometry={nodes.Cube239_2.geometry} material={materials.html_Red2} />
        </group>
        <group name="threeJS" position={[-40.63, 1500, 1.46]} scale={0.28}>
          <mesh name="Cone004" castShadow receiveShadow geometry={nodes.Cone004.geometry} material={materials.icon_white} />
          <mesh name="Cone004_1" castShadow receiveShadow geometry={nodes.Cone004_1.geometry} material={materials['black.006']} />
        </group>
        <mesh name="nodeJS" castShadow receiveShadow geometry={nodes.nodeJS.geometry} material={materials.nodeGreen} position={[-40.7, 200, 1.42]} rotation={[Math.PI / 2, 0, 0]} scale={[0.72, 0.88, 0.72]} />
        <mesh name="react" castShadow receiveShadow geometry={nodes.react.geometry} material={materials.react} position={[-40.8, 200, 1.49]} rotation={[0, -0.61, -Math.PI / 2]} scale={0.71} />
        <group name="gatsby" position={[-40.74, 200, 1.44]} rotation={[Math.PI / 2, 0, 0]} scale={0.64}>
          <mesh name="Curve003" castShadow receiveShadow geometry={nodes.Curve003.geometry} material={materials.icon_white} />
          <mesh name="Curve003_1" castShadow receiveShadow geometry={nodes.Curve003_1.geometry} material={materials.gatsbyPurple} />
        </group>
        <mesh name="Suzanne" castShadow receiveShadow geometry={nodes.Suzanne.geometry} material={materials.blender_orange} position={[-40.68, 200, 1.45]} rotation={[-0.36, -0.12, 0.31]} scale={0.22} />

        <group name="revolvingDoor" position={[27.65, 2.67, 10.48]} scale={[67.28, 48.07, 48.07]}>
          <mesh name="Plane003" castShadow receiveShadow geometry={nodes.Plane003.geometry} material={materials.dark_metal_frame} />
          <mesh name="Plane003_1" castShadow receiveShadow geometry={nodes.Plane003_1.geometry} material={materials.dark_glass} />
          {audioPlaying && <PositionalAudio
            url='/audio/airport-ambiance.mp3'
            distance={100}
            autoplay
            loop
          />}
        </group>
        <mesh name="infoDisplay2" castShadow receiveShadow geometry={nodes.infoDisplay2.geometry} material={materials.dark_metal_frame} position={[29.35, 4.43, -0.29]} scale={[0.11, 0.96, 3.03]} />
        <mesh name="infoDisplay1" castShadow receiveShadow geometry={nodes.infoDisplay1.geometry} material={materials.dark_metal_frame} position={[29.25, 3.69, 20.61]} scale={[0.08, 1.62, 1.51]} ref={aboutMeScreenRef} />
      </group>
    </group>
  )
}

useGLTF.preload('./models/cars/scene-transformed.glb')
