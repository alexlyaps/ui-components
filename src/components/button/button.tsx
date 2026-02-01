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
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        danger: 'bg-red-600 text-white hover:bg-red-700',
      },
      size: {
        small: 'text-sm',
        medium: 'text-base',
        large: 'text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  })

  const ariaLabel = typeof children === 'string' ? children : label

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(buttonVariants({ variant, size }), className)}
      aria-label={ariaLabel}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}
