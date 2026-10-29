import { vi } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import SceneAudio from './SceneAudio.component'

vi.mock('@react-three/drei', () => ({ PositionalAudio: () => <span>sound mounted</span> }))

afterEach(() => { delete document.visibilityState })

test('sound mounts only after Start and stops while the tab is hidden', () => {
    let visibility = 'visible'
    Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => visibility })
    const { rerender } = render(<SceneAudio ready={false} url='/audio/test.mp3' />)
    expect(screen.queryByText('sound mounted')).toBeNull()
    rerender(<SceneAudio ready url='/audio/test.mp3' />)
    expect(screen.getByText('sound mounted')).toBeTruthy()
    act(() => { visibility = 'hidden'; document.dispatchEvent(new Event('visibilitychange')) })
    expect(screen.queryByText('sound mounted')).toBeNull()
    act(() => { visibility = 'visible'; document.dispatchEvent(new Event('visibilitychange')) })
    expect(screen.getByText('sound mounted')).toBeTruthy()
})
