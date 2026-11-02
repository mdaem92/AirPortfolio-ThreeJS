import { useGLTF } from '@react-three/drei'

// Decode Draco locally. drei defaults to a gstatic CDN, which adds a
// cross-origin round trip before the scene model can parse and fails outright
// on networks that block that host. The files are copied from the installed
// three package into public/draco/.
useGLTF.setDecoderPath('/draco/')
