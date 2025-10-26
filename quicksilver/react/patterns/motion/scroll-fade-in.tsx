"use client"

import React, { type CSSProperties, type ReactNode } from "react"
import { cn } from "@/quicksilver/lib/classname"
import { motion, MotionValue, useScroll, useTransform } from "motion/react"

interface ScrollFadeInProps {
  startPx?: number
  rangePx: number
  startOpacity?: number
  endOpacity?: number
  className?: string
  children: ReactNode
}

export function ScrollFadeIn({
  startPx = 0,
  rangePx,
  startOpacity = 0,
  endOpacity = 1,
  className = "",
  children,
}: ScrollFadeInProps) {
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
  } as CSSProperties

  return (
    <motion.div
      className={cn(
        className,
        /* NOTE: this is not cross browser compatible yet, which is why we'll use motion if possible */
        /* NOTE: these classes do not have 100% parity with the scroll reveal yet */
        "noscript:animate-fade-in noscript:reveal-on-scroll"
      )}
      style={{ ...motionStyle, ...fallbackCssVars }}
    >
      {children}
    </motion.div>
  )
}
