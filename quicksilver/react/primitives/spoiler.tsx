"use client"

import React, { useState, type HTMLAttributes, type KeyboardEvent, type MouseEvent } from "react"
import { cn } from "@/quicksilver/lib/classname"
import { isInteractiveElement } from "@/quicksilver/lib/dom"
import { mergeProps } from "@base-ui/react/merge-props"
import { focusRing } from "./focus.variants"

interface SpoilerProps extends HTMLAttributes<HTMLSpanElement> {
  className?: string
  children: React.ReactNode
}

export function Spoiler({ className, children, ...props }: SpoilerProps) {
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
      {...mergeProps<"span">(
        {
          role: "button",
          tabIndex: 0,
          "aria-expanded":
            // Announce toggle state
            isRevealed,
          "aria-label": toggleText,
          title: toggleText,
          className: cn(
            // NOTE: avoid vertical padding: the inline box already overshoots the line advance, so
            // any py makes wrapped fragments overlap; clone gives each wrapped line its own rounded
            // caps and horizontal padding
            "relative inline rounded-lg box-decoration-clone px-1",
            focusRing,
            "cursor-pointer transition-colors",
            // prevent text selection due to 'double click' on mobile
            !isRevealed && "select-none",
            isRevealed
              ? "bg-stark-contrast/10 hover:bg-stark-contrast/15"
              : "bg-stark-contrast/70 hover:bg-stark-contrast/65",
            className
          ),
          onClick: handleClick,
          onKeyDown: handleKeyDown,
        },
        props
      )}
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
