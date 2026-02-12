import { useEffect, useRef, useState } from 'react'
import type { SelectProps, SelectOption } from './select.types'
import { cva } from 'class-variance-authority'
import { cn } from '@/utils/cn'
import { ChevronDown } from 'lucide-react'

const selectVariants = cva('w-full border  px-3 py-2 flex justify-between items-center focus-within:border-black ', {
  variants: {
    error: {
      true: 'border-red-500 focus:ring-red-500',
      false: 'border-gray-300 focus:ring-blue-500',
    },
    disabled: {
      true: 'bg-gray-100 cursor-not-allowed pointer-events-none opacity-50',
      false: 'bg-white',
    },
  },
  defaultVariants: {
    error: false,
    disabled: false,
  },
})

export const Select = ({
  placeholder,
  options,
  value,
  onChange,
  error = false,
  disabled = false,
  className,
  errorMessage,
}: SelectProps & { error?: boolean; disabled?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0)

  const triggerRef = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const toggleOpen = () => !disabled && setIsOpen((v) => !v)

  const selectOption = (option: SelectOption) => {
    if (disabled) return
    onChange?.(option.value)
    setIsOpen(false)
    triggerRef.current?.focus()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        setIsOpen(true)
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex((prev) => (prev + 1) % options.length)
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex((prev) => (prev - 1 + options.length) % options.length)
        break
      case 'Enter':
        e.preventDefault()
        selectOption(options[highlightedIndex])
        break
      case 'Escape':
        setIsOpen(false)
        triggerRef.current?.focus()
        break
    }
  }
  const selectedLabel = options.find((opt) => opt.value === value)?.label
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!triggerRef.current?.contains(e.target as Node) && !listRef.current?.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="relative w-60">
      <button
        ref={triggerRef}
        type="button"
        className={cn(selectVariants({ error, disabled }), className)}
        onClick={toggleOpen}
        onKeyDown={onKeyDown}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-disabled={disabled}
      >
        <span>{selectedLabel ?? placeholder}</span>
        <ChevronDown className="ml-2" />
      </button>
      {error && errorMessage && <p className="text-red-500 mt-1 text-sm">{errorMessage}</p>}
      {isOpen && (
        <div
          ref={listRef}
          className={cn('border  px-3 py-2 bg-white shadow-md absolute z-10 w-full max-h-60 overflow-auto')}
          role="listbox"
          tabIndex={-1}
        >
          {options.map((option, index) => {
            const isSelected = option.value === value
            const isHighlighted = index === highlightedIndex
            return (
              <div
                key={option.value}
                role="option"
                aria-selected={isSelected}
                className={cn(
                  'px-3 py-2 cursor-pointer',
                  isHighlighted && 'bg-gray-100',
                  isSelected && 'font-semibold'
                )}
                onMouseEnter={() => setHighlightedIndex(index)}
                onMouseDown={(e) => e.preventDefault()} // чтобы не терять фокус
                onClick={() => selectOption(option)}
              >
                {option.label}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
