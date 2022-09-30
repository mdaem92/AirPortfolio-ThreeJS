import React, { useRef, useEffect, useState } from 'react'
import { useGLTF, useAnimations, PositionalAudio } from '@react-three/drei'

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
import NewStaticItems from '../new-static-items/NewStaticItems.component';


export const NewAirportScene = (props) => {

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

    const { nodes, materials, animations } = useGLTF('./models/scene/scene-transformed.glb')
    const { actions } = useAnimations(animations, group)
    const { esc } = useKeyState({ esc: "esc" })
    const animationsList = ['threeJsAnimate', 'pythonAnimate', 'cssAnimate', 'cppAnimate', 'javascriptAnimate', 'htmlAnimate', 'nodeJSAnimate', 'reactAnimate', 'gatsbyAnimate', 'SuzanneAction']

    // play main animations 
    useEffect(() => {
        // infoLCD2Video.playsInline=true
        // infoLCD2Video.flipY = false

        Object.keys(actions).forEach((key) => {
            if (!animationsList.includes(key)) {
                actions[key].play()
            }
        })
    }, [])

    // const angleToRadians = (ang) => (Math.PI / 180) * ang

    // set the light references
    useEffect(() => {
        if (lightRef1.current) {
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
        }


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





    // // returns the current screen width
    const width = useWindowWidth()

    // when about me is clicked
    useFrame(({ camera }) => {
        if (aboutMeclicked) {
            camera.lookAt(aboutMeScreenRef.current.position)
            if (width < 600) {
                camera.position.lerp(aboutMeScreenVector, 0.05)


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


    // // when skills is clicked
    useFrame(({ camera }) => {
        if (skillsClicked) {
            camera.lookAt(skillsScreenRef.current.position)
            camera.position.lerp(skillsScreenVector, 0.1)

        }
    })

    // activate skills animation when skills area is clicked/ stop it otherwise
    useEffect(() => {
        if (skillsClicked) {
            animationsList.forEach(key => {
                actions[key].play()
            })
        } else {
            animationsList.forEach(key => {
                actions[key].stop()

            })
        }
    }, [skillsClicked])


    // // when credits is clicked
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

    // // when esc is clicked
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
            camera.position.lerp(mainScreenVector, 0.05)

        }
    })

    // // returns true if the current browser tab loses focus
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

    const angleToRadians = (angle) => (angle / 180) * Math.PI
    // // <AudioToggleButton toggleAudio={toggleAudio} audioPlaying={audioPlaying} />

    return (
        <group ref={group} {...props} dispose={null} >
            {/* <Stats /> */}
            <ButtonSoundEffect playing={props.ready && bingPlaying} />
            <group name="Scene">
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
                    <directionalLight name="keyLight_Orientation" intensity={5} color="#38464f" rotation={[-Math.PI / 2, 0, 0]}>
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


                <mesh name="lightPost1" geometry={nodes.lightPost1.geometry} material={materials.SURFACE} position={[59.47, 1.15, 48.16]} />
                <mesh name="lightPost2" geometry={nodes.lightPost2.geometry} material={materials.SURFACE} position={[59.47, 1.15, 29.87]} />
                <mesh name="lightPost3" geometry={nodes.lightPost3.geometry} material={materials.SURFACE} position={[60.23, 4.65, 4.56]} />
                <mesh name="lightPost4" geometry={nodes.lightPost4.geometry} material={materials.SURFACE} position={[60.23, 4.65, -14.83]} />
                <mesh name="lightPost5" geometry={nodes.lightPost5.geometry} material={materials.SURFACE} position={[60.23, 4.65, -33.8]} />


                <mesh name="linkedinArea" geometry={nodes.linkedinArea.geometry} material={nodes.linkedinArea.material} position={[52.35, 4.26, 8.5]} visible={false} onClick={handleClickArea} />
                <mesh name="aboutmeArea" geometry={nodes.aboutmeArea.geometry} material={nodes.aboutmeArea.material} position={[52.35, 4.26, 12.32]} visible={false} onClick={handleClickArea} />
                <mesh name="projectsArea" geometry={nodes.projectsArea.geometry} material={nodes.projectsArea.material} position={[52.35, 4.26, 10.97]} visible={false} onClick={handleClickArea} />

                <mesh name="skillsArea" geometry={nodes.skillsArea.geometry} material={nodes.skillsArea.material} position={[52.35, 4.26, 9.71]} visible={false} onClick={handleClickArea} />
                <mesh name="returnArea" geometry={nodes.returnArea.geometry} material={nodes.returnArea.material} position={[52.4, 3.05, 10.4]} onClick={handleClickArea} visible={false} />
                <mesh name="returnArea2" geometry={nodes.returnArea2.geometry} material={nodes.returnArea2.material} position={[29.4, 3.05, 19.54]} onClick={handleClickArea} visible={false} />


                <mesh name="spotlightTarget3" geometry={nodes.spotlightTarget3.geometry} material={nodes.spotlightTarget3.material} position={[56.81, 1.05, 4.66]} ref={targetRef3} visible={false} />
                <mesh name="spotlightTarget2" geometry={nodes.spotlightTarget2.geometry} material={nodes.spotlightTarget2.material} position={[56.81, 1.05, -14.44]} ref={targetRef2} visible={false} />
                <mesh name="spotLightTarget1" geometry={nodes.spotLightTarget1.geometry} material={nodes.spotLightTarget1.material} position={[56.81, 1.05, -33.64]} ref={targetRef1} visible={false} />
                <mesh name="spotlightTarget4" geometry={nodes.spotlightTarget4.geometry} material={nodes.spotlightTarget4.material} position={[56.81, 1.05, 26.35]} ref={targetRef4} visible={false} />
                <mesh name="spotlightTarget5" geometry={nodes.spotlightTarget5.geometry} material={nodes.spotlightTarget5.material} position={[56.81, 1.05, 44.3]} ref={targetRef5} visible={false} />

                <NewStaticItems />

                <mesh name="engine2" geometry={nodes.engine2.geometry} material={materials.metal_frame} position={[-38.5, 3.02, 14.62]} rotation={[Math.PI / 2, 0, 0]} scale={[1.15, 1.15, 1.15]} ref={projectsScreenRef}>
                    {projectsClicked &&
                        <HtmlContainer
                            center
                        >
                            <Projects exitFocus={switchToMainScreen} />
                        </HtmlContainer>

                    }
                </mesh>


                <group name="airplane" position={[-32.6, 5.02, 8.14]}>
                    <mesh name="Cube034" geometry={nodes.Cube034.geometry} material={materials.airplane_interior_lights} />
                    <mesh name="Cube034_1" geometry={nodes.Cube034_1.geometry} material={materials.metal_frame} />
                    <mesh name="Cube034_2" geometry={nodes.Cube034_2.geometry} material={materials.SURFACE} />
                    {props.ready && tabInUse && <PositionalAudio
                        url='/audio/jet-idle.mp3'
                        distance={0.8}
                        autoplay
                        loop
                        ref={jetEngineSoundRef}
                    />}
                </group>

                <group name="police_car" position={[58.08, 200, 46.56]} >
                    <mesh name="Cube001" geometry={nodes.Cube001.geometry} material={materials.headlights} />
                    <mesh name="Cube001_1" geometry={nodes.Cube001_1.geometry} material={materials.siren_red} />
                    <mesh name="Cube001_2" geometry={nodes.Cube001_2.geometry} material={materials.SURFACE} />
                    <mesh name="Cube001_3" geometry={nodes.Cube001_3.geometry} material={materials.taillights} />
                    <mesh name="Cube001_4" geometry={nodes.Cube001_4.geometry} material={materials.metal_frame} />
                    <mesh name="Cube001_5" geometry={nodes.Cube001_5.geometry} material={materials.siren_blue} />
                    {props.ready && tabInUse && <group>
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
                    <mesh name="Cube039" geometry={nodes.Cube039.geometry} material={materials.headlights} />
                    <mesh name="Cube039_1" geometry={nodes.Cube039_1.geometry} material={nodes.Cube039_1.material} />
                    <mesh name="Cube039_2" geometry={nodes.Cube039_2.geometry} material={materials.taillights} />
                    <mesh name="Cube039_3" geometry={nodes.Cube039_3.geometry} material={materials.taxi_sign} />
                    <mesh name="Cube039_4" geometry={nodes.Cube039_4.geometry} material={materials.SURFACE} />
                    {props.ready && tabInUse && <PositionalAudio
                        url='/audio/car-passing1.mp3'
                        distance={3}
                        autoplay
                        loop
                    />}
                </group>

                <group name="redMovingCar" position={[54.49, 200, -34.77]}  >
                    <mesh name="Cube004" geometry={nodes.Cube004.geometry} material={materials.headlights} />
                    <mesh name="Cube004_1" geometry={nodes.Cube004_1.geometry} material={materials.taillights} />
                    <mesh name="Cube004_2" geometry={nodes.Cube004_2.geometry} material={materials.metal_frame} />
                    <mesh name="Cube004_3" geometry={nodes.Cube004_3.geometry} material={materials.SURFACE} />

                    {props.ready && tabInUse && <PositionalAudio
                        url='/audio/car-passing2.mp3'
                        distance={2}
                        autoplay
                        loop
                    />}
                </group>

                <group name="blueMovingCar" position={[54.27, 200, -34.58]}  >
                    <mesh name="Cube007" geometry={nodes.Cube007.geometry} material={materials.headlights} />
                    <mesh name="Cube007_1" geometry={nodes.Cube007_1.geometry} material={materials.metal_frame} />
                    <mesh name="Cube007_2" geometry={nodes.Cube007_2.geometry} material={materials.taillights} />
                    <mesh name="Cube007_3" geometry={nodes.Cube007_3.geometry} material={materials.SURFACE} />

                    {props.ready && tabInUse && <PositionalAudio
                        url='/audio/car-passing1.mp3'
                        distance={2}
                        autoplay
                        loop
                    />}
                </group>

                <mesh name="tree3" geometry={nodes.tree3.geometry} material={materials.SURFACE} position={[47.24, 3.95, 29.79]}>
                    {props.ready && tabInUse && <PositionalAudio
                        url='/audio/cricket.mp3'
                        distance={1.5}
                        autoplay
                        loop
                    />}
                </mesh>

                <mesh name="billboard" geometry={nodes.billboard.geometry} material={materials.SURFACE} position={[52.25, 4.43, 10.49]} />

                <group name="Bus_animated" position={[58.17, 2.06, 45.89]} >
                    <mesh name="Cube006" geometry={nodes.Cube006.geometry} material={materials.headlights} />
                    <mesh name="Cube006_1" geometry={nodes.Cube006_1.geometry} material={materials.taillights} />
                    <mesh name="Cube006_2" geometry={nodes.Cube006_2.geometry} material={materials.metal_frame} />
                    <mesh name="Cube006_3" geometry={nodes.Cube006_3.geometry} material={materials.SURFACE} />

                    {props.ready && tabInUse && <PositionalAudio
                        url='/audio/car-passing1.mp3'
                        distance={4}
                        autoplay
                        loop
                    />}
                </group>

                <mesh name="billboardLCD" geometry={nodes.billboardLCD.geometry} material={materials.mainScreen} position={[52.43, 4.43, 10.43]} ref={billboardLCDRef} />
                <mesh name="infoLCD2" geometry={nodes.infoLCD2.geometry} material={materials.departuresImage} position={[29.53, 4.43, -0.36]} />

                <mesh name="infoLCD1" geometry={nodes.infoLCD1.geometry} material={materials.aboutMePage} position={[29.41, 3.94, 20.57]} onClick={handleClickArea} />

                <group name="straight_taxi" position={[58.15, 200, 46.47]}  >
                    <mesh name="Cube003" geometry={nodes.Cube003.geometry} material={materials.taillights} />
                    <mesh name="Cube003_1" geometry={nodes.Cube003_1.geometry} material={materials.taxi_sign} />
                    <mesh name="Cube003_2" geometry={nodes.Cube003_2.geometry} material={materials.SURFACE} />
                    <mesh name="Cube003_3" geometry={nodes.Cube003_3.geometry} material={materials.headlights} />
                    <mesh name="Cube003_4" geometry={nodes.Cube003_4.geometry} material={nodes.Cube003_4.material} />

                    {tabInUse && <PositionalAudio
                        url='/audio/car-passing2.mp3'
                        distance={2}
                        autoplay
                        loop
                    />}
                </group>
                <group name="creditsArea" position={[51.65, 3.86, -2.85]} onClick={handleClickArea} ref={creditsAreaRef}>
                    <mesh name="Cube014" geometry={nodes.Cube014.geometry} material={materials.SURFACE} />
                    <mesh name="Cube014_1" geometry={nodes.Cube014_1.geometry} material={materials.emissive_white} />
                    {creditsClicked && <HtmlContainer center>
                        <Credits exitFocus={switchToMainScreen} />
                    </HtmlContainer>}

                </group>

                <group name="radar" position={[15.54, 34.28, -27.27]}  >
                    <mesh name="Cube010" geometry={nodes.Cube010.geometry} material={materials.radar_red} />
                    <mesh name="Cube010_1" geometry={nodes.Cube010_1.geometry} material={materials.radar_white} />

                    {tabInUse && <PositionalAudio
                        url={'/audio/radar.mp3'}
                        distance={2}
                        autoplay
                        loop
                    />}
                </group>

                <group name="conveyor-truck" position={[-37.06, 2.21, 1.08]} ref={skillsScreenRef} >
                    <mesh name="Cube009" geometry={nodes.Cube009.geometry} material={materials.headlights} />
                    <mesh name="Cube009_1" geometry={nodes.Cube009_1.geometry} material={materials.metal_frame} />
                    <mesh name="Cube009_2" geometry={nodes.Cube009_2.geometry} material={materials.taillights} />
                    <mesh name="Cube009_3" geometry={nodes.Cube009_3.geometry} material={materials.siren_orange} />
                    <mesh name="Cube009_4" geometry={nodes.Cube009_4.geometry} material={materials.SURFACE} />
                    {skillsClicked &&
                        <HtmlContainer center >
                            <Skills exitFocus={switchToMainScreen} />
                        </HtmlContainer>

                    }
                </group>

                {/* <group name="revolvingDoor" position={[27.65, 2.67, 10.48]} >
                    <mesh name="Plane003" geometry={nodes.Plane003.geometry} material={materials.dark_metal_frame} />
                    <mesh name="Plane003_1" geometry={nodes.Plane003_1.geometry} material={materials.dark_glass} />

                    {tabInUse && <PositionalAudio
                        url='/audio/airport-ambiance.mp3'
                        distance={100}
                        autoplay
                        loop
                    />}
                </group> */}

                <mesh name="revolvingDoor" geometry={nodes.revolvingDoor.geometry} material={materials.SURFACE} position={[27.65, 2.67, 10.48]}>
                    {tabInUse && <PositionalAudio
                        url='/audio/airport-ambiance.mp3'
                        distance={100}
                        autoplay
                        loop
                    />}
                </mesh>

                <mesh name="infoDisplay1" geometry={nodes.infoDisplay1.geometry} material={materials.SURFACE} position={[29.25, 3.69, 20.61]} ref={aboutMeScreenRef} />
                {/* <group name="infoDisplay1" ref={aboutMeScreenRef} >
          <mesh name="Cube068" geometry={nodes.Cube068.geometry} material={materials.dark_metal_frame} />
          <mesh name="Cube068_1" geometry={nodes.Cube068_1.geometry} material={materials.emissive_white} />
          <mesh name="Cube068_2" geometry={nodes.Cube068_2.geometry} material={materials.css_blue2} />
        </group> */}
            </group>
        </group>
    )
}

useGLTF.preload('./models/scene/scene-transformed.glb')
