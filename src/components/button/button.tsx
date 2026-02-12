import type { ButtonProps as Props } from './button.types'
import { cva } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const buttonVariants = cva('px-4 py-2  focus:outline-none focus:ring-2 focus:ring-offset-2', {
  variants: {
    variant: {
      primary: 'bg-primary text-white hover:bg-primary-dark disabled:bg-primary-light disabled:cursor-not-allowed',
      secondary:
        'bg-secondary text-gray-900 hover:bg-secondary-dark disabled:bg-secondary-light disabled:cursor-not-allowed',
      danger: 'bg-danger text-white hover:bg-danger-dark disabled:bg-danger-light disabled:cursor-not-allowed',
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
