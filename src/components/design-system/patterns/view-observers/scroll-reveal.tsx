"use client"

import React from "react"
import { motion, MotionValue, useScroll, useTransform } from "motion/react"

interface ScrollRevealProps {
  rangePx: number
  children: React.ReactNode
}

export function ScrollReveal({ rangePx, children }: ScrollRevealProps) {
  const { scrollY } = useScroll() // window scrollY
  const opacity = useTransform(scrollY, [0, rangePx], [0, 1], { clamp: true })

  return <motion.div style={{ opacity }}>{children}</motion.div>
}

interface ScrollRevealBackgroundProps {
  rangePx: number
  fromColor: string
  toColor: string
  children: React.ReactNode
}

export function ScrollRevealBackground({
  rangePx,
  fromColor,
  toColor,
  children,
}: ScrollRevealBackgroundProps) {
  const { scrollY } = useScroll()
  const progress = useTransform(scrollY, [0, rangePx], [0, 1], { clamp: true })
  const pct = useTransform(progress, (p) => `${p * 100}%`)

  const style = {
    ["--reveal-pct" as any]: pct as unknown as MotionValue<string>,
    background: `color-mix(in oklab, ${fromColor} calc(100% - var(--reveal-pct)), ${toColor} var(--reveal-pct))`,
    willChange: "background-color",
  } as React.CSSProperties

  return <motion.div style={style}>{children}</motion.div>
}
