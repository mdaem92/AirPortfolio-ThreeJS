import styled, { css } from "styled-components";

const mobileCss = css`
    position:relative ;
    right:30px ;
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
        margin-top: 5px;
        margin-bottom:5px ;
    }
`
export const Item = styled.div`
    font-size:medium ;
    font-weight:bold ;
`