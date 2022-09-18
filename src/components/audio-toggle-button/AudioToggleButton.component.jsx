import { Billboard, Html } from '@react-three/drei'
import React from 'react'
import Projects from '../overlay/projects/Projects.component';
import { Button } from 'antd';
import { SoundOutlined } from '@ant-design/icons';

const AudioToggleButton = ({toggleAudio,audioPlaying}) => {
  return (
    <Billboard
    follow={false}
    lockX
    lockY
    lockZ
  >
    <Html>
    <SoundOutlined onClick={toggleAudio} />
    </Html>
  </Billboard>
  )
}

export default AudioToggleButton