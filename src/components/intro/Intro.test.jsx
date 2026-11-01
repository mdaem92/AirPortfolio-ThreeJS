import { StrictMode, useEffect } from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import Intro from './Intro.component'

function LoadedScene({ ready, onReady }) {
    useEffect(() => { onReady() }, [onReady])
    return <output>{ready ? 'audio enabled' : 'audio disabled'}</output>
}

test('an already-loaded scene enables Start in StrictMode without activating audio early', () => {
    render(<StrictMode><Intro><LoadedScene /></Intro></StrictMode>)
    expect(screen.getByText('audio disabled')).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Start exploring →' }))
    expect(screen.getByText('audio enabled')).toBeTruthy()
    expect(screen.queryByRole('button', { name: 'Start exploring →' })).toBeNull()
})

test('Start is unavailable while the scene is suspended', async () => {
    let loaded = false
    let resolve
    const pending = new Promise(done => { resolve = done })
    function LoadingScene(props) {
        if (!loaded) throw pending
        return <LoadedScene {...props} />
    }
    render(<Intro><LoadingScene /></Intro>)
    expect(screen.getByRole('button', { name: 'Preparing your flight…' }).disabled).toBe(true)
    await act(async () => { loaded = true; resolve(); await pending })
    expect(screen.getByRole('button', { name: 'Start exploring →' }).disabled).toBe(false)
    expect(screen.getByText('audio disabled')).toBeTruthy()
})
