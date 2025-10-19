"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { motion, MotionValue, useScroll, useTransform } from "motion/react"

interface ScrollRevealProps {
  startPx?: number
  rangePx: number
  startOpacity?: number
  endOpacity?: number
  className?: string
  children: React.ReactNode
}

export function ScrollReveal({
  startPx = 0,
  rangePx,
  startOpacity = 0,
  endOpacity = 1,
  className = "",
  children,
}: ScrollRevealProps) {
  const { scrollY } = useScroll() // window scrollY
  const opacity = useTransform(scrollY, [startPx, rangePx], [startOpacity, endOpacity], {
    clamp: true,
  })

  const motionStyle = {
    opacity: opacity as unknown as MotionValue<number>,
    willChange: "opacity",
  }

  const fallbackCssVars = {
    "--range": `${rangePx}px`,
    "--animation-duration": "1s",
  } as React.CSSProperties

  return (
    <motion.div
      className={cn(
        className,
        /* NOTE: this is not cross browser compatible yet, which is why we'll use motion if possible */
        /* NOTE: these classes do not have 100% parity with the scroll reveal yet */
        "noscript:reveal-on-scroll noscript:animate-fade-in"
      )}
      style={{ ...motionStyle, ...fallbackCssVars }}
    >
      {children}
    </motion.div>
  )
}

interface ScrollRevealBackgroundProps {
  rangePx: number
  fromColor: string
  toColor: string
  className?: string
  children: React.ReactNode
}

export function ScrollRevealBackground({
  rangePx,
  fromColor,
  toColor,
  className = "",
  children,
}: ScrollRevealBackgroundProps) {
  const { scrollY } = useScroll()
  const progress = useTransform(scrollY, [0, rangePx], [0, 1], { clamp: true })
  const pct = useTransform(progress, (p) => `${p * 100}%`)

  const motionCssVars = {
    "--reveal-pct": pct as unknown as MotionValue<string>,
  } as React.CSSProperties

  const motionStyle = {
    ...motionCssVars,
    background: `color-mix(in oklab, ${fromColor} calc(100% - var(--reveal-pct)), ${toColor} var(--reveal-pct))`,
    willChange: "background-color",
  }

  const fallbackCssVars = {
    "--range": `${rangePx}px`,
    "--from-color": fromColor,
    "--to-color": toColor,
  } as React.CSSProperties

  return (
    <motion.div
      className={cn(
        className,
        /* NOTE: this is not cross browser compatible yet, which is why we'll use motion if possible */
        "noscript:reveal-bg-on-scroll noscript:animate-bg-fade-in"
      )}
      style={{
        ...motionStyle,
        ...fallbackCssVars,
      }}
    >
      {children}
    </motion.div>
  )
}
