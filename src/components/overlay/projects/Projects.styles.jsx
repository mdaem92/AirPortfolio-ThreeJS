import styled, { css } from "styled-components"

const mobileCss = css`
    width:22rem;
    /* background-color:red ; */
    position: relative ;
    right:-15px ;
    top:-30px ;
`

export const OverlayContainer = styled.div`
    background-color:black;
    color: white;
    width:35rem;
    height:40rem;
    opacity:0.8;
    border-radius:10px ;
    padding:20px ;

    font-family: 'Teko', sans-serif;
    font-size:40px ;

    .ant-carousel .slick-dots li button {
    background: #1890ff;
    opacity: 0.4;
    height: 8px;

}

.ant-carousel .slick-dots li.slick-active button {
    opacity: 1;
    background: #1890ff;
    height: 8px;
}
${props=>props.isMobile && mobileCss}

`
export const ItemContainer = styled.div`
    /* height: '160px';
    color: '#fff';
    line-height: '160px';
    text-align: 'center';
    background: '#364d79';
    display:flex ;
    align-items:center ;
    justify-content:center ;
    transition: 1s cubic-bezier(0.39,0.575,0.565,1) ;
    border:1px solid red ;
    width:30%; */
    /* height: "35rem"; */
    color: "#fff";
    line-height: "160px";
    text-align: "center";
    background: "#364d79";
`