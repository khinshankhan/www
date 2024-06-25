"use client"

import React, { useState, type ReactNode } from "react"
import { cn, isInteractiveElement } from "@/lib/utils"

interface SpoilerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children: ReactNode
}

export function Spoiler({ className = "", children, ...props }: SpoilerProps) {
  const [isRevealed, setIsRevealed] = useState(false)

  const toggleText = `Click to ${isRevealed ? "hide" : "reveal"} the spoiler`

  const handleClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    if (event.target !== event.currentTarget && isInteractiveElement(event.target as HTMLElement)) {
      event.stopPropagation()
      return
    }
    setIsRevealed((prev) => !prev)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    if (event.target === event.currentTarget && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault()
      ;(event.target as HTMLSpanElement).click()
    }
  }

  return (
    <span
      role="button"
      tabIndex={0}
      aria-label={toggleText}
      title={toggleText}
      className={cn(
        "relative inline rounded-lg px-1 py-0.5 text-knockout",
        "focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
        !isRevealed && "select-none", // prevent text selection due to 'double click' on mobile
        isRevealed ? "bg-muted" : "bg-knockout",
        className
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <span aria-hidden={!isRevealed} className={isRevealed ? "visible" : "invisible"}>
        {children}
      </span>
    </span>
  )
}
