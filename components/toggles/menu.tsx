"use client"

import React, { forwardRef, type HTMLProps } from "react"

import { IconButton } from "components/ui"
import { Hamburger, XMark } from "components/icons"

type ButtonProps = HTMLProps<HTMLButtonElement>
export interface MenuToggleProps extends ButtonProps {
  type?: "button" | "submit" | "reset"
  className?: string
  isOpen?: boolean
  openIcon?: () => JSX.Element
  closeIcon?: () => JSX.Element
}

export const MenuToggle = forwardRef<HTMLButtonElement, MenuToggleProps>(function MenuToggle(
  props,
  ref
) {
  const {
    className = "",
    isOpen,
    type: buttonType,
    openIcon = Hamburger,
    closeIcon = XMark,
    ...rest
  } = props
  const MenuIcon = isOpen ? closeIcon : openIcon
  const action = isOpen ? "Close" : "Open"

  return (
    <IconButton
      className={className}
      aria-label={`${action} navigation menu`}
      isRound={false}
      type={buttonType ?? "button"}
      // this should work but ts is being annoying
      // @ts-ignore
      ref={ref}
      {...rest}
    >
      <MenuIcon />
    </IconButton>
  )
})
