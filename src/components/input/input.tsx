import type { InputProps as Props } from './input.types'
import { cva } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const inputVariants = cva(
  'border rounded px-3 py-2 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2',
  {
    variants: {
      error: {
        true: 'border-red-500 focus:ring-red-500',
        false: 'border-gray-300 focus:ring-blue-500',
      },
      disabled: {
        true: 'bg-gray-100 cursor-not-allowed pointer-events-none',
        false: 'bg-white',
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
)

export const Input = ({
  type = 'text',
  placeholder = 'Enter text here',
  value,
  onChange,
  disabled = false,
  className,
  error = false,
  readOnly = false,
  onFocus,
  onBlur,
  onEnter,
  ref,
  leftSlot,
  rightSlot,
  ...props
}: Props) => {
  return (
    <div className={cn(inputVariants({ disabled, error }), 'flex items-center', className)}>
      {leftSlot && <div className="mr-2 flex items-center">{leftSlot}</div>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        readOnly={readOnly}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={(e) => e.key === 'Enter' && onEnter?.(e)}
        className="w-full bg-transparent focus:outline-none border-none"
        ref={ref}
        {...props}
      />
      {rightSlot && <div className="ml-2 flex items-center">{rightSlot}</div>}
    </div>
  )
}
