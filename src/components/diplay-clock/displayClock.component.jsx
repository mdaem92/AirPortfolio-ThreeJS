import React from 'react'
import { FlapDisplay, Presets } from 'react-split-flap-effect';
import '../../theme.css'

import useCurrentTime from '../../hooks/useCurrentTime';
import { DisplayClockContainer } from './DisplayClock.styles';

const DisplayClock = () => {

    const currentTime = useCurrentTime()
    const hour = currentTime.format('HH')
    const minutes = currentTime.format('mm')

    return (
        <DisplayClockContainer>
            <FlapDisplay
                chars={Presets.ALPHANUM + ',:'}
                length={currentTime.length}
                value={`${hour}:${minutes}`}
                // className={'M'}

            />
        </DisplayClockContainer>


    )
}

export default DisplayClock