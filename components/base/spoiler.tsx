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
      aria-expanded={
        // Announce toggle state
        isRevealed
      }
      aria-label={toggleText}
      title={toggleText}
      className={cn(
        "relative inline rounded-lg px-1 py-0.5 text-knockout",
        "focus:ring-ring focus:ring-offset-background cursor-pointer focus:ring-2 focus:ring-offset-2",
        !isRevealed && "select-none", // prevent text selection due to 'double click' on mobile
        isRevealed ? "bg-knockout/10" : "bg-knockout/70",
        className
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <span
        aria-live={
          // Make text announce when updated
          "polite"
        }
        className={isRevealed ? "visible" : "invisible"}
      >
        {children}
      </span>
    </span>
  )
}
