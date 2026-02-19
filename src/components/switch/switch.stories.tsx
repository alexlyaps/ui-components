import type { Meta, StoryObj } from '@storybook/react-vite'
import { Switch } from './switch'
import { useState } from 'react'
import type { SwitchProps } from './switch.types'

const meta = {
  title: 'Components/Switch',
  component: Switch,
  args: {
    checked: false,
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

const StatefulSwitch = (args: SwitchProps) => {
  const [checked, setChecked] = useState(args.checked)
  return <Switch {...args} checked={checked} onChange={setChecked} />
}

export const Primary: Story = {
  render: (args) => <StatefulSwitch {...args} />,
}
