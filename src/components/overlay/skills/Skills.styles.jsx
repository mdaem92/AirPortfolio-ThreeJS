import styled, { css } from "styled-components";

const mobileCss = css`
    position:relative ;
    right:30px ;
    top:-65px ;

`

export const OverlayContainer = styled.div`
    background-color:black;
    color: white;
    width:20rem;
    /* height:35rem; */
    opacity:0.5;
    /* border: 5px solid white; */
    border-radius:10px ;
    padding:10px 20px 20px 20px ;
    font-family: 'Teko', sans-serif;
    font-size:40px ;
    ${props=>props.isMobile && mobileCss}
`
export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* flex-basis: 100%; */
  /* flex: 1; */
  font-size:30px ;
  color:#1890ff ;
  /* border:1px solid red ; */

`

export const ItemsContainer = styled.div`
    display:grid ;
    grid-template-columns: 1fr 1fr ;

    
`
export const RowContainer = styled.div`

    .anticon{
        svg{
            width:20px ;
            height:20px ;
            fill:#1890ff;
            :hover {
	            fill: #7dc0ff;
            }
        }
    }

    hr{
        border: 5px dotted #1890ff;
        border-style: none none dotted; 
        color: #fff; 
        background-color: black;
        width:50px ;
        align-self:center ;
    }
`
export const Item = styled.div`
    font-size:medium ;
    /* font-weight:10px ; */
`