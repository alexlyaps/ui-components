import type { Meta, StoryObj } from '@storybook/react-vite'
import { Select } from './select'
import { useState } from 'react'

const meta = {
  title: 'Components/Select',
  component: Select,
  args: {
    placeholder: 'Выберите фреймворк',
    options: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue.js' },
      { value: 'angular', label: 'Angular' },
    ],
    value: '',
    onChange: () => {},
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>(null)

    return (
      <Select
        {...args}
        value={value}
        onChange={setValue}
        options={[
          { value: 'react', label: 'React' },
          { value: 'vue', label: 'Vue.js' },
          { value: 'angular', label: 'Angular' },
        ]}
        placeholder="Выберите фреймворк"
      />
    )
  },
}

export const Disabled: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>(null)

    return (
      <Select
        {...args}
        value={value}
        onChange={setValue}
        options={[
          { value: 'react', label: 'React' },
          { value: 'vue', label: 'Vue.js' },
          { value: 'angular', label: 'Angular' },
        ]}
        placeholder="Выберите фреймворк"
        disabled
      />
    )
  },
}

export const Error: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>(null)

    return (
      <Select
        {...args}
        value={value}
        onChange={setValue}
        options={[
          { value: 'react', label: 'React' },
          { value: 'vue', label: 'Vue.js' },
          { value: 'angular', label: 'Angular' },
        ]}
        placeholder="Выберите фреймворк"
        error
        errorMessage="Пожалуйста, выберите фреймворк"
      />
    )
  },
}
