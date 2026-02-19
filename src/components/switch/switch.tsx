import React, { forwardRef } from 'react'
import type { SwitchProps } from './switch.types'
import { cva } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const switchTrackVariants = cva(
  'relative inline-flex items-center  transition-colors focus:outline-none focus:ring-1 focus:ring-offset-1',
  {
    variants: {
      variant: {
        primary: 'bg-primary',
        secondary: 'bg-secondary',
        danger: 'bg-danger',
      },
      size: {
        small: 'w-8 h-4',
        medium: 'w-10 h-5',
        large: 'w-12 h-6',
      },
      checked: {
        true: '',
        false: 'bg-gray-300',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
        false: 'cursor-pointer',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
      disabled: false,
    },
  }
)

const switchThumbVariants = cva('absolute bg-white  transition-transform', {
  variants: {
    size: {
      small: 'w-3 h-3',
      medium: 'w-4 h-4',
      large: 'w-5 h-5',
    },
    checked: {
      true: '',
      false: '',
    },
  },
})

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked = false, onChange, disabled = false, className, variant = 'primary', size = 'medium', ...props }, ref) => {
    const handleClick = () => {
      if (disabled) return
      onChange?.(!checked)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'Space' || event.key === 'Enter') {
        event.preventDefault()
        onChange?.(!checked)
      }
    }

    return (
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        ref={ref}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(switchTrackVariants({ variant, size, checked, disabled }), className)}
        {...props}
      >
        <span
          className={cn(
            switchThumbVariants({ size }),
            size === 'small' && 'left-0.5',
            size === 'medium' && 'left-0.5',
            size === 'large' && 'left-0.5',
            checked && (size === 'small' ? 'translate-x-4' : size === 'medium' ? 'translate-x-5' : 'translate-x-6')
          )}
        />
      </button>
    )
  }
)

Switch.displayName = 'Switch'
