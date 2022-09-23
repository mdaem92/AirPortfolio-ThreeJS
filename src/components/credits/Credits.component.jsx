import { ArrowLeftOutlined } from '@ant-design/icons'
import React from 'react'
import useDelayedMount from '../../hooks/useDelayedMount'
import useWindowWidth from '../../hooks/useWindowWidth'
import { OverlayContainer, } from './Credits.styles'
const Credits = ({ exitFocus }) => {

    const isShown = useDelayedMount(300)
    const isMobile = useWindowWidth() <= 600

    const handleClick = () => {
        exitFocus()
    }

    return isShown && (
        <OverlayContainer isMobile={isMobile}>
            <ArrowLeftOutlined onClick={handleClick}/>
            <div>
                <a href="https://icons8.com/icon/13441/python" target={'blank'}><span>Python</span></a> <span>icon by </span><a href="https://icons8.com" target={'blank'}><span>Icons8</span></a>

            </div>
            <div>
                <a href="https://www.freepik.com/free-vector/airport-service-signs-vector-set_3529200.htm#query=plane%20icon&position=12&from_view=keyword" target={'blank'}>Image by rawpixel.com</a><span> on Freepik</span>

            </div>
            <div>
                <a href="https://www.vecteezy.com/free-vector/right-click" target={'blank'}><span>Right Click Vectors by Vecteezy</span></a>
            </div>
            <div>
                <a href="https://www.freepik.com/free-vector/social-media-icons-vector-set-with-facebook-instagram-twitter-tiktok-youtube-logos_17221200.htm#query=linkedin&position=0&from_view=search" target={'blank'}><span>Image by rawpixel.com</span></a> <span>on Freepik</span>
            </div>
            <div>
                <a href="https://www.freepik.com/free-vector/social-media-icons-vector-set-with-facebook-instagram-twitter-tiktok-youtube-logos_17221200.htm#query=linkedin&position=0&from_view=search" target={'blank'}><span>Image by rawpixel.com</span></a> <span>on Freepik</span>

            </div>
            <div>
                <a href="https://worldvectorlogo.com" target={'blank'}><span>programming languages svg icons</span></a> 
            </div>
             
            <div>
                <a href="https://www.flaticon.com/free-icons/return" title="return icons" target={'blank'}><span>Return icons created by Freepik - Flaticon</span></a>

            </div>
            <div>
                <a href="https://www.pixabay.com/sound-effects ," target={'blank'} title="All sound effects"><span>Sound Effects by Pixabay</span></a>

            </div>

        </OverlayContainer>
    )
}

export default Credits