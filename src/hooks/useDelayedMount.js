import { useEffect, useState } from "react"

const useDelayedMount = (delay)=>{

    const [isShown,setIsShown] = useState(false)

    useEffect(()=>{
        const timer = setTimeout(() => {
            setIsShown(true)
        }, delay);
        return ()=>{
            clearTimeout(timer)
        }
    },[delay])

    return isShown

}

export default useDelayedMount