import styled,{css} from "styled-components";


const mobileCss = css`
    position:relative ;
    right:-60px ;
`
export const OverlayContainer = styled.div`
        background-color:white;
    width:20rem;
    /* height:35rem; */
    opacity:0.5;
    /* border: 5px solid white; */
    border-radius:10px ;
    padding:10px 20px 10px 20px ;
    font-family: 'Teko', sans-serif;
    font-size:40px ;
    display:flex ;
    flex-direction:column ;
    a{
        font-size:medium ;
        /* span{
            font-size:20px ;
        } */
    }
    span{
        font-size:medium ;
        /* display:inline ; */
    }
    .anticon{
        align-self:flex-start ;
        margin-top:10px ;
        svg{
            width:20px ;
            height:20px ;
            fill:#1890ff;
            :hover {
	            fill: #7dc0ff;
            }
        }
    }

    ${props => props.isMobile && mobileCss}
`