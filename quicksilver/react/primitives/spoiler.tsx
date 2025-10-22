"use client"

import React, {
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react"
import { cn } from "@/quicksilver/lib/classname"
import { isInteractiveElement } from "@/quicksilver/lib/dom"

interface SpoilerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children: ReactNode
}

export function Spoiler({ className = "", children, ...props }: SpoilerProps) {
  const [isRevealed, setIsRevealed] = useState(false)

  const toggleText = `Click to ${isRevealed ? "hide" : "reveal"} the spoiler`

  const handleClick = (event: MouseEvent) => {
    if (event.target !== event.currentTarget && isInteractiveElement(event.target as HTMLElement)) {
      event.stopPropagation()
      return
    }
    setIsRevealed((prev) => !prev)
  }

  const handleKeyDown = (event: KeyboardEvent) => {
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
        "text-knockout relative inline rounded-lg px-1 py-0.5",
        "focus:ring-ring focus:ring-offset-background cursor-pointer focus:ring-2 focus:ring-offset-2",
        !isRevealed && "select-none", // prevent text selection due to 'double click' on mobile
        isRevealed ? "bg-stark-contrast/10" : "bg-stark-contrast/70 hover:bg-stark-contrast/65",
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
