import React from "react";
import "antd/dist/antd.min.css";
import { Carousel } from "antd";
import { ItemContainer, OverlayContainer } from "./Projects.styles";
import Project from "../../project/Project.component";
import { projects } from "../../../data/projects";



const Projects = () => {
    const onChange = (currentSlide) => {
        console.log(currentSlide);
    };

    return (
        <OverlayContainer >
            <Carousel afterChange={onChange}  style={{height:'37rem'}} >
                {
                    projects.map((props,index)=><Project key={index} {...props}/>)
                }
       
                {/* <Project/>
                <Project/>
                <Project/> */}



                

            </Carousel>
        </OverlayContainer>

    );
};

export default Projects;
