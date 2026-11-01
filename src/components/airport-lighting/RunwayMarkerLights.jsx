import { useLayoutEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { AdditiveBlending, BufferGeometry, Color, DataTexture, Float32BufferAttribute, InstancedMesh, LinearFilter, Matrix4, Mesh, MeshBasicMaterial, PlaneGeometry, Points, PointsMaterial, RGBAFormat } from 'three'

function createMarkerGlow() {
    const size = 32
    const pixels = new Uint8Array(size * size * 4)
    for (let y = 0; y < size; y += 1) {
        for (let x = 0; x < size; x += 1) {
            const radius = Math.hypot((x + 0.5) / size * 2 - 1, (y + 0.5) / size * 2 - 1)
            pixels.set([255, 255, 255, Math.round(Math.max(0, 1 - radius) ** 2 * 255)], (y * size + x) * 4)
        }
    }
    const texture = new DataTexture(pixels, size, size, RGBAFormat)
    texture.magFilter = texture.minFilter = LinearFilter
    texture.needsUpdate = true
    return texture
}

// Both end rows are merged GLTF meshes. Find each separated lamp along X.
function markerCenters(geometry) {
    const attribute = geometry.getAttribute('position')
    const vertices = Array.from({ length: attribute.count }, (_, index) => [attribute.getX(index), attribute.getY(index), attribute.getZ(index)]).sort((a, b) => a[0] - b[0])
    const bands = []
    for (const vertex of vertices) {
        const last = bands.at(-1)
        if (!last || vertex[0] - last.at(-1)[0] > 0.5) bands.push([vertex])
        else last.push(vertex)
    }
    return bands.map(band => [0, 1, 2].map(axis => axis === 1
        ? Math.max(...band.map(vertex => vertex[axis])) + 0.025
        : (Math.min(...band.map(vertex => vertex[axis])) + Math.max(...band.map(vertex => vertex[axis]))) / 2))
}

export default function RunwayMarkerLights({ name, geometry, position, color, coreColor, settings }) {
    const root = useRef(null)
    const effects = useRef(null)
    useLayoutEffect(() => {
        const target = root.current
        const centers = markerCenters(geometry)
        const texture = createMarkerGlow()
        // An opaque, self-lit lens replaces the dim/transmissive shared material.
        const core = new Mesh(geometry, new MeshBasicMaterial({ color: coreColor, toneMapped: false }))
        core.name = name
        const haloGeometry = new BufferGeometry().setAttribute('position', new Float32BufferAttribute(centers.flat(), 3))
        const halos = new Points(haloGeometry, new PointsMaterial({ color, map: texture, size: 1.25, transparent: true, depthWrite: false, blending: AdditiveBlending, toneMapped: false }))
        const pools = new InstancedMesh(new PlaneGeometry(1.8, 1.8), new MeshBasicMaterial({ color, map: texture, transparent: true, depthWrite: false, blending: AdditiveBlending, toneMapped: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }), centers.length)
        const matrix = new Matrix4()
        centers.forEach(([x, , z], index) => {
            matrix.makeRotationX(-Math.PI / 2)
            matrix.setPosition(x, 1.075 - position[1], z)
            pools.setMatrixAt(index, matrix)
        })
        pools.instanceMatrix.needsUpdate = true
        pools.renderOrder = 2
        halos.raycast = pools.raycast = () => null
        target.add(core, halos, pools)
        effects.current = { core, halos, pools, color: new Color(coreColor) }
        return () => {
            target.remove(core, halos, pools)
            effects.current = null
            core.material.dispose()
            haloGeometry.dispose(); halos.material.dispose()
            pools.geometry.dispose(); pools.material.dispose(); pools.dispose()
            texture.dispose()
        }
    }, [geometry, name, color, coreColor, position])
    useFrame(() => {
        if (!effects.current) return
        const { core, halos, pools, color: originalColor } = effects.current
        const brightness = settings.steadyBrightness ?? 1
        const glow = settings.steadyGlow ?? 0.8
        core.material.color.copy(originalColor).multiplyScalar(brightness)
        halos.material.opacity = glow * Math.min(1, brightness)
        pools.material.opacity = glow * 0.32 * Math.min(1, brightness)
    })
    return <group ref={root} position={position} dispose={null} />
}
