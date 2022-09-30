import { useGLTF } from '@react-three/drei'
import React from 'react'

const NewStaticItems = () => {
    const { nodes, materials, animations } = useGLTF('./models/scene/scene-transformed.glb')

    return (
        <group>

            <group name="cart005" position={[28.58, 1.67, 5.8]}>
                <mesh name="Cube063" geometry={nodes.Cube063.geometry} material={nodes.Cube063.material} />
                <mesh name="Cube063_1" geometry={nodes.Cube063_1.geometry} material={materials.metal_frame} />
                <mesh name="Cube063_2" geometry={nodes.Cube063_2.geometry} material={materials.SURFACE} />
                <mesh name="Cube063_3" geometry={nodes.Cube063_3.geometry} material={materials.emissive_white} />
            </group>
            <group name="cart001" position={[28.58, 1.67, 5.36]}>
                <mesh name="Cube063" geometry={nodes.Cube063.geometry} material={nodes.Cube063.material} />
                <mesh name="Cube063_1" geometry={nodes.Cube063_1.geometry} material={materials.metal_frame} />
                <mesh name="Cube063_2" geometry={nodes.Cube063_2.geometry} material={materials.SURFACE} />
                <mesh name="Cube063_3" geometry={nodes.Cube063_3.geometry} material={materials.emissive_white} />
            </group>
            <group name="cart002" position={[28.58, 1.67, 6.22]}>
                <mesh name="Cube063" geometry={nodes.Cube063.geometry} material={nodes.Cube063.material} />
                <mesh name="Cube063_1" geometry={nodes.Cube063_1.geometry} material={materials.metal_frame} />
                <mesh name="Cube063_2" geometry={nodes.Cube063_2.geometry} material={materials.SURFACE} />
                <mesh name="Cube063_3" geometry={nodes.Cube063_3.geometry} material={materials.emissive_white} />
            </group>
            <group name="cart003" position={[28.58, 1.67, 6.64]}>
                <mesh name="Cube063" geometry={nodes.Cube063.geometry} material={nodes.Cube063.material} />
                <mesh name="Cube063_1" geometry={nodes.Cube063_1.geometry} material={materials.metal_frame} />
                <mesh name="Cube063_2" geometry={nodes.Cube063_2.geometry} material={materials.SURFACE} />
                <mesh name="Cube063_3" geometry={nodes.Cube063_3.geometry} material={materials.emissive_white} />
            </group>
            <group name="cart004" position={[28.58, 1.67, 7.05]}>
                <mesh name="Cube063" geometry={nodes.Cube063.geometry} material={nodes.Cube063.material} />
                <mesh name="Cube063_1" geometry={nodes.Cube063_1.geometry} material={materials.metal_frame} />
                <mesh name="Cube063_2" geometry={nodes.Cube063_2.geometry} material={materials.SURFACE} />
                <mesh name="Cube063_3" geometry={nodes.Cube063_3.geometry} material={materials.emissive_white} />
            </group>
            <group name="cart006" position={[28.58, 1.67, 5.03]}>
                <mesh name="Cube063" geometry={nodes.Cube063.geometry} material={nodes.Cube063.material} />
                <mesh name="Cube063_1" geometry={nodes.Cube063_1.geometry} material={materials.metal_frame} />
                <mesh name="Cube063_2" geometry={nodes.Cube063_2.geometry} material={materials.SURFACE} />
                <mesh name="Cube063_3" geometry={nodes.Cube063_3.geometry} material={materials.emissive_white} />
            </group>
            <group name="cart007" position={[28.58, 1.67, 7.47]}>
                <mesh name="Cube063" geometry={nodes.Cube063.geometry} material={nodes.Cube063.material} />
                <mesh name="Cube063_1" geometry={nodes.Cube063_1.geometry} material={materials.metal_frame} />
                <mesh name="Cube063_2" geometry={nodes.Cube063_2.geometry} material={materials.SURFACE} />
                <mesh name="Cube063_3" geometry={nodes.Cube063_3.geometry} material={materials.emissive_white} />
            </group>
            <group name="cart008" position={[28.58, 1.67, 4.62]}>
                <mesh name="Cube063" geometry={nodes.Cube063.geometry} material={nodes.Cube063.material} />
                <mesh name="Cube063_1" geometry={nodes.Cube063_1.geometry} material={materials.metal_frame} />
                <mesh name="Cube063_2" geometry={nodes.Cube063_2.geometry} material={materials.SURFACE} />
                <mesh name="Cube063_3" geometry={nodes.Cube063_3.geometry} material={materials.emissive_white} />
            </group>


            <mesh name="engine1" geometry={nodes.engine1.geometry} material={materials.metal_frame} position={[-26.72, 3.02, 13.7]} rotation={[Math.PI / 2, 0, 0]} scale={[1.15,1.15,1.15]} />

            <group name="orangeRunwayCar2" position={[-52.85, 1.12, -14.27]}>
                <mesh name="Cube185" geometry={nodes.Cube185.geometry} material={materials.headlights} />
                <mesh name="Cube185_1" geometry={nodes.Cube185_1.geometry} material={materials.taillights} />
                <mesh name="Cube185_2" geometry={nodes.Cube185_2.geometry} material={materials.siren_orange} />
                <mesh name="Cube185_3" geometry={nodes.Cube185_3.geometry} material={materials.SURFACE} />
                <mesh name="Cube185_4" geometry={nodes.Cube185_4.geometry} material={materials.metal_frame} />
            </group>

            <group name="luggageTrailer" position={[-45.53, 1.36, -12.44]}>
                <mesh name="Cube186" geometry={nodes.Cube186.geometry} material={materials.SURFACE} />
                <mesh name="Cube186_1" geometry={nodes.Cube186_1.geometry} material={materials.metal_frame} />
                <mesh name="Cube186_2" geometry={nodes.Cube186_2.geometry} material={materials.taillights} />
            </group>

            <group name="runwayBackup" position={[-32.58, 1.75, 35.35]}>
                <mesh name="Cube199" geometry={nodes.Cube199.geometry} material={materials.headlights} />
                <mesh name="Cube199_1" geometry={nodes.Cube199_1.geometry} material={materials.siren_orange} />
                <mesh name="Cube199_2" geometry={nodes.Cube199_2.geometry} material={materials.metal_frame} />
                <mesh name="Cube199_3" geometry={nodes.Cube199_3.geometry} material={materials.SURFACE} />
            </group>
            <group name="runwayPolice" position={[-46.7, 2.49, 6.09]}>
                <mesh name="Cube002" geometry={nodes.Cube002.geometry} material={materials.headlights} />
                <mesh name="Cube002_1" geometry={nodes.Cube002_1.geometry} material={materials.taillights} />
                <mesh name="Cube002_2" geometry={nodes.Cube002_2.geometry} material={materials.metal_frame} />
                <mesh name="Cube002_3" geometry={nodes.Cube002_3.geometry} material={materials.siren_blue} />
                <mesh name="Cube002_4" geometry={nodes.Cube002_4.geometry} material={materials.siren_red} />
                <mesh name="Cube002_5" geometry={nodes.Cube002_5.geometry} material={materials.SURFACE} />
            </group>
            <group name="firefighter1" position={[-52.8, 1.75, 40.1]}>
                <mesh name="Cube120" geometry={nodes.Cube120.geometry} material={materials.SURFACE} />
                <mesh name="Cube120_1" geometry={nodes.Cube120_1.geometry} material={materials.headlights} />
                <mesh name="Cube120_2" geometry={nodes.Cube120_2.geometry} material={materials.siren_red} />
                <mesh name="Cube120_3" geometry={nodes.Cube120_3.geometry} material={materials.siren_blue} />
                <mesh name="Cube120_4" geometry={nodes.Cube120_4.geometry} material={materials.metal_frame} />
                <mesh name="Cube120_5" geometry={nodes.Cube120_5.geometry} material={materials.taillights} />
            </group>
            <group name="firefighter2" position={[-52.93, 1.75, 36.39]}>
                <mesh name="Cube159" geometry={nodes.Cube159.geometry} material={materials.headlights} />
                <mesh name="Cube159_1" geometry={nodes.Cube159_1.geometry} material={materials.siren_red} />
                <mesh name="Cube159_2" geometry={nodes.Cube159_2.geometry} material={materials.siren_blue} />
                <mesh name="Cube159_3" geometry={nodes.Cube159_3.geometry} material={materials.metal_frame} />
                <mesh name="Cube159_4" geometry={nodes.Cube159_4.geometry} material={materials.taillights} />
                <mesh name="Cube159_5" geometry={nodes.Cube159_5.geometry} material={materials.SURFACE} />
            </group>
            <group name="runwayWhiteCar" position={[-19.72, 1.42, -20.94]}>
                <mesh name="Cube183" geometry={nodes.Cube183.geometry} material={materials.taillights} />
                <mesh name="Cube183_1" geometry={nodes.Cube183_1.geometry} material={materials.metal_frame} />
                <mesh name="Cube183_2" geometry={nodes.Cube183_2.geometry} material={materials.siren_orange} />
                <mesh name="Cube183_3" geometry={nodes.Cube183_3.geometry} material={materials.headlights} />
                <mesh name="Cube183_4" geometry={nodes.Cube183_4.geometry} material={materials.SURFACE} />
            </group>
            <group name="ground">
                <mesh name="Plane001" geometry={nodes.Plane001.geometry} material={materials.SURFACE} />
                <mesh name="Plane001_1" geometry={nodes.Plane001_1.geometry} material={materials.surface_yellow} />
                <mesh name="Plane001_2" geometry={nodes.Plane001_2.geometry} material={materials.emissive_white} />
                <mesh name="Plane001_3" geometry={nodes.Plane001_3.geometry} material={materials.purple} />
                <mesh name="Plane001_4" geometry={nodes.Plane001_4.geometry} material={materials['dark-glass']} />
            </group>
            <group name="yellowparkingTaxi" position={[43.74, 1.48, 12.64]}>
                <mesh name="Cube051" geometry={nodes.Cube051.geometry} material={materials.headlights} />
                <mesh name="Cube051_1" geometry={nodes.Cube051_1.geometry} material={nodes.Cube051_1.material} />
                <mesh name="Cube051_2" geometry={nodes.Cube051_2.geometry} material={materials.taillights} />
                <mesh name="Cube051_3" geometry={nodes.Cube051_3.geometry} material={materials.taxi_sign} />
                <mesh name="Cube051_4" geometry={nodes.Cube051_4.geometry} material={materials.SURFACE} />
            </group>
            <group name="redParkingCar" position={[43.77, 1.28, 8.46]}>
                <mesh name="Cube041" geometry={nodes.Cube041.geometry} material={materials.headlights} />
                <mesh name="Cube041_1" geometry={nodes.Cube041_1.geometry} material={materials.taillights} />
                <mesh name="Cube041_2" geometry={nodes.Cube041_2.geometry} material={materials.SURFACE} />
            </group>
            <group name="blueParkingCar" position={[49.79, 1.44, 8.31]}>
                <mesh name="Cube043" geometry={nodes.Cube043.geometry} material={materials.headlights} />
                <mesh name="Cube043_1" geometry={nodes.Cube043_1.geometry} material={materials.metal_frame} />
                <mesh name="Cube043_2" geometry={nodes.Cube043_2.geometry} material={materials.taillights} />
                <mesh name="Cube043_3" geometry={nodes.Cube043_3.geometry} material={materials.taxi_sign} />
                <mesh name="Cube043_4" geometry={nodes.Cube043_4.geometry} material={materials.SURFACE} />
            </group>
            <group name="blackParkingCar" position={[40.64, 1.44, 12.83]}>
                <mesh name="Cube157" geometry={nodes.Cube157.geometry} material={materials.SURFACE} />
                <mesh name="Cube157_1" geometry={nodes.Cube157_1.geometry} material={materials.headlights} />
                <mesh name="Cube157_2" geometry={nodes.Cube157_2.geometry} material={materials.metal_frame} />
                <mesh name="Cube157_3" geometry={nodes.Cube157_3.geometry} material={materials.taillights} />
                <mesh name="Cube157_4" geometry={nodes.Cube157_4.geometry} material={materials.taxi_sign} />
            </group>
            <mesh name="airportName" geometry={nodes.airportName.geometry} material={materials.siren_blue} position={[30.2, 13.13, 8.52]} />
            <mesh name="runwayNumber19" geometry={nodes.runwayNumber19.geometry} material={materials.surface_yellow} position={[-20.2, 1.04, 26.02]} />
            <mesh name="runwayNumber92" geometry={nodes.runwayNumber92.geometry} material={materials.surface_yellow} position={[-42.28, 1.03, 26.02]} />
            <mesh name="iranair" geometry={nodes.iranair.geometry} material={materials['iranair.001']} position={[-31.79, 10.82, -15.67]} />
            <mesh name="iranair001" geometry={nodes.iranair001.geometry} material={materials['iranair.001']} position={[-33.69, 10.82, -15.67]} />
            <group name="Bus" position={[-15.95, 2.06, 38.39]}>
                <mesh name="Cube160" geometry={nodes.Cube160.geometry} material={materials.headlights} />
                <mesh name="Cube160_1" geometry={nodes.Cube160_1.geometry} material={materials.taillights} />
                <mesh name="Cube160_2" geometry={nodes.Cube160_2.geometry} material={materials.metal_frame} />
                <mesh name="Cube160_3" geometry={nodes.Cube160_3.geometry} material={materials.SURFACE} />
            </group>
            <group name="escalator" position={[-28.03, 1.58, 26.17]}>
                <mesh name="Cube" geometry={nodes.Cube.geometry} material={materials.headlights} />
                <mesh name="Cube_1" geometry={nodes.Cube_1.geometry} material={materials.taillights} />
                <mesh name="Cube_2" geometry={nodes.Cube_2.geometry} material={materials.metal_frame} />
                <mesh name="Cube_3" geometry={nodes.Cube_3.geometry} material={materials.SURFACE} />
            </group>
            <group name="fuelTruck" position={[-23.92, 1.96, -0.98]}>
                <mesh name="Cube197" geometry={nodes.Cube197.geometry} material={materials.metal_frame} />
                <mesh name="Cube197_1" geometry={nodes.Cube197_1.geometry} material={materials.headlights} />
                <mesh name="Cube197_2" geometry={nodes.Cube197_2.geometry} material={materials.taillights} />
                <mesh name="Cube197_3" geometry={nodes.Cube197_3.geometry} material={materials.siren_orange} />
                <mesh name="Cube197_4" geometry={nodes.Cube197_4.geometry} material={materials.SURFACE} />
            </group>
            <mesh name="fuelPipe" geometry={nodes.fuelPipe.geometry} material={materials.SURFACE} position={[-29.98, 1.55, -1.04]} />
            <group name="orangeRunwayCar1" position={[-24.82, 1.1, 18.85]}>
                <mesh name="Cube171" geometry={nodes.Cube171.geometry} material={materials.headlights} />
                <mesh name="Cube171_1" geometry={nodes.Cube171_1.geometry} material={materials.metal_frame} />
                <mesh name="Cube171_2" geometry={nodes.Cube171_2.geometry} material={materials.siren_orange} />
                <mesh name="Cube171_3" geometry={nodes.Cube171_3.geometry} material={materials.SURFACE} />
                <mesh name="Cube171_4" geometry={nodes.Cube171_4.geometry} material={materials.taillights} />
            </group>
            {/* <mesh name="Plane005" geometry={nodes.Plane005.geometry} material={nodes.Plane005.material} position={[-30.35, 5.39, -5.7]} /> */}
            <mesh name="tree5" geometry={nodes.tree5.geometry} material={materials.SURFACE} position={[47.48, 3.62, -21.15]} />
            <mesh name="tree7" geometry={nodes.tree7.geometry} material={materials.SURFACE} position={[41.74, 2.86, -27.83]} />
            <mesh name="tree2" geometry={nodes.tree2.geometry} material={materials.SURFACE} position={[47.38, 4.45, 35.16]} />
            <mesh name="tree4" geometry={nodes.tree4.geometry} material={materials.SURFACE} position={[47.49, 4.83, -15.93]} />
            <mesh name="tree6" geometry={nodes.tree6.geometry} material={materials.SURFACE} position={[47.66, 4.73, -26.53]} />
            <mesh name="tree1" geometry={nodes.tree1.geometry} material={materials.SURFACE} position={[47.38, 4.15, 40.25]} />
            <mesh name="signPostArrivalText" geometry={nodes.signPostArrivalText.geometry} material={materials.emissive_white} position={[51.37, 3.6, -2.99]} />
            <mesh name="signPostDepartureText" geometry={nodes.signPostDepartureText.geometry} material={materials.emissive_white} position={[51.43, 3.26, -2.99]} />
            <mesh name="signPostArrivalSign" geometry={nodes.signPostArrivalSign.geometry} material={materials.emissive_white} position={[51.9, 3.54, -2.99]} />
            <mesh name="signPostDepartureSign" geometry={nodes.signPostDepartureSign.geometry} material={materials.emissive_white} position={[51.89, 3.23, -2.99]} />
            <mesh name="runway_lights_red" geometry={nodes.runway_lights_red.geometry} material={materials.taillights} position={[-32.59, 0.99, 47.24]} />
            <mesh name="runway_lights_green" geometry={nodes.runway_lights_green.geometry} material={materials.nodeGreen} position={[-32.57, 0.99, -35.33]} />
            <mesh name="runway_lights_white" geometry={nodes.runway_lights_white.geometry} material={materials.emissive_white} position={[-62.03, 0.99, 4.94]} />

            <group name="speedLimitSign1" position={[52.21, 2.84, -19.39]}>
                <mesh name="Cylinder002" geometry={nodes.Cylinder002.geometry} material={materials.metal_frame} />
                <mesh name="Cylinder002_1" geometry={nodes.Cylinder002_1.geometry} material={materials.SURFACE} />
            </group>
            <group name="speedLimitSign2" position={[60.29, 2.94, 15.94]}>
                <mesh name="Cylinder003" geometry={nodes.Cylinder003.geometry} material={materials.metal_frame} />
                <mesh name="Cylinder003_1" geometry={nodes.Cylinder003_1.geometry} material={materials.SURFACE} />
            </group>
            <group name="sign_post" position={[51.59, 3.25, -2.9]}>
                <mesh name="Cube011" geometry={nodes.Cube011.geometry} material={materials.metal_frame} />
                <mesh name="Cube011_1" geometry={nodes.Cube011_1.geometry} material={materials.SURFACE} />
            </group>
            <mesh name="cplusplus" geometry={nodes.cplusplus.geometry} material={materials.css_blue2} position={[-40.76, 200, 1.42]} rotation={[-Math.PI / 2, -1.37, 0]} />
            <group name="python" position={[-40.78, 1500, 1.5]} rotation={[Math.PI / 2, 0, 0]} >
                <mesh name="Curve001" geometry={nodes.Curve001.geometry} material={materials['SVGMat.002']} />
                <mesh name="Curve001_1" geometry={nodes.Curve001_1.geometry} material={materials.css_blue2} />
            </group>
            <group name="javascript" position={[-40.76, 1500, 1.42]} >
                <mesh name="Cube008" geometry={nodes.Cube008.geometry} material={materials.js_yellow} />
                <mesh name="Cube008_1" geometry={nodes.Cube008_1.geometry} material={materials.js_yellow2} />
                <mesh name="Cube008_2" geometry={nodes.Cube008_2.geometry} material={materials.icon_white} />
            </group>
            <group name="css" position={[-40.76, 1500, 1.42]} >
                <mesh name="Cube237" geometry={nodes.Cube237.geometry} material={materials.css_blue} />
                <mesh name="Cube237_1" geometry={nodes.Cube237_1.geometry} material={materials.css_blue2} />
                <mesh name="Cube237_2" geometry={nodes.Cube237_2.geometry} material={materials.icon_white} />
            </group>
            <group name="html" position={[-40.7, 1500, 1.42]}>
                <mesh name="Cube239" geometry={nodes.Cube239.geometry} material={materials.icon_white} />
                <mesh name="Cube239_1" geometry={nodes.Cube239_1.geometry} material={materials.html_red} />
                <mesh name="Cube239_2" geometry={nodes.Cube239_2.geometry} material={materials.html_Red2} />
            </group>
            <group name="threeJS" position={[-40.63, 1500, 1.46]} >
                <mesh name="Cone004" geometry={nodes.Cone004.geometry} material={materials.icon_white} />
                <mesh name="Cone004_1" geometry={nodes.Cone004_1.geometry} material={materials['black.006']} />
            </group>
            <mesh name="nodeJS" geometry={nodes.nodeJS.geometry} material={materials.nodeGreen} position={[-40.7, 200, 1.42]} />
            <mesh name="react" geometry={nodes.react.geometry} material={materials.react} position={[-40.8, 200, 1.49]} rotation={[0, -0.61, -Math.PI / 2]} />
            <group name="gatsby" position={[-40.74, 200, 1.44]} rotation={[Math.PI / 2, 0, 0]}>
                <mesh name="Curve003" geometry={nodes.Curve003.geometry} material={materials.icon_white} />
                <mesh name="Curve003_1" geometry={nodes.Curve003_1.geometry} material={materials.gatsbyPurple} />
            </group>
            <mesh name="Suzanne" geometry={nodes.Suzanne.geometry} material={materials.blender_orange} position={[-40.68, 200, 1.45]} rotation={[-0.36, -0.12, 0.31]} />
            <mesh name="infoDisplay2" geometry={nodes.infoDisplay2.geometry} material={materials.SURFACE} position={[29.35, 4.43, -0.29]} />
            <group name="infoSign" position={[29.4, 2, 20.57]}>
                <mesh name="Cube018" geometry={nodes.Cube018.geometry} material={nodes.Cube018.material} />
                <mesh name="Cube018_1" geometry={nodes.Cube018_1.geometry} material={materials.emissive_white} />
                <mesh name="Cube018_2" geometry={nodes.Cube018_2.geometry} material={materials.css_blue2} />
            </group>
        </group>

    )
}
export default React.memo(NewStaticItems)
useGLTF.preload('./models/scene/scene-transformed.glb')
