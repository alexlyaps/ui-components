export type SelectOption = {
  value: string
  label: string
}

export type SelectProps = {
  placeholder?: string
  options: SelectOption[]
  value?: string | null
  onChange?: (value: string) => void
  className?: string
  errorMessage?: string
}
