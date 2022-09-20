import React from "react";
import "antd/dist/antd.min.css";
import { Carousel } from "antd";
import { ItemContainer, OverlayContainer } from "./Projects.styles";
import Project from "../../project/Project.component";
import { projects } from "../../../data/projects";
import useDelayedMount from "../../../hooks/useDelayedMount";
import useWindowWidth from "../../../hooks/useWindowWidth";



const Projects = ({exitFocus}) => {

    const isShown = useDelayedMount(1800)
    const isMobile = useWindowWidth() <=600


    return isShown &&
        <OverlayContainer isMobile={isMobile} >
            <Carousel style={{ height: '37rem' }} >
                {
                    projects.map((props, index) => <Project key={index} {...props} exitFocus={exitFocus} isMobile={isMobile} />)
                }

            </Carousel>
        </OverlayContainer>

};

export default Projects;
