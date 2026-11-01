import { fireEvent, render, screen } from '@testing-library/react'
import { AboutInformation } from './AboutBoard'

vi.mock('@react-three/drei', () => ({ Html: () => null }))

test('About information presents the updated profile and returns through its own button', () => {
    const onBack = vi.fn()
    const parentClick = vi.fn()
    render(<div onClick={parentClick}><AboutInformation onBack={onBack} /></div>)
    expect(screen.getByRole('heading', { name: 'Meet Mahyar' })).toBeTruthy()
    expect(screen.getByText(/AI-assisted development and workflow automation/)).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'BACK TO DEPARTURES' }))
    expect(onBack).toHaveBeenCalledOnce()
    expect(parentClick).not.toHaveBeenCalled()
})
