import type React from 'react'

type Props = {
  children: React.ReactNode
  onClick?: () => void
}

export const Button = ({ children, onClick }: Props) => {
  return <button onClick={onClick}>{children}</button>
}
