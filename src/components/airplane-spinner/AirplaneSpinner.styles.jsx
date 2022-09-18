import styled,{keyframes}from "styled-components";


const spinRight = keyframes`
      100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`

const flying = keyframes`
     .text-shadow (@color, @x, @y, @diffuse){
   -moz-text-shadow: @color @x @y @diffuse;
   -webkit-text-shadow: @color @x @y @diffuse;
   text-shadow: @color @x @y @diffuse;
 }

 0% {
   .text-shadow(rgba(0,0,0,0.42), 0px, 0px, 0px);
   font-size: 60px;
 }

 15% {
   .text-shadow(rgba(0,0,0,0.42), 3px, 3px, 3px);
   font-size: 63px;
 }

 25% {
   .text-shadow(rgba(0,0,0,0.42), 10px, 10px, 20px);
   font-size: 70px;
 }

 50% {
   .text-shadow(rgba(0,0,0,0.42), 10px, -10px, 20px);
 }

 75% {
   .text-shadow(rgba(0,0,0,0.42), -10px, -10px, 20px);
   font-size: 70px;
 }

 85% {
   .text-shadow(rgba(0,0,0,0.42), -3px, -3px, 3px);
   font-size: 63px;
 }

 100% {
   .text-shadow(rgba(0,0,0,0.42), 0px, 0px, 0px);
   font-size: 60px;
 }

`
export const Container = styled.div`
    position: absolute;
    z-index: 500;
    height: 100%;
    width: 100%;
    text-align: center;

`
export const SpinningContainer = styled.div`
      overflow: hidden;
  position: relative;
  display: inline-block;
  height: 75%;
  animation: ${spinRight} 8s ease-in-out infinite;
  padding: 25px;

`
export const AirplaneCointainer = styled.div`
      transform: rotate(45deg);
      
    .fa.fa-plane{
        border:1px solid red ;
        width:100px ;
        height:100px;
        margin: 0;
        color: #00ACE4;
        animation: ${flying} 8s linear infinite;
  }

`