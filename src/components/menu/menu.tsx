import { useContext, createContext, useRef, useState, useEffect, cloneElement } from 'react'
import { cn } from '@/utils/cn'
import { Button } from '../button'
import type { MenuTriggerChildProps, MenuTriggerProps } from './menu.types'

type MenuContextType = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  triggerRef: React.RefObject<HTMLButtonElement | null>
}

const MenuContext = createContext<MenuContextType | null>(null)

const useMenuContext = () => {
  const context = useContext(MenuContext)

  if (!context) {
    throw new Error('Menu components must be used within a MenuProvider')
  }

  return context
}

export const Menu = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [setOpen])

  return <MenuContext.Provider value={{ open, setOpen, triggerRef }}>{children}</MenuContext.Provider>
}

export const MenuTrigger = ({ children, className, asChild = false }: MenuTriggerProps) => {
  const { open, setOpen, triggerRef } = useMenuContext()

  const handleClick = () => {
    setOpen((open) => !open)
  }

  if (asChild) {
    const child = children as React.ReactElement<MenuTriggerChildProps>

    // eslint-disable-next-line react-hooks/refs
    return cloneElement(child, {
      onClick: handleClick,
      ref: triggerRef,
      className: cn(child.props.className, className),
    })
  }

  return (
    <Button
      aria-expanded={open}
      aria-haspopup="menu"
      onClick={handleClick}
      ref={triggerRef}
      className={cn('', className)}
    >
      {children}
    </Button>
  )
}

export const MenuContent = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const { open } = useMenuContext()

  if (!open) return null

  return (
    <div
      className={cn(
        'absolute mt-2 w-48  bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
        'z-10',
        className
      )}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
    >
      {children}
    </div>
  )
}

export const MenuItem = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <button
      type="button"
      className={cn(
        'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900',
        'cursor-pointer',
        className
      )}
      role="menuitem"
    >
      {children}
    </button>
  )
}
