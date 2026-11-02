import React, { useEffect } from "react";
import { baselineMark } from '../../../performance/baseline-markers'
import { Carousel, ConfigProvider } from "antd";
import { OverlayContainer } from "./Projects.styles";
import Project from "../../project/Project.component";
import { projects } from "../../../data/projects";
import useDelayedMount from "../../../hooks/useDelayedMount";
import useWindowWidth from "../../../hooks/useWindowWidth";
import { portfolioTheme } from '../../../ui-theme';



const Projects = ({exitFocus}) => {

    const isShown = useDelayedMount(1800)
    useEffect(() => { if (isShown) baselineMark('overlay-visible', { route: 'projects' }) }, [isShown])
    const isMobile = useWindowWidth() <=600


    return isShown &&
        <OverlayContainer $isMobile={isMobile} >
            <ConfigProvider theme={portfolioTheme}>
            <Carousel style={{ height: '37rem' }} >
                {
                    projects.map((props, index) => <Project key={index} {...props} exitFocus={exitFocus} isMobile={isMobile} />)
                }

            </Carousel>
            </ConfigProvider>
        </OverlayContainer>

};

export default Projects;
