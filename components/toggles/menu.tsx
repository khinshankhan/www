"use client"

import React, { forwardRef, type HTMLProps } from "react"

import { Hamburger, XMark } from "components/icons"

type ButtonProps = HTMLProps<HTMLButtonElement>
export interface MenuToggleProps extends ButtonProps {
  isOpen: boolean
  type?: "button" | "submit" | "reset"
  className?: string
}

// NOTE: is this just a one off element? maybe it should be moved closed to its usage of it is
export const MenuToggle = forwardRef<HTMLButtonElement, MenuToggleProps>(function MenuToggle(
  props,
  ref
) {
  const { className = "", isOpen, type: buttonType = "button", ...rest } = props
  const MenuIcon = isOpen ? XMark : Hamburger
  const action = isOpen ? "Close" : "Open"

  return (
    <button
      className={className}
      aria-label={`${action} navigation menu.`}
      type={buttonType}
      ref={ref}
      {...rest}
    >
      <MenuIcon />
    </button>
  )
})
