"use client"

import React, { type CSSProperties, type ReactNode } from "react"
import { cn } from "@/quicksilver/lib/classname"
import { motion, MotionValue, useScroll, useTransform } from "motion/react"

interface ScrollBgCrossfadeProps {
  rangePx: number
  fromColor: string
  toColor: string
  className?: string
  children: ReactNode
}

export function ScrollBgCrossfade({
  rangePx,
  fromColor,
  toColor,
  className = "",
  children,
}: ScrollBgCrossfadeProps) {
  const { scrollY } = useScroll()
  const progress = useTransform(scrollY, [0, rangePx], [0, 1], { clamp: true })
  const pct = useTransform(progress, (p) => `${p * 100}%`)

  const motionCssVars = {
    "--reveal-pct": pct as unknown as MotionValue<string>,
  } as CSSProperties

  const motionStyle = {
    ...motionCssVars,
    background: `color-mix(in oklab, ${fromColor} calc(100% - var(--reveal-pct)), ${toColor} var(--reveal-pct))`,
    willChange: "background-color",
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
        "noscript:animate-bg-fade-in noscript:reveal-bg-on-scroll"
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
