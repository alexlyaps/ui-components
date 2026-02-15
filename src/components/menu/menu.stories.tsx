import type { Meta, StoryObj } from '@storybook/react-vite'
import { Menu, MenuTrigger, MenuContent, MenuItem } from './menu'

const meta = {
  title: 'Components/Menu',
  component: Menu,
  args: {
    children: (
      <>
        <MenuTrigger>Menu</MenuTrigger>
        <MenuContent>
          <MenuItem>Item 1</MenuItem>
          <MenuItem>Item 2</MenuItem>
        </MenuContent>
      </>
    ),
  },
} satisfies Meta<typeof Menu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
