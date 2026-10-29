import { useEffect } from "react"
import { useState } from "react"

const useTabInUse = () => {
    const [tabFocused, setTabFocused] = useState(() => document.visibilityState === 'visible')

    useEffect(() => {
        const listener = () => setTabFocused(document.visibilityState === 'visible')
        document.addEventListener('visibilitychange', listener)
        listener()

        return ()=>document.removeEventListener('visibilitychange',listener)

    },[])
    return tabFocused

}

export default useTabInUse
