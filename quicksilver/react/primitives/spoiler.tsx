"use client"

import React, { useId, useState, type HTMLAttributes, type MouseEvent } from "react"
import { cn } from "@/quicksilver/lib/classname"
import { isInteractiveElement } from "@/quicksilver/lib/dom"
import { focusRing } from "./focus.variants"

interface SpoilerProps extends HTMLAttributes<HTMLSpanElement> {
  className?: string
  children: React.ReactNode
}

// avoid vertical padding here since it can make wrapped inline fragments overlap.
const boxClassName = "relative inline rounded-lg box-decoration-clone px-1 transition-colors"

export function Spoiler({ className, children, ...props }: SpoilerProps) {
  const [isRevealed, setIsRevealed] = useState(false)
  const contentId = useId()

  const handleRevealedClick = (event: MouseEvent) => {
    let target =
      event.target instanceof HTMLElement
        ? event.target
        : event.target instanceof Node
          ? event.target.parentElement
          : null

    while (target && target !== event.currentTarget) {
      if (isInteractiveElement(target)) {
        return
      }
      target = target.parentElement
    }

    setIsRevealed(false)
  }

  return (
    <span
      {...props}
      onClick={isRevealed ? handleRevealedClick : undefined}
      className={cn(
        boxClassName,
        isRevealed
          ? "cursor-pointer bg-stark-contrast/10 hover:bg-stark-contrast/15"
          : "cursor-pointer bg-stark-contrast/70 select-none hover:bg-stark-contrast/65",
        className
      )}
    >
      <button
        type="button"
        onClick={() => setIsRevealed((prev) => !prev)}
        aria-expanded={isRevealed}
        aria-controls={contentId}
        aria-label={isRevealed ? "Hide spoiler" : "Reveal spoiler"}
        className={cn(
          "absolute inset-0 z-1 rounded-lg",
          isRevealed ? "pointer-events-none" : "cursor-pointer",
          focusRing
        )}
      />
      <span
        id={contentId}
        className={cn(!isRevealed && "invisible")}
        aria-hidden={!isRevealed}
        inert={!isRevealed}
      >
        {children}
      </span>
      <span
        aria-live={
          // announce the state flip without re-reading the (already voiced) content span
          "polite"
        }
        className="sr-only"
      >
        {isRevealed ? "Spoiler revealed" : ""}
      </span>
    </span>
  )
}
