import React, { type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SpoilerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function Spoiler({ children, ...props }: SpoilerProps) {
  return (
    <span
      data-variant="spoiler"
      {...props}
      className={cn(
        "relative inline rounded-lg px-1 py-0.5 text-knockout",
        "bg-knockout focus-within:bg-muted hover:bg-muted"
      )}
      tabIndex={0}
    >
      {children}
    </span>
  )
}
