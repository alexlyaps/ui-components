import { useContext, createContext, useRef, useState } from 'react'
import { cn } from '@/utils/cn'
import { Button } from '../button'

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

  return <MenuContext.Provider value={{ open, setOpen, triggerRef }}>{children}</MenuContext.Provider>
}

export const MenuTrigger = ({ children }: { children: React.ReactNode | string; asChild?: boolean }) => {
  const { open, setOpen } = useMenuContext()

  const handleClick = () => {
    setOpen((open) => !open)
  }

  if (typeof children === 'string') {
    return <Button onClick={handleClick}>{children}</Button>
  }

  return (
    <Button label={'blank'} aria-expanded={open} aria-haspopup="menu" onClick={handleClick}>
      {children}
    </Button>
  )
}

export const MenuContent = ({ children }: { children: React.ReactNode }) => {
  const { open } = useMenuContext()

  if (!open) return null

  return (
    <div
      className={cn(
        'absolute mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
        'z-10'
      )}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
    >
      {children}
    </div>
  )
}

export const MenuItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={cn('block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900', 'cursor-pointer')}
      role="menuitem"
    >
      {children}
    </div>
  )
}
