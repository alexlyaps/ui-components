export type InputProps = {
  type?: 'text' | 'password' | 'email' | 'number'
  placeholder?: string
  value?: string | number
  onChange: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
  onEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  ref?: React.Ref<HTMLInputElement>
  disabled?: boolean
  className?: string
  error?: boolean
  readOnly?: boolean
  onIconClick?: () => void
  leftSlot?: React.ReactNode
  rightSlot?: React.ReactNode
}
