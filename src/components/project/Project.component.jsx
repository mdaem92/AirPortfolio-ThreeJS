// import { Button } from 'antd'
import { ArrowLeftOutlined, RollbackOutlined } from '@ant-design/icons'
import React from 'react'
import { DescriptionContainer, Image1, Image2, Image3, ImagesContainer, LogoContainer, ProjectContainer, TitleContainer, CustomButton , LogoAndTitleContainer } from './Project.styles'

const Project = ({ title, description, url, images, exitFocus }) => {

  const handleClick = () => {
    exitFocus()
  }
  return (
    <ProjectContainer>
      <TitleContainer>
        <ArrowLeftOutlined onClick={handleClick} />
        <LogoAndTitleContainer>
          <LogoContainer src={images[3]} />
          <div>{title}</div>
        </LogoAndTitleContainer>

      </TitleContainer>
      {images.length > 0 && <ImagesContainer>
        <Image1 src={images[0]} />
        <Image2 src={images[1]} />
        <Image3 src={images[2]} />


      </ImagesContainer>}
      <DescriptionContainer>
        {description}
      </DescriptionContainer>
      {url && <CustomButton type='primary' shape='round' href={url} target="_blank">Live demo</CustomButton>}


    </ProjectContainer>
  )
}

export default Project