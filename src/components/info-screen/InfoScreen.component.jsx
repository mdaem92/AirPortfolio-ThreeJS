import React from 'react'
import { InfoScreenContainer, TopRow, LogoContainer, TitleContainer } from './infoScreen.styles'
import { FlapDisplay, Presets } from 'react-split-flap-effect'
import DisplayClock from '../diplay-clock/displayClock.component'
import Table from '../table/Table.component'

const InfoScreen = ({ title }) => {
    return (
        <InfoScreenContainer>
            <TopRow>
                <LogoContainer />
                <TitleContainer>
                    <FlapDisplay
                        chars={Presets.ALPHANUM + ',:'}
                        length={title.length}
                        value={title}
                        // className={'L'}
                    />
                </TitleContainer>
                <DisplayClock />

            </TopRow>
            <Table />
            {/* <DisplayClock/> */}
        </InfoScreenContainer>
    )
}

export default InfoScreen