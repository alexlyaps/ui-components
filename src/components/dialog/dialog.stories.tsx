import type { Meta, StoryObj } from '@storybook/react-vite'
import { Dialog } from './dialog'
import { useState } from 'react'
import { Button } from '@/components/button'

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  args: {
    className: '',
    children: null,
    open: false,
    onOpenChange: () => {},
  },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false)

    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>

        <Dialog {...args} open={open} onOpenChange={setOpen} className="w-96 p-6 ">
          <h2 className="text-lg font-bold mb-4">Dialog Title</h2>
          <p className="mb-4">This is some content inside the dialog.</p>
          <Button onClick={() => setOpen(false)} variant="danger">
            Close
          </Button>
        </Dialog>
      </div>
    )
  },
}

export const Scrolled: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false)

    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>

        <Dialog {...args} open={open} onOpenChange={setOpen} className="w-96 p-6 ">
          <h2 className="text-lg font-bold mb-4">Dialog Title</h2>
          {new Array(33).fill(null).map((_, index) => (
            <p key={index} className="mb-4">
              This is some content inside the dialog.
            </p>
          ))}
          <Button onClick={() => setOpen(false)} variant="danger">
            Close
          </Button>
        </Dialog>
      </div>
    )
  },
}
