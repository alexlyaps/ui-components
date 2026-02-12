import type { Meta, StoryObj } from '@storybook/react-vite'
import { Dialog } from './dialog'
import { useState } from 'react'

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
        {/* Кнопка для открытия диалога */}
        <button onClick={() => setOpen(true)} className="px-4 py-2 bg-blue-500 text-white ">
          Open Dialog
        </button>

        {/* Диалог */}
        <Dialog {...args} open={open} onOpenChange={setOpen} className="w-96 p-6 ">
          <h2 className="text-lg font-bold mb-4">Dialog Title</h2>
          <p className="mb-4">This is some content inside the dialog.</p>
          <button onClick={() => setOpen(false)} className="px-3 py-1 bg-red-500 text-white ">
            Close
          </button>
        </Dialog>
      </div>
    )
  },
}
