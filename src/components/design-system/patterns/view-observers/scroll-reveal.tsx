"use client"

import React from "react"
import { motion, MotionValue, useScroll, useTransform } from "motion/react"

interface ScrollRevealProps {
  rangePx: number
  className?: string
  children: React.ReactNode
}

export function ScrollReveal({ rangePx, className = "", children }: ScrollRevealProps) {
  const { scrollY } = useScroll() // window scrollY
  const opacity = useTransform(scrollY, [0, rangePx], [0, 1], { clamp: true })

  return (
    <motion.div className={className} style={{ opacity }}>
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

  const motionStyle = {
    "--reveal-pct": pct as unknown as MotionValue<string>,
  } as React.CSSProperties

  const style = {
    ...motionStyle,
    background: `color-mix(in oklab, ${fromColor} calc(100% - var(--reveal-pct)), ${toColor} var(--reveal-pct))`,
    willChange: "background-color",
  }

  return (
    <motion.div className={className} style={style}>
      {children}
    </motion.div>
  )
}
