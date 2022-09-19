import styled from "styled-components";
import { Button } from "antd";

export const ProjectContainer = styled.div`
    height: 32rem;
    color: black;
    display:flex ;
    justify-content:space-between ;
    flex-direction:column ;
    row-gap:10px ;
    .anticon{
        
        svg{
            width:20px ;
            height:20px ;
            :hover {
	            /* background: rgba(0,0,0,0); */
	            fill: #7dc0ff;
	            /* box-shadow: inset 0 0 0 3px #3a7999; */
}
        }
    }
`
export const LogoContainer = styled.img`
    width:50px ;
    height:50px;
    /* border:1px solid black ; */
    /* align-self:center ; */

`
export const TitleContainer = styled.div`
    display: flex ;
    flex-direction:row ;
    font-size:40px ;
    color:#1890ff;
    justify-content:space-between ;
`
export const DescriptionContainer = styled.p`
    font-size:larger ;
    margin-top:30px ;
    min-height:80px;
    /* margin-bottom:20px ; */

`
export const ImagesContainer = styled.div`
    height:50%;
    margin-top:20px ;

    /* border:1px solid black ; */
    display: grid;
    grid-template-columns:1fr 1fr ;
    grid-template-rows:1fr 1fr ;
    
    grid-template-areas:
        "firstImage secondImage"
        "firstImage thirdImage";
    
`
export const Image1 = styled.img`
    height:15rem ;
    width:100%;
    /* padding:5px ; */

    /* border:1px solid grey ; */

    grid-area: firstImage ;
`
export const Image2 = styled.img`
    height:7.5rem ;
    width:100%;
    /* padding:5px ; */

    grid-area: secondImage ;
    /* border:1px solid grey ; */

`
export const Image3 = styled.img`
    height:7.5rem;
    width:100%;
    /* padding:5px ; */
    /* border:1px solid grey ; */

    grid-area: thirdImage ;
`
export const CustomButton = styled((props)=><Button {...props}/>)`
    /* width:30% ; */
    align-self: center;
`
export const LogoAndTitleContainer = styled.div`
    display:flex ;
    flex-direction: row ;
    justify-content:space-between ;
`