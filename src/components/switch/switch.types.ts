export type SwitchProps = {
  checked: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  className?: string
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'small' | 'medium' | 'large'
  ref?: React.Ref<HTMLButtonElement> | null
}
