import {useState,useLayoutEffect} from 'react'

const useWindowWidth = () => {

    const [innerWidth, setInnerWidth] = useState(window.innerWidth)
    useLayoutEffect(() => {
        function updateWidth() {
            setInnerWidth(window.innerWidth)
        }
        window.addEventListener('resize', updateWidth)
        updateWidth()
        return () => window.removeEventListener('resize', updateWidth)
    }, [])
    
    return innerWidth
}
export default useWindowWidth