import type { ButtonProps as Props } from './button.types'

export const Button = ({ children, onClick, disabled }: Props) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
