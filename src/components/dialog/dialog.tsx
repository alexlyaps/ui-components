import { useEffect, useRef } from 'react'
import type { DialogProps } from './dialog.types'
import { cn } from '@/utils/cn'
import { Plus } from 'lucide-react'

export const Dialog = ({ open, onOpenChange, className, children }: DialogProps) => {
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false)
    }

    if (open) document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [open, onOpenChange])

  // Focus trap
  useEffect(() => {
    if (!open || !dialogRef.current) return

    const focusableSelectors = [
      'a[href]',
      'button',
      'input',
      'select',
      'textarea',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',')

    const focusableEls = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(focusableSelectors))
    if (focusableEls.length > 0) focusableEls[0].focus()

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const first = focusableEls[0]
      const last = focusableEls[focusableEls.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleTab)
    return () => document.removeEventListener('keydown', handleTab)
  }, [open])

  if (!open) return null

  return (
    <div
      role="overlay"
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-10"
      onClick={() => onOpenChange(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        ref={dialogRef}
        className={cn('relative border bg-white max-w-1/2 max-h-1/2 p-4 z-20 overflow-y-auto', className)}
        onClick={(e) => e.stopPropagation()}
      >
        <Plus
          onClick={() => onOpenChange(false)}
          color={'grey'}
          className="absolute top-2 right-2 cursor-pointer rotate-45"
        />
        {children}
      </div>
    </div>
  )
}
