import { Billboard, Html } from "@react-three/drei";
import styled,{css} from "styled-components";

const red = css`
    fill:red;
`
const green = css`
    fill:green;
`
export const HtmlContainer = styled(({audioPlaying,...otherProps})=><Html {...otherProps}/>)`
    /* bottom:200px; */
    /* position:relative ; */
    
    .anticon-sound{
        position:absolute ;
        font-size:50px ;
        svg{
            ${props=>props.audioPlaying? red:green}
        }
       
        
    }

`

export const BillboardContainer = styled(props=><Billboard {...props}/>)`

    border: 1px solid red;

`