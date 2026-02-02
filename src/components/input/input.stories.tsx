import type { Meta, StoryObj } from '@storybook/react-vite'
import { Check } from 'lucide-react'
import { Input } from './input'

const meta = {
  component: Input,
  args: {
    placeholder: 'Enter text here',
    onChange: () => {},
  },
  title: 'Components/Input',
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Text: Story = {
  args: {},
}

export const Number: Story = {
  args: {
    type: 'number',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const WithError: Story = {
  args: {
    error: true,
  },
}

export const WithRightIcon: Story = {
  args: {
    rightSlot: <Check />,
  },
}

export const WithLeftIcon: Story = {
  args: {
    leftSlot: <Check />,
  },
}
