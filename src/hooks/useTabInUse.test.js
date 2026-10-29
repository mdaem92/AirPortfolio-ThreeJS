import { vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import useTabInUse from './useTabInUse'

afterEach(() => { vi.restoreAllMocks(); delete document.visibilityState })

test('tracks visibility without accumulating listeners and cleans up on unmount', () => {
    let visibility = 'hidden'
    Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => visibility })
    const add = vi.spyOn(document, 'addEventListener')
    const remove = vi.spyOn(document, 'removeEventListener')
    const { result, unmount } = renderHook(useTabInUse)
    expect(result.current).toBe(false)
    for (const state of ['visible', 'hidden', 'visible']) {
        act(() => { visibility = state; document.dispatchEvent(new Event('visibilitychange')) })
        expect(result.current).toBe(state === 'visible')
    }
    const subscriptions = add.mock.calls.filter(([event]) => event === 'visibilitychange')
    expect(subscriptions).toHaveLength(1)
    unmount()
    expect(remove).toHaveBeenCalledWith('visibilitychange', subscriptions[0][1])
})
