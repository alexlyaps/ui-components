import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Dialog } from './dialog'
import { useState } from 'react'

describe('Dialog', () => {
  it('renders children when open is true', () => {
    render(
      <Dialog open={true} onOpenChange={() => {}}>
        <div>Content</div>
      </Dialog>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('doesnt render children when open is false', () => {
    render(
      <Dialog open={false} onOpenChange={() => {}}>
        <div>Content</div>
      </Dialog>
    )
    expect(screen.queryByText('Content')).not.toBeInTheDocument()
  })

  it('overlay click calls onOpenChange with false', async () => {
    const Wrapper = () => {
      const [open, setOpen] = useState(true)

      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <div>Content</div>
        </Dialog>
      )
    }

    render(<Wrapper />)
    const overlay = screen.getByRole('overlay')
    if (overlay) {
      await userEvent.click(overlay)
    }
    expect(screen.queryByText('Content')).not.toBeInTheDocument()
  })

  it('dialog click does not call onOpenChange', async () => {
    const Wrapper = () => {
      const [open, setOpen] = useState(true)

      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <div>Content</div>
        </Dialog>
      )
    }

    render(<Wrapper />)
    const dialog = screen.getByRole('dialog')
    if (dialog) {
      await userEvent.click(dialog)
    }
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('Esc key pressed calls onOpenChange with false', async () => {
    const Wrapper = () => {
      const [open, setOpen] = useState(true)

      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <div>Content</div>
        </Dialog>
      )
    }

    render(<Wrapper />)
    await userEvent.keyboard('{Escape}')
    expect(screen.queryByText('Content')).not.toBeInTheDocument()
  })
})
