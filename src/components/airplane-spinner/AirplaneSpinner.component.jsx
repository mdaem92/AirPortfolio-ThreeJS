import React from 'react'
import {SpinningContainer,Container,AirplaneCointainer} from './AirplaneSpinner.styles'

const AirplaneSpinner = () => {
  return (
    <Container>
        <SpinningContainer>
            <AirplaneCointainer>
                <span className='.fa.fa-plane'>something here</span>
            </AirplaneCointainer>
        </SpinningContainer>
    </Container>
  )
}

export default AirplaneSpinner