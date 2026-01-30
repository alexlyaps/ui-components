import type { ButtonProps as Props } from './button.types'

export const Button = ({ children, onClick, disabled }: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
    >
      {children}
    </button>
  )
}
