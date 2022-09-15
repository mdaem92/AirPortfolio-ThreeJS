import React from 'react'
import { OverlayContainer, TitleContainer, ItemsContainer, RowContainer,Item } from './Skills.styles'
const Skills = () => {



    return (
        <OverlayContainer>
            <RowContainer>
                <TitleContainer>
                    Programming
                </TitleContainer>
                <ItemsContainer>
                    <Item>C++</Item>
                    <Item>Java</Item>
                    <Item>Javascript</Item>
                    <Item>Python</Item>
                </ItemsContainer>
                <hr/>
            </RowContainer>
            <RowContainer>
                <TitleContainer>
                    Technology
                </TitleContainer>
                <ItemsContainer>
                    <Item>ThreeJS</Item>
                    <Item>Gatsby</Item>
                    <Item>GraphQL</Item>
                    <Item>MongoDB</Item>
                    <Item>NextJs</Item>
                    <Item>NodeJs</Item>
                    <Item>React</Item>
                    <Item>Redux</Item>
                    <Item>REST</Item>
                </ItemsContainer>
                <hr/>

            </RowContainer>
            <RowContainer>
                <TitleContainer>
                    Experience with
                </TitleContainer>
                <ItemsContainer>
                    <Item>Agile/Scrum</Item>
                    <Item>Data Structures / Algorithms</Item>
                    <Item>Event Driven Design</Item>
                    <Item>OOP / Functional Programming</Item>
                    <Item>PWA</Item>
                    <Item>SSG/ SSR /CSR</Item>
                    <Item>Test Driven Development</Item>
                    <Item>Version Control</Item>
                </ItemsContainer>
                

            </RowContainer>

        </OverlayContainer>
    )
}

export default Skills