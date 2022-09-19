import { Html } from '@react-three/drei'
import React from 'react'
import ReactHowler from 'react-howler'


const ButtonSoundEffect = ({ playing }) => {
    return (
        <Html>
            <ReactHowler
                src={'/audio/bing.mp3'}
                playing={playing}
                volume={0.5}
            />
        </Html>

    )
}

export default ButtonSoundEffect