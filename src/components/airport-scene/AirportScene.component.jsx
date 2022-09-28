import React, { useRef, useEffect, useState } from 'react'
import { useGLTF, useAnimations, useVideoTexture, PositionalAudio, Stats } from '@react-three/drei'

import { useFrame, useThree } from '@react-three/fiber';

import { Vector3 } from 'three';
import { useKeyState } from 'use-key-state'
import Skills from '../overlay/skills/Skills.component';
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

  const billboardLCDRef = useRef(null)
  const creditsAreaRef = useRef(null)

  const jetEngineSoundRef = useRef(null)

  const { nodes, materials, animations } = useGLTF('./models/cars/scene-transformed.glb')
  const { actions } = useAnimations(animations, group)
  const { esc } = useKeyState({ esc: "esc" })
  const animationsList = ['threeJsAnimate', 'pythonAnimate', 'cssAnimate', 'cppAnimate', 'javascriptAnimate', 'htmlAnimate', 'nodeJSAnimate', 'reactAnimate', 'gatsbyAnimate', 'SuzanneAction']
  const infoLCD2Video = useVideoTexture("/videos/videoplayback.mp4")
  
  // play main animations 
  useEffect(() => {
    infoLCD2Video.flipY = false
    Object.keys(actions).forEach((key) => {
      if (!animationsList.includes(key)) {
        actions[key].play()
      }
    })
  }, [])

<<<<<<< HEAD



