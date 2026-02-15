export type MenuTriggerPropsBaseSimple = React.HTMLAttributes<HTMLButtonElement> & {
  children: string
  asChild?: false
}

export type MenuTriggerPropsAsChild = {
  children: React.ReactElement
  asChild?: boolean
}

export type MenuTriggerProps =
  | MenuTriggerPropsBaseSimple
  | (MenuTriggerPropsAsChild & {
      className?: string
    })

export type MenuTriggerChildProps = React.HTMLAttributes<HTMLButtonElement> & {
  className?: string
  ref: React.Ref<HTMLButtonElement>
}
