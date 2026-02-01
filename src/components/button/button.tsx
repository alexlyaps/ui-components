import type { ButtonProps as Props } from './button.types'
import { cva } from 'class-variance-authority'
import { cn } from '@/utils/cn'

export const Button = ({
  children,
  onClick,
  disabled,
  className,
  variant = 'primary',
  size = 'medium',
  label,
  type = 'button',
  ...props
}: Props) => {
  const buttonVariants = cva('px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2', {
    variants: {
      variant: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed',
        danger: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed',
      },
      size: {
        small: 'text-sm',
        medium: 'text-base',
        large: 'text-lg',
      },
      disabled: {
        true: 'cursor-not-allowed opacity-50',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
      disabled: false,
    },
  })

  const ariaLabel = typeof children === 'string' ? children : label

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(buttonVariants({ variant, size, disabled }), className)}
      aria-label={ariaLabel}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}
