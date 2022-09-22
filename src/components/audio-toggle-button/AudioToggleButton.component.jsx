
import React from 'react'
import { SoundOutlined } from '@ant-design/icons';
import { HtmlContainer } from './AudioToggleButton.styles';

const AudioToggleButton = ({ toggleAudio, audioPlaying }) => {
  return (

    <HtmlContainer audioPlaying={audioPlaying} fullscreen >
      <SoundOutlined onClick={toggleAudio} />
    </HtmlContainer>
  )
}

export default AudioToggleButton