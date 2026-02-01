import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './button'
import { Check as CheckIcon } from 'lucide-react'

const meta = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Button',
    onClick: () => {},
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
}

export const Danger: Story = {
  args: {
    variant: 'danger',
  },
}

export const WithIcon: Story = {
  args: {
    variant: 'primary',
    children: <CheckIcon />,
    label: 'Check',
  },
}
