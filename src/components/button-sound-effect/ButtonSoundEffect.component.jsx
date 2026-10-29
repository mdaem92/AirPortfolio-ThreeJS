import { Html } from '@react-three/drei'
import React from 'react'
import ReactHowler from 'react-howler'


const ButtonSoundEffect = ({ playing, onEnd }) => {
    return (
        <Html>
            <ReactHowler
                src={'/audio/bing.mp3'}
                playing={playing}
                volume={0.25}
                onEnd={onEnd}
            />
        </Html>

    )
}

export default ButtonSoundEffect
