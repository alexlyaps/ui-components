export type ButtonProps = {
  onClick: () => void
  disabled?: boolean
  className?: string
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'small' | 'medium' | 'large'
  type?: 'button' | 'submit' | 'reset'
  ref?: React.Ref<HTMLButtonElement> | null
  children: string | React.ReactNode
}
