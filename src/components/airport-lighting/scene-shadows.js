// Change object flags, never shared GLTF materials. Screens and glow meshes stay untouched.
export function configureSurfaceShadows(root) {
    const previous = []
    root.traverse(object => {
        if (!object.isMesh || object.isInstancedMesh) return
        const material = object.material
        if (material.name !== 'SURFACE' && material.name !== 'metal_frame') return
        previous.push([object, object.castShadow, object.receiveShadow])
        object.castShadow = true
        object.receiveShadow = true
    })
    return () => previous.forEach(([object, castShadow, receiveShadow]) => {
        object.castShadow = castShadow
        object.receiveShadow = receiveShadow
    })
}
