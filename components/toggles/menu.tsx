"use client"

import React from "react"

import { Hamburger, XMark } from "components/icons"
import { IconButton } from "components/ui"

export interface MenuToggleProps {
  className?: string
  isOpen?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export function MenuToggle({
  className = "",
  isOpen,
  onClick = () => {},
  ...props
}: MenuToggleProps) {
  const MenuIcon = isOpen ? XMark : Hamburger
  const action = isOpen ? "Close" : "Open"

  return (
    <IconButton
      className={className}
      aria-label={`${action} navigation menu`}
      onClick={onClick}
      isRound={false}
      {...props}
    >
      <MenuIcon />
    </IconButton>
  )
}
