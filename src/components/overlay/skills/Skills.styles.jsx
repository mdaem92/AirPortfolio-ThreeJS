import styled from "styled-components";

export const OverlayContainer = styled.div`
    background-color:white;
    width:20rem;
    height:35rem;
    opacity:0.5;
    /* border: 5px solid white; */
    border-radius:10px ;
    /* height:500px */
    padding:20px ;
    pointer-events:none ;
    text-decoration:none ;
    font-family: 'Teko', sans-serif;
    font-size:40px ;

`
export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
  font-size:30px ;
  color:#1890ff ;

`

export const ItemsContainer = styled.div`
    display:grid ;
    grid-template-columns: 1fr 1fr ;

    
`
export const RowContainer = styled.div`

`
export const Item = styled.div`
    font-size:medium ;
    font-weight:bold ;
`