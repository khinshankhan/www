"use client"

import React, { forwardRef, type HTMLProps } from "react"

import { IconButton } from "components/ui"
import { Hamburger, XMark } from "components/icons"

type ButtonProps = HTMLProps<HTMLButtonElement>
export interface MenuToggleProps extends ButtonProps {
  type?: "button" | "submit" | "reset"
  className?: string
  isOpen?: boolean
}

export const MenuToggle = forwardRef<HTMLButtonElement, MenuToggleProps>(function MenuToggle(
  props,
  ref
) {
  const { className = "", isOpen, type: buttonType, ...rest } = props
  const MenuIcon = isOpen ? XMark : Hamburger
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
