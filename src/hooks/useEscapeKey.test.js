import { vi } from 'vitest'
import { fireEvent, renderHook } from '@testing-library/react'
import useEscapeKey from './useEscapeKey'

test('handles one Escape press, ignores repeats, and uses the latest callback', () => {
    const first = vi.fn()
    const second = vi.fn()
    const { rerender, unmount } = renderHook(({ callback }) => useEscapeKey(callback), { initialProps: { callback: first } })
    fireEvent.keyDown(window, { key: 'Escape' })
    fireEvent.keyDown(window, { key: 'Escape', repeat: true })
    fireEvent.keyUp(window, { key: 'Escape' })
    fireEvent.keyDown(window, { key: 'Enter' })
    expect(first).toHaveBeenCalledTimes(1)
    rerender({ callback: second })
    fireEvent.keyDown(window, { key: 'Escape' })
    expect(second).toHaveBeenCalledTimes(1)
    expect(first).toHaveBeenCalledTimes(1)
    unmount()
    fireEvent.keyDown(window, { key: 'Escape' })
    expect(second).toHaveBeenCalledTimes(1)
})
