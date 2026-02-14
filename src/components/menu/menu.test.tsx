import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Menu, MenuTrigger, MenuContent, MenuItem } from './menu'

describe('Menu', () => {
  it('opens menu on trigger click', async () => {
    render(
      <Menu>
        <MenuTrigger>Open</MenuTrigger>
        <MenuContent>
          <MenuItem>Item 1</MenuItem>
        </MenuContent>
      </Menu>
    )

    // Меню изначально скрыто
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument()

    // Кликаем по триггеру
    await userEvent.click(screen.getByText('Open'))

    // Меню появляется
    expect(screen.getByText('Item 1')).toBeInTheDocument()
  })
})
