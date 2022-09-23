import styled from 'styled-components'

export const IntroContainer = styled.div`
    .fullscreen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 1s;
}

.bg {
  background: linear-gradient(to top, #0a0a0a, #181a1a, #1d1d1f);
}

.notready {
  color: #606060;
}

.clicked {
  pointer-events: none;
  opacity: 0;
}

/* a {
  pointer-events: all;
  cursor: pointer;
  color: inherit;
  text-decoration: none;
} */

/* a:hover {
  text-decoration: underline;
  color: #1790ff;
} */

`
export const AnchorContainer = styled.a`
    pointer-events: all;
    cursor: pointer;
    color: inherit;
    text-decoration: none;
    :hover{
        color: #1790ff;
    }
`