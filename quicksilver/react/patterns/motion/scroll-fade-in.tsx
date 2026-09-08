"use client"

import React, { type CSSProperties, type ReactNode } from "react"
import { cn } from "@/quicksilver/lib/classname"
import { motion, useScroll, useTransform } from "motion/react"

interface ScrollFadeInProps {
  startPx?: number
  rangePx: number
  startOpacity?: number
  endOpacity?: number
  /**
   * Which end of the page the range is measured from.
   *
   * `start` (default) counts px scrolled down from the top -- for things that react to leaving
   * the top of the page. `end` counts px still left to scroll, so the range plays out as the
   * bottom is approached; anything anchored to the end of the document wants this, since its
   * trigger point depends on the document's height rather than a fixed offset.
   */
  from?: "start" | "end"
  className?: string
  children: ReactNode
}

export function ScrollFadeIn({
  startPx = 0,
  rangePx,
  startOpacity = 0,
  endOpacity = 1,
  from = "start",
  className,
  children,
}: ScrollFadeInProps) {
  const { scrollY } = useScroll() // window scrollY
  // Distance from whichever edge the range is anchored to. For `end` that is how much scrolling
  // is still left, which stays correct as the document grows or the viewport resizes -- and it
  // counts down, so the range is walked in reverse to keep `startOpacity` at the far end.
  const distance = useTransform(scrollY, (y) => {
    if (from === "start") {
      return y
    }

    // No document to measure during SSR/static export. Report a distance past the end of the
    // range so the markup matches what the client computes at scroll 0 -- returning the raw
    // `y` here would read as "at the bottom" and hydrate with the opposite opacity.
    if (typeof document === "undefined") {
      return rangePx
    }

    const max = document.documentElement.scrollHeight - window.innerHeight
    return max - y
  })
  // `start` counts up from startPx to rangePx; `end` counts down, so its range is reversed and
  // the opacities swapped to land on the same "fully faded in once you get there" result
  const [inputRange, outputRange] =
    from === "start"
      ? [
          [startPx, rangePx],
          [startOpacity, endOpacity],
        ]
      : [
          [startPx, rangePx],
          [endOpacity, startOpacity],
        ]
  const opacity = useTransform(distance, inputRange, outputRange, {
    clamp: true,
  })

  const motionStyle = {
    opacity,
    willChange: "opacity",
  }

  const fallbackCssVars = {
    "--range": `${rangePx}px`,
    "--animation-duration": "1s",
  } as CSSProperties

  return (
    <motion.div
      className={cn(
        className,
        /* NOTE: this is not cross browser compatible yet, which is why we'll use motion if possible */
        /* NOTE: these classes do not have 100% parity with the scroll reveal yet */
        "noscript:animate-fade-in",
        /* the no-JS reveal has to be anchored to the same end of the timeline as the motion one */
        from === "start" ? "noscript:reveal-on-scroll" : "noscript:reveal-on-scroll-end"
      )}
      style={{ ...motionStyle, ...fallbackCssVars }}
    >
      {children}
    </motion.div>
  )
}
