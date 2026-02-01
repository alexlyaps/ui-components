type BaseButtonProps = {
  onClick: () => void
  disabled?: boolean
  className?: string
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'small' | 'medium' | 'large'
  type?: 'button' | 'submit' | 'reset'
}

export type TextButtonProps = {
  children: string
  label?: string
} & BaseButtonProps

export type IconButtonProps = {
  children: React.ReactNode
  label: string
} & BaseButtonProps

export type ButtonProps = TextButtonProps | IconButtonProps
