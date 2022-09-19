import { useEffect } from "react"
import { useState } from "react"

const useTabInUse = () => {
    const [tabFoucsed, setTabFocused] = useState(true)

    useEffect(() => {
        const listener = document.addEventListener('visibilitychange',()=>{
            if (document.visibilityState==='visible'){
                setTabFocused(true)
            }else{
                setTabFocused(false)
            }
        })

        return ()=>document.removeEventListener('visibilitychange',listener)

    },[tabFoucsed])
    return tabFoucsed

}

export default useTabInUse