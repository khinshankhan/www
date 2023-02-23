import React, { type ReactNode } from "react"

import { cx } from "lib/utils"

interface IconProps {
  className?: string
  children: ReactNode
}

export function Icon({ className = "", children }: IconProps) {
  return <span className={cx("inline-block border-0 leading-[0]", className)}>{children}</span>
}
