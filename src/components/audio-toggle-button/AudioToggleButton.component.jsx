import { Billboard, Html } from '@react-three/drei'
import React from 'react'
import Projects from '../overlay/projects/Projects.component';
import { Button } from 'antd';
import { SoundOutlined } from '@ant-design/icons';
import { HtmlContainer, BillboardContainer } from './AudioToggleButton.styles';

const AudioToggleButton = ({ toggleAudio, audioPlaying }) => {
  return (

    <HtmlContainer audioPlaying={audioPlaying} fullscreen >
      <SoundOutlined onClick={toggleAudio} />
    </HtmlContainer>
  )
}

export default AudioToggleButton