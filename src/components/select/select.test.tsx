import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Select } from './select'
import { useState } from 'react'

const TEST_OPTIONS = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'angular', label: 'Angular' },
]

describe('Select', () => {
  it('renders placeholder', () => {
    render(<Select options={TEST_OPTIONS} placeholder="Выберите фреймворк" />)

    const combobox = screen.getByRole('combobox')
    expect(combobox).toHaveTextContent('Выберите фреймворк')
  })

  it("doesn't show options initially", () => {
    render(<Select options={TEST_OPTIONS} />)

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('shows options on click', async () => {
    const Wrapper = () => {
      const [value, setValue] = useState('')

      return <Select value={value} onChange={(val) => setValue(val)} options={TEST_OPTIONS} />
    }

    render(<Wrapper />)

    const combobox = screen.getByRole('combobox')
    await userEvent.click(combobox)

    expect(screen.getByRole('listbox')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('selects option on click', async () => {
    const onChange = vi.fn()

    const Wrapper = () => {
      const [value, setValue] = useState('')

      const handleChange = (val: string) => {
        setValue(val)
        onChange(val)
      }

      return <Select value={value} onChange={handleChange} options={TEST_OPTIONS} />
    }

    render(<Wrapper />)

    await userEvent.click(screen.getByRole('combobox'))
    await userEvent.click(screen.getByText('Vue.js'))

    expect(onChange).toHaveBeenCalledWith('vue')
    expect(screen.getByRole('combobox')).toHaveTextContent('Vue.js')
  })

  it('supports keyboard navigation', async () => {
    const onChange = vi.fn()

    const Wrapper = () => {
      const [value, setValue] = useState('')

      const handleChange = (val: string) => {
        setValue(val)
        onChange(val)
      }

      return <Select value={value} onChange={handleChange} options={TEST_OPTIONS} />
    }

    render(<Wrapper />)

    const combobox = screen.getByRole('combobox')

    combobox.focus()
    await userEvent.keyboard('{Enter}')
    await userEvent.keyboard('{ArrowDown}')
    await userEvent.keyboard('{Enter}')

    expect(combobox).toHaveTextContent('Vue.js')
  })

  it('closes on click outside', async () => {
    const onChange = vi.fn()

    render(<Select options={TEST_OPTIONS} onChange={onChange} />)
    const combobox = screen.getByRole('combobox')

    await userEvent.click(combobox)
    await userEvent.click(document.body)

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })
})
