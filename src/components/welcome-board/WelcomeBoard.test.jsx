import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import { DeparturesBoard } from './WelcomeBoard'

vi.mock('@react-three/drei', () => ({ Html: () => null }))

beforeEach(() => {
    vi.stubGlobal('matchMedia', () => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() }))
})
afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); vi.restoreAllMocks() })

const handlers = () => ({ onNavigate: vi.fn(), onLookAround: vi.fn(), onFocus: vi.fn(), onToggleSound: vi.fn() })

test('departures and footer controls invoke their own scene actions', () => {
    const actions = handlers()
    const { rerender } = render(<DeparturesBoard active focused soundEnabled {...actions} />)
    for (const [name, area] of [['ABOUT ME', 'aboutmeArea'], ['PROJECTS', 'projectsArea'], ['SKILLS', 'skillsArea'], ['LinkedIn (opens in a new tab)', 'linkedinArea']]) {
        fireEvent.click(screen.getByRole('button', { name, exact: true }))
        expect(actions.onNavigate).toHaveBeenLastCalledWith(area)
    }
    fireEvent.click(screen.getByRole('button', { name: 'DRAG TO LOOK AROUND' }))
    fireEvent.click(screen.getByRole('button', { name: 'FOCUS ON BOARD' }))
    fireEvent.click(screen.getByRole('button', { name: 'SOUND ON' }))
    expect(actions.onLookAround).toHaveBeenCalledOnce()
    expect(actions.onFocus).toHaveBeenCalledOnce()
    expect(actions.onToggleSound).toHaveBeenCalledOnce()
    rerender(<DeparturesBoard active focused={false} soundEnabled={false} {...actions} />)
    expect(screen.getByRole('button', { name: 'SOUND OFF' }).getAttribute('aria-pressed')).toBe('false')
    expect(screen.getByRole('button', { name: 'DRAG TO LOOK AROUND' }).getAttribute('aria-pressed')).toBe('true')
})

test('reduced motion renders every flight field settled without starting animations', async () => {
    vi.useFakeTimers()
    const { container } = render(<DeparturesBoard active {...handlers()} />)
    await act(async () => { await vi.runAllTimersAsync() })
    expect(container.querySelectorAll('.flap-leaf')).toHaveLength(0)
    expect(vi.getTimerCount()).toBe(0)
    for (const cell of container.querySelectorAll('.flap')) expect(cell.dataset.character).toBe(cell.dataset.final)
})

test('flips wait for camera arrival and cancel if the camera leaves again', async () => {
    vi.useFakeTimers()
    vi.stubGlobal('matchMedia', () => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }))
    const pending = new Set()
    const animate = vi.fn(() => {
        let reject
        const finished = new Promise((_, fail) => { reject = fail })
        const animation = { finished, cancel: () => { pending.delete(animation); reject(new Error('cancelled')) } }
        pending.add(animation)
        return animation
    })
    Object.defineProperty(Element.prototype, 'animate', { configurable: true, value: animate })
    try {
        const { container, rerender } = render(<DeparturesBoard active animationReady={false} {...handlers()} />)
        await act(async () => { await vi.advanceTimersByTimeAsync(5000) })
        expect(animate).not.toHaveBeenCalled()
        expect(vi.getTimerCount()).toBe(0)
        rerender(<DeparturesBoard active animationReady {...handlers()} />)
        await act(async () => { await vi.advanceTimersByTimeAsync(1) })
        expect(animate).toHaveBeenCalled()
        rerender(<DeparturesBoard active animationReady={false} {...handlers()} />)
        expect(pending.size).toBe(0)
        expect(vi.getTimerCount()).toBe(0)
        expect(container.querySelectorAll('.flap-leaf')).toHaveLength(0)
    } finally { delete Element.prototype.animate }
})

test('leaving the welcome board cancels flips and stagger timers, then restores final labels', async () => {
    vi.useFakeTimers()
    vi.stubGlobal('matchMedia', () => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }))
    const pending = new Set()
    const animate = vi.fn(() => {
        let reject
        const finished = new Promise((_, fail) => { reject = fail })
        const animation = { finished, cancel: vi.fn(() => { pending.delete(animation); reject(new Error('cancelled')) }) }
        pending.add(animation)
        return animation
    })
    Object.defineProperty(Element.prototype, 'animate', { configurable: true, value: animate })
    try {
        const actions = handlers()
        const { container, rerender } = render(<DeparturesBoard active {...actions} />)
        await act(async () => { await vi.advanceTimersByTimeAsync(1) })
        expect(animate).toHaveBeenCalled()
        expect(pending.size).toBeGreaterThan(0)
        await act(async () => { rerender(<DeparturesBoard active={false} {...actions} />) })
        expect(pending.size).toBe(0)
        expect(vi.getTimerCount()).toBe(0)
        expect(container.querySelectorAll('.flap-leaf')).toHaveLength(0)
        expect(container.querySelector('section').hasAttribute('inert')).toBe(true)
        for (const cell of container.querySelectorAll('.flap')) expect(cell.dataset.character).toBe(cell.dataset.final)
    } finally {
        delete Element.prototype.animate
    }
})
