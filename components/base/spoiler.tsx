"use client"

import React, { useState, type ReactNode } from "react"
import { cn, isInteractiveElement } from "@/lib/utils"

// prettier-ignore
interface SpoilerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children: ReactNode
}

export function Spoiler({ className = "", children, ...props }: SpoilerProps) {
  const [isRevealed, setIsRevealed] = useState(false)

  const toggleText = `Click to ${isRevealed ? "hide" : "reveal"} the spoiler`

  const handleClick = (event: React.MouseEvent) => {
    if (event.target !== event.currentTarget && isInteractiveElement(event.target as HTMLElement)) {
      event.stopPropagation()
      return
    }
    setIsRevealed((prev) => !prev)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
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
        "text-knockout relative inline rounded-lg py-0.5 px-1",
        "focus:ring-ring focus:ring-offset-background focus:ring-2 focus:ring-offset-2",
        !isRevealed && "select-none", // prevent text selection due to 'double click' on mobile
        isRevealed ? "bg-knockout-mix/10" : "bg-knockout-mix/70",
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
