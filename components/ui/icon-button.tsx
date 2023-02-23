import React, { type ReactNode } from "react"

import { cx } from "lib/utils"

interface IconButtonProps {
  isRound?: boolean
  className?: string
  children: ReactNode
  // TODO: use button props
  [key: string]: any
}

export function IconButton({
  className = "",
  isRound = true,
  children,
  ...props
}: IconButtonProps) {
  return (
    <button
      className={cx(
        "inline-block border-0 bg-transparent p-2.5 leading-[0] text-logo-fg",
        isRound ? "rounded-full" : "rounded-md",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
