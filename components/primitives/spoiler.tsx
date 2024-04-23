"use client"

import React, { useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SpoilerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children: ReactNode
}
export function Spoiler({ className = "", children, ...props }: SpoilerProps) {
  const [isRevealed, setIsRevealed] = useState(false)
  const toggleReveal = () => setIsRevealed((prev) => !prev)

  const toggleText = `Click to ${isRevealed ? "hide" : "reveal"} the spoiler`

  return (
    <span
      role="button"
      tabIndex={0}
      aria-label={toggleText}
      title={toggleText}
      className={cn(
        "relative inline rounded-lg px-1 py-0.5 text-knockout",
        "focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
        isRevealed ? "bg-muted" : "bg-knockout",
        className
      )}
      onClick={toggleReveal}
      {...props}
    >
      <span aria-hidden={!isRevealed} className={isRevealed ? "visible" : "invisible"}>
        {children}
      </span>
    </span>
  )
}
