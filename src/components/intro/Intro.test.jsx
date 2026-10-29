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
    fireEvent.click(screen.getByRole('link', { name: 'START' }))
    expect(screen.getByText('audio enabled')).toBeTruthy()
    expect(screen.queryByRole('link', { name: 'START' })).toBeNull()
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
    expect(screen.queryByRole('link', { name: 'START' })).toBeNull()
    await act(async () => { loaded = true; resolve(); await pending })
    expect(screen.getByRole('link', { name: 'START' })).toBeTruthy()
    expect(screen.getByText('audio disabled')).toBeTruthy()
})
