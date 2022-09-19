import React from "react";
import "antd/dist/antd.min.css";
import { Carousel } from "antd";
import { ItemContainer, OverlayContainer } from "./Projects.styles";
import Project from "../../project/Project.component";
import { projects } from "../../../data/projects";
import useDelayedMount from "../../../hooks/useDelayedMount";



const Projects = ({exitFocus}) => {

    const isShown = useDelayedMount(1800)

    const onChange = (currentSlide) => {
        console.log(currentSlide);
    };

    return isShown &&
        <OverlayContainer >
            <Carousel afterChange={onChange} style={{ height: '37rem' }} >
                {
                    projects.map((props, index) => <Project key={index} {...props} exitFocus={exitFocus} />)
                }

            </Carousel>
        </OverlayContainer>

};

export default Projects;
