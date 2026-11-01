import { useSyncExternalStore } from 'react'

const query = '(min-width: 900px) and (pointer: fine)'
const media = window.matchMedia(query)
const subscribe = callback => {
    media.addEventListener('change', callback)
    return () => media.removeEventListener('change', callback)
}
const getSnapshot = () => media.matches

export default function useDesktopShadows() {
    return useSyncExternalStore(subscribe, getSnapshot)
}
