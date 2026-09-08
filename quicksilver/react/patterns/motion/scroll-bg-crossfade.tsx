"use client"

import React, { type CSSProperties, type HTMLAttributes, type ReactNode } from "react"
import { cn } from "@/quicksilver/lib/classname"
import { motion, useScroll, useTransform } from "motion/react"

interface ScrollBgCrossfadeProps extends Pick<HTMLAttributes<HTMLDivElement>, "aria-hidden"> {
  rangePx: number
  fromColor: string
  toColor: string
  /**
   * Which end of the page the range is measured from.
   *
   * `start` (default) counts px scrolled down from the top -- for surfaces that react to leaving
   * the top of the page, like the sticky header crossfading as content slides under it. `end`
   * counts px still left to scroll, so the range plays out as the bottom is approached; anything
   * anchored to the end of the document wants this, since a fixed offset from the top would
   * otherwise make the effect depend on how long the page happens to be.
   */
  from?: "start" | "end"
  className?: string
  /** Optional: the crossfade is sometimes just a painted backdrop with nothing inside it. */
  children?: ReactNode
}

export function ScrollBgCrossfade({
  rangePx,
  fromColor,
  toColor,
  from = "start",
  className,
  children,
  ...props
}: ScrollBgCrossfadeProps) {
  const { scrollY } = useScroll()
  // Distance from whichever edge the range is anchored to. For `end` that is how much scrolling
  // is still left, which stays correct as the document grows or the viewport resizes -- and it
  // counts down, so the range is walked in reverse to keep `fromColor` at the far end.
  //
  // The effective range is capped at how much the page can actually scroll. A document shorter
  // than `rangePx` would otherwise never traverse the range at all, leaving the crossfade stuck
  // partway; clamping lets it still resolve fully over whatever scrolling exists. It also keeps
  // SSR and the client agreeing at scroll 0: both see "the full range remains".
  const distance = useTransform(scrollY, (y) => {
    if (from === "start") {
      return y
    }

    // No document to measure during SSR/static export. Report the far end of the range so the
    // markup matches what the client computes at scroll 0 -- returning the raw `y` here would
    // read as "at the bottom" and hydrate with the opposite colour.
    if (typeof document === "undefined") {
      return 1
    }

    const max = document.documentElement.scrollHeight - window.innerHeight
    const span = Math.min(rangePx, max)
    if (span <= 0) {
      return 0
    }

    // normalised 0..1 remaining, so the range below is resolution-independent
    return Math.min(1, (max - y) / span)
  })
  // `start` counts up to rangePx; `end` is already normalised and counts down, so its output is
  // reversed to land on the same "fully crossfaded once you get there" result
  const progress = useTransform(
    distance,
    from === "start" ? [0, rangePx] : [0, 1],
    from === "start" ? [0, 1] : [1, 0],
    { clamp: true }
  )
  const pct = useTransform(progress, (p) => `${p * 100}%`)

  const motionCssVars = {
    "--reveal-pct": pct,
    /* exposed so descendants (eg edge fades) can match the current crossfaded color */
    "--scroll-bg": `color-mix(in oklab, ${fromColor} calc(100% - var(--reveal-pct)), ${toColor} var(--reveal-pct))`,
  } as CSSProperties

  const motionStyle = {
    ...motionCssVars,
    background: "var(--scroll-bg)",
    // Promote to its own layer so the per-scroll color-mix crossfade composites instead of
    // repainting on the main thread. Notably smoother on Firefox mobile.
    willChange: "background",
  }

  const fallbackCssVars = {
    "--range": `${rangePx}px`,
    "--from-color": fromColor,
    "--to-color": toColor,
  } as CSSProperties

  return (
    <motion.div
      className={cn(
        className,
        /* NOTE: this is not cross browser compatible yet, which is why we'll use motion if possible */
        "noscript:animate-bg-fade-in",
        /* the no-JS reveal has to be anchored to the same end of the timeline as the motion one */
        from === "start" ? "noscript:reveal-bg-on-scroll" : "noscript:reveal-bg-on-scroll-end"
      )}
      style={{
        ...motionStyle,
        ...fallbackCssVars,
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
