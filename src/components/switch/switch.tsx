import type { SwitchProps as Props } from './switch.types'
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

export const Switch = ({
  checked = false,
  onChange,
  disabled,
  className,
  variant = 'primary',
  size = 'medium',
  ref,
  ...props
}: Props) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Space') {
      event.preventDefault()
      onChange?.(!checked)
    }
  }

  return (
    <button
      onClick={() => onChange && onChange(!checked)}
      disabled={disabled}
      className={cn(buttonVariants({ variant, size, disabled }), className)}
      aria-checked={checked}
      role="switch"
      ref={ref}
      onKeyDown={handleKeyDown}
      {...props}
    />
  )
}
