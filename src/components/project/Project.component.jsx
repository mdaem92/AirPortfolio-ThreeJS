// import { Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import React from 'react'
import { DescriptionContainer, Image1, Image2, Image3, ImagesContainer, LogoContainer, ProjectContainer, TitleContainer, CustomButton, LogoAndTitleContainer, ButtonsContainer } from './Project.styles'

const Project = ({ title, description, url, images, exitFocus, isMobile,gitUrl }) => {

  const handleClick = () => {
    exitFocus()
  }
  return (
    <ProjectContainer >
      <TitleContainer>
        <ArrowLeftOutlined onClick={handleClick} />
        <LogoAndTitleContainer>
          <LogoContainer src={images[3]} />
          <div>{title}</div>
        </LogoAndTitleContainer>

      </TitleContainer>
      {images.length > 0 && <ImagesContainer isMobile={isMobile}>
        <Image1 src={images[0]} />
        <Image2 src={images[1]} />
        <Image3 src={images[2]} />


      </ImagesContainer>}
      <DescriptionContainer>
        {description}
      </DescriptionContainer>
      <ButtonsContainer>
        {!!url && <CustomButton type='primary' shape='round' href={url} target="_blank">Live demo</CustomButton>}
        <CustomButton type='primary'  shape='round' href={gitUrl} target="_blank">GitHub</CustomButton>
      </ButtonsContainer>


    </ProjectContainer>
  )
}

export default Project