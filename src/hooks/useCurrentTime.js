import { useEffect, useState } from 'react'
import moment from 'moment'

const useCurrentTime = ()=>{
    const [date,setDate] = useState(moment())
    useEffect(()=>{
        const timer = setInterval(()=>setDate(moment()),60000)
        return()=>{
            clearInterval(timer)
        }
    })
    return date
}
export default useCurrentTime