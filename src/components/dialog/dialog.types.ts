export type DialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  className?: string
  children: React.ReactNode
}