=======
>>>>>>> 8ef39b3 (fix for skills animations performance pitfall)
  // const angleToRadians = (ang) => (Math.PI / 180) * ang

  // set the light references
  useEffect(() => {
    scene.add(lightRef1.current.target)
    scene.add(lightRef2.current.target)
    scene.add(lightRef3.current.target)
    scene.add(lightRef4.current.target)
    scene.add(lightRef5.current.target)

    scene.add(targetRef1.current)
    scene.add(targetRef2.current)
    scene.add(targetRef3.current)
    scene.add(targetRef4.current)
    scene.add(targetRef5.current)

    lightRef1.current.target = targetRef1.current
    lightRef2.current.target = targetRef2.current
    lightRef3.current.target = targetRef3.current
    lightRef4.current.target = targetRef4.current
    lightRef5.current.target = targetRef5.current

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
  const aboutMeScreenVectorPC = new Vector3(33, 3.97, 20.6)
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
        camera.position.lerp(aboutMeScreenVector,0.05)


      } else {
        camera.position.lerp(aboutMeScreenVectorPC, 0.05)

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
      camera.position.lerp(skillsScreenVector, 0.1)

    }
  })
  
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



  // activate skills animation when skills area is clicked/ stop it otherwise
  useEffect(()=>{
    if(skillsClicked){
      animationsList.forEach(key => {
        actions[key].play()
      })
    }else{
      animationsList.forEach(key => {
        actions[key].stop()

      })
    }
  },[skillsClicked])


  // when credits is clicked
  useFrame(({ camera }) => {
    if (creditsClicked) {
      camera.lookAt(creditsAreaRef.current.position)
      camera.position.lerp(creditsScreenVector, 0.08)
    }
  })

  // when projects is clicked
  useFrame(({ camera }) => {
    if (projectsScreenRef.current) {
      if (projectsClicked) {
        camera.lookAt(projectsScreenRef.current.position)
        camera.position.lerp(projectsScreenVector, 0.05)
      }
    }

  })


  const switchToMainScreen = () => {

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
        switchToMainScreen()

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
      camera.position.lerp(mainScreenVector,0.05)

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
      setProjectsClicked(false)
      setAboutMeClicked(false)
      setCreditsClicked(false)
      setSkillsClicked(false)
      return setExitFocusClicked(true)
    }

  }

  const angleToRadians = (angle)=>(angle/180) * Math.PI

  return (
    <group ref={group} {...props} dispose={null} >
      <Stats />
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

        <group name="spotlight5" position={[59.6, 5.61, 44.36]} rotation={[0, 0, -0.07]} >
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


        <mesh name="lightPost1"  geometry={nodes.lightPost1.geometry} material={materials['black.006']} position={[59.47, 1.15, 48.16]}  />
        <mesh name="lightPost2"  geometry={nodes.lightPost2.geometry} material={materials['black.006']} position={[59.47, 1.15, 29.87]}  />
        <mesh name="lightPost3"  geometry={nodes.lightPost3.geometry} material={materials['black.006']} position={[60.23, 4.65, 4.56]}  />
        <mesh name="lightPost4"  geometry={nodes.lightPost4.geometry} material={materials['black.006']} position={[60.23, 4.65, -14.83]}  />
        <mesh name="lightPost5"  geometry={nodes.lightPost5.geometry} material={materials['black.006']} position={[60.23, 4.65, -33.8]}  />


        <mesh name="linkedinArea"  geometry={nodes.linkedinArea.geometry} material={nodes.linkedinArea.material} position={[52.35, 4.26, 8.5]} visible={false} onClick={handleClickArea} />
        <mesh name="aboutmeArea"  geometry={nodes.aboutmeArea.geometry} material={nodes.aboutmeArea.material} position={[52.35, 4.26, 12.32]} visible={false} onClick={handleClickArea} />
        <mesh name="projectsArea"  geometry={nodes.projectsArea.geometry} material={nodes.projectsArea.material} position={[52.35, 4.26, 10.97]}  visible={false} onClick={handleClickArea} />

        <mesh name="skillsArea"  geometry={nodes.skillsArea.geometry} material={nodes.skillsArea.material} position={[52.35, 4.26, 9.71]}  visible={false} onClick={handleClickArea} />
        <mesh name="returnArea"  geometry={nodes.returnArea.geometry} material={nodes.returnArea.material} position={[52.4, 3.05, 10.4]} onClick={handleClickArea} visible={false} />
        <mesh name="returnArea2"  geometry={nodes.returnArea2.geometry} material={nodes.returnArea2.material} position={[29.4, 3.05, 19.54]}  onClick={handleClickArea} visible={false} />


        <mesh name="spotlightTarget3"  geometry={nodes.spotlightTarget3.geometry} material={nodes.spotlightTarget3.material} position={[56.81, 1.05, 4.66]}  ref={targetRef3} visible={false} />
        <mesh name="spotlightTarget2"  geometry={nodes.spotlightTarget2.geometry} material={nodes.spotlightTarget2.material} position={[56.81, 1.05, -14.44]}  ref={targetRef2} visible={false} />
        <mesh name="spotLightTarget1"  geometry={nodes.spotLightTarget1.geometry} material={nodes.spotLightTarget1.material} position={[56.81, 1.05, -33.64]}  ref={targetRef1} visible={false} />
        <mesh name="spotlightTarget4"  geometry={nodes.spotlightTarget4.geometry} material={nodes.spotlightTarget4.material} position={[56.81, 1.05, 26.35]}  ref={targetRef4} visible={false} />
        <mesh name="spotlightTarget5"  geometry={nodes.spotlightTarget5.geometry} material={nodes.spotlightTarget5.material} position={[56.81, 1.05, 44.3]}  ref={targetRef5} visible={false} />
        <StaticItems />
        <group name="engine2" position={[-38.5, 3.02, 14.62]} rotation={[Math.PI / 2, 0, 0]} ref={projectsScreenRef}>
          <mesh name="Cone003"  geometry={nodes.Cone003.geometry} material={materials['black.006']} />
          <mesh name="Cone003_1"  geometry={nodes.Cone003_1.geometry} material={materials.metal} />
          {projectsClicked &&
            <HtmlContainer
              center
            >
              <Projects exitFocus={switchToMainScreen} />
            </HtmlContainer>

          }

        </group>

        <group name="airplane" position={[-32.6, 5.02, 8.14]}  >
          <mesh name="Cube034"  geometry={nodes.Cube034.geometry} material={materials.airplane_white} />
          <mesh name="Cube034_1"  geometry={nodes.Cube034_1.geometry} material={materials.airplane_dark_blue} />
          <mesh name="Cube034_2"  geometry={nodes.Cube034_2.geometry} material={materials.metal} />
          <mesh name="Cube034_3"  geometry={nodes.Cube034_3.geometry} material={materials.airplane_interior_lights} />
          <mesh name="Cube034_4"  geometry={nodes.Cube034_4.geometry} material={materials['black.006']} />
          <mesh name="Cube034_5"  geometry={nodes.Cube034_5.geometry} material={materials['metal_frame.002']} />
          <mesh name="Cube034_6"  geometry={nodes.Cube034_6.geometry} material={materials['headlights.004']} />
          {tabInUse && <PositionalAudio
            url='/audio/jet-idle.mp3'
            distance={0.8}
            autoplay
            loop
            ref={jetEngineSoundRef}
          />}
        </group>

        <group name="police_car" position={[58.08, 200, 46.56]} >
          <mesh name="Cube001"  geometry={nodes.Cube001.geometry} material={materials['black.006']} />
          <mesh name="Cube001_1"  geometry={nodes.Cube001_1.geometry} material={materials['Material.002']} />
          <mesh name="Cube001_2"  geometry={nodes.Cube001_2.geometry} material={materials.window} />
          <mesh name="Cube001_3"  geometry={nodes.Cube001_3.geometry} material={materials['headlights.004']} />
          <mesh name="Cube001_4"  geometry={nodes.Cube001_4.geometry} material={materials.taillights} />
          <mesh name="Cube001_5"  geometry={nodes.Cube001_5.geometry} material={materials['metal_frame.002']} />
          <mesh name="Cube001_6"  geometry={nodes.Cube001_6.geometry} material={materials.siren_blue} />
          <mesh name="Cube001_7"  geometry={nodes.Cube001_7.geometry} material={materials.siren_red} />
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

        <group name="turningTaxi" position={[54.24, 1.47, -34.57]} >
          <mesh name="Cube039"  geometry={nodes.Cube039.geometry} material={materials['taxi_yellow.002']} />
          <mesh name="Cube039_1"  geometry={nodes.Cube039_1.geometry} material={materials['Material.002']} />
          <mesh name="Cube039_2"  geometry={nodes.Cube039_2.geometry} material={materials.window} />
          <mesh name="Cube039_3"  geometry={nodes.Cube039_3.geometry} material={materials['headlights.004']} />
          <mesh name="Cube039_4"  geometry={nodes.Cube039_4.geometry} material={materials['black.006']} />
          <mesh name="Cube039_5"  geometry={nodes.Cube039_5.geometry} material={materials.metal} />
          <mesh name="Cube039_6"  geometry={nodes.Cube039_6.geometry} material={materials.taillights} />
          <mesh name="Cube039_7"  geometry={nodes.Cube039_7.geometry} material={materials.taxi_sign} />
          {/* props.ready can be used only once. the browser only needs to know if the user interaction triggered the sound */}
          {props.ready && tabInUse && <PositionalAudio
            url='/audio/car-passing1.mp3'
            distance={3}
            autoplay
            loop
          />}
        </group>

        <group name="redMovingCar" position={[54.49, 200, -34.77]} rotation={[0,angleToRadians(180),0 ]} >
          <mesh name="Cube041"  geometry={nodes.Cube041.geometry} material={materials['headlights.004']} />
          <mesh name="Cube041_1"  geometry={nodes.Cube041_1.geometry} material={materials.firefighter_red} />
          <mesh name="Cube041_2"  geometry={nodes.Cube041_2.geometry} material={materials.window} />
          <mesh name="Cube041_3"  geometry={nodes.Cube041_3.geometry} material={materials.taillights} />
          <mesh name="Cube041_4"  geometry={nodes.Cube041_4.geometry} material={materials['black.006']} />
          <mesh name="Cube041_5"  geometry={nodes.Cube041_5.geometry} material={materials.metal} />

          {tabInUse && <PositionalAudio
            url='/audio/car-passing2.mp3'
            distance={2}
            autoplay
            loop
          />}
        </group>

        <group name="blueMovingCar" position={[54.27, 200, -34.58]} rotation={[0,angleToRadians(180),0 ]} >
          <mesh name="Cube043"  geometry={nodes.Cube043.geometry} material={materials['headlights.004']} />
          <mesh name="Cube043_1"  geometry={nodes.Cube043_1.geometry} material={materials['black.006']} />
          <mesh name="Cube043_2"  geometry={nodes.Cube043_2.geometry} material={materials['metal_frame.002']} />
          <mesh name="Cube043_3"  geometry={nodes.Cube043_3.geometry} material={materials.taillights} />
          <mesh name="Cube043_4"  geometry={nodes.Cube043_4.geometry} material={materials.DARK_BLUE} />
          <mesh name="Cube043_5"  geometry={nodes.Cube043_5.geometry} material={materials.window} />

          {tabInUse && <PositionalAudio
            url='/audio/car-passing1.mp3'
            distance={2}
            autoplay
            loop
          />}
        </group>

        <group name="tree3" position={[47.24, 3.95, 29.79]} >
          <mesh name="Cube177"  geometry={nodes.Cube177.geometry} material={materials.tree_branch} />
          <mesh name="Cube177_1"  geometry={nodes.Cube177_1.geometry} material={materials.tree_green} />
          <mesh name="Cube177_2"  geometry={nodes.Cube177_2.geometry} material={materials.tree_green_2} />
          {tabInUse && <PositionalAudio
            url='/audio/cricket.mp3'
            distance={1.5}
            autoplay
            loop
          />}
        </group>

        <mesh name="billboard"  geometry={nodes.billboard.geometry} material={materials.dark_metal_frame} position={[52.25, 4.43, 10.49]}  />
        <group name="Bus_animated" position={[58.17, 2.06, 45.89]} >
          <mesh name="Cube006"  geometry={nodes.Cube006.geometry} material={materials['black.006']} />
          <mesh name="Cube006_1"  geometry={nodes.Cube006_1.geometry} material={materials.light_blue} />
          <mesh name="Cube006_2"  geometry={nodes.Cube006_2.geometry} material={materials.window} />
          <mesh name="Cube006_3"  geometry={nodes.Cube006_3.geometry} material={materials['headlights.004']} />
          <mesh name="Cube006_4"  geometry={nodes.Cube006_4.geometry} material={materials.taillights} />
          <mesh name="Cube006_5"  geometry={nodes.Cube006_5.geometry} material={materials.metal} />

          {tabInUse && <PositionalAudio
            url='/audio/car-passing1.mp3'
            distance={4}
            autoplay
            loop
          />}
        </group>

        <mesh name="billboardLCD"  geometry={nodes.billboardLCD.geometry} material={materials.mainScreen} position={[52.43, 4.43, 10.43]}  ref={billboardLCDRef} />
        <mesh name="infoLCD2"  geometry={nodes.infoLCD2.geometry} material={nodes.infoLCD2.material} position={[29.53, 4.43, -0.36]}  >
          <meshBasicMaterial map={infoLCD2Video} toneMapped={true} />
        </mesh>
        <mesh name="infoLCD1"  geometry={nodes.infoLCD1.geometry} material={materials.aboutMePage} position={[29.41, 3.94, 20.57]} onClick={handleClickArea} />

        <group name="straight_taxi" position={[58.15, 200, 46.47]}  >
          <mesh name="Cube003"  geometry={nodes.Cube003.geometry} material={materials.window} />
          <mesh name="Cube003_1"  geometry={nodes.Cube003_1.geometry} material={materials['headlights.004']} />
          <mesh name="Cube003_2"  geometry={nodes.Cube003_2.geometry} material={materials['taxi_yellow.002']} />
          <mesh name="Cube003_3"  geometry={nodes.Cube003_3.geometry} material={materials['Material.002']} />
          <mesh name="Cube003_4"  geometry={nodes.Cube003_4.geometry} material={materials['black.006']} />
          <mesh name="Cube003_5"  geometry={nodes.Cube003_5.geometry} material={materials.metal} />
          <mesh name="Cube003_6"  geometry={nodes.Cube003_6.geometry} material={materials.taillights} />
          <mesh name="Cube003_7"  geometry={nodes.Cube003_7.geometry} material={materials.taxi_sign} />

          {tabInUse && <PositionalAudio
            url='/audio/car-passing2.mp3'
            distance={2}
            autoplay
            loop
          />}
        </group>
        <group name="creditsArea" position={[51.65, 3.86, -2.85]} onClick={handleClickArea} ref={creditsAreaRef}>
          <mesh name="Cube014"  geometry={nodes.Cube014.geometry} material={materials.airplane_dark_blue} />
          <mesh name="Cube014_1"  geometry={nodes.Cube014_1.geometry} material={materials.emissive_white} />
          {creditsClicked && <HtmlContainer center>
            <Credits exitFocus={switchToMainScreen} />
          </HtmlContainer>}

        </group>

        <group name="radar" position={[15.54, 34.28, -27.27]}   >
          <mesh name="Cube010"  geometry={nodes.Cube010.geometry} material={materials.radar_red} />
          <mesh name="Cube010_1"  geometry={nodes.Cube010_1.geometry} material={materials.radar_white} />

          {tabInUse && <PositionalAudio
            url={'/audio/radar.mp3'}
            distance={2}
            autoplay
            loop
          />}
        </group>

        <group name="conveyor-truck" position={[-37.06, 2.21, 1.08]} ref={skillsScreenRef} >
          <mesh name="Cube009"  geometry={nodes.Cube009.geometry} material={materials['airplane_white.001']} />
          <mesh name="Cube009_1"  geometry={nodes.Cube009_1.geometry} material={materials.window} />
          <mesh name="Cube009_2"  geometry={nodes.Cube009_2.geometry} material={materials['headlights.004']} />
          <mesh name="Cube009_3"  geometry={nodes.Cube009_3.geometry} material={materials.orange} />
          <mesh name="Cube009_4"  geometry={nodes.Cube009_4.geometry} material={materials.taillights} />
          <mesh name="Cube009_5"  geometry={nodes.Cube009_5.geometry} material={materials['black.006']} />
          <mesh name="Cube009_6"  geometry={nodes.Cube009_6.geometry} material={materials['metal_frame.002']} />
          {skillsClicked &&
            <HtmlContainer center >
              <Skills exitFocus={switchToMainScreen} />
            </HtmlContainer>

          }


        </group>

        <group name="revolvingDoor" position={[27.65, 2.67, 10.48]} >
          <mesh name="Plane003"  geometry={nodes.Plane003.geometry} material={materials.dark_metal_frame} />
          <mesh name="Plane003_1"  geometry={nodes.Plane003_1.geometry} material={materials.dark_glass} />

          {tabInUse && <PositionalAudio
            url='/audio/airport-ambiance.mp3'
            distance={100}
            autoplay
            loop
          />}
        </group>
        <mesh name="infoDisplay1"  geometry={nodes.infoDisplay1.geometry} material={materials.dark_metal_frame} position={[29.25, 3.69, 20.61]}  ref={aboutMeScreenRef} />
        {/* <group name="infoDisplay1" ref={aboutMeScreenRef} >
          <mesh name="Cube068" geometry={nodes.Cube068.geometry} material={materials.dark_metal_frame} />
          <mesh name="Cube068_1" geometry={nodes.Cube068_1.geometry} material={materials.emissive_white} />
          <mesh name="Cube068_2" geometry={nodes.Cube068_2.geometry} material={materials.css_blue2} />
        </group> */}
      </group>
    </group>
  )
}

useGLTF.preload('./models/cars/scene-transformed.glb')
