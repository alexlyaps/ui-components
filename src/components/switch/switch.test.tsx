import { render, screen } from '@testing-library/react'
import { Switch } from './switch'
import userEvent from '@testing-library/user-event'

describe('Switch', () => {
  it('renders with role=switch and correct aria-checked state', () => {
    render(<Switch checked={false} onChange={() => {}} />)

    const switchElement = screen.getByRole('switch')

    expect(switchElement).toBeInTheDocument()
    expect(switchElement).toHaveAttribute('aria-checked', 'false')
  })
  it('calls onChange with the correct value when clicked', async () => {
    const onChange = vi.fn()
    render(<Switch checked={false} onChange={onChange} />)

    const switchElement = screen.getByRole('switch')
    await userEvent.click(switchElement)

    expect(onChange).toHaveBeenCalledWith(true)
  })
  it('toggles when space is pressed', async () => {
    const onChange = vi.fn()
    render(<Switch checked={false} onChange={onChange} />)

    const switchElement = screen.getByRole('switch')
    switchElement.focus()
    await userEvent.keyboard('{Space}')

    expect(onChange).toHaveBeenCalledWith(true)
  })
  it('can be disabled', async () => {
    const onChange = vi.fn()
    render(<Switch checked={false} onChange={onChange} disabled />)

    const switchElement = screen.getByRole('switch')
    await userEvent.click(switchElement)

    expect(onChange).not.toHaveBeenCalled()
  })
  it('receives focus when navigating with Tab', async () => {
    render(<Switch checked={false} onChange={() => {}} />)

    await userEvent.tab()

    const switchElement = screen.getByRole('switch')
    expect(switchElement).toHaveFocus()
  })
  it('updates aria-checked when checked prop changes', () => {
    const { rerender } = render(<Switch checked={false} onChange={() => {}} />)

    const switchElement = screen.getByRole('switch')
    expect(switchElement).toHaveAttribute('aria-checked', 'false')

    rerender(<Switch checked={true} onChange={() => {}} />)

    expect(switchElement).toHaveAttribute('aria-checked', 'true')
  })
})
