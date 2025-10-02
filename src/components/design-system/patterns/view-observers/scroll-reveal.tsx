"use client"

import React from "react"
import { motion, useScroll, useTransform } from "motion/react"

interface ScrollRevealProps {
  rangePx: number
  children: React.ReactNode
}

export function ScrollReveal({ rangePx, children }: ScrollRevealProps) {
  const { scrollY } = useScroll() // window scrollY
  const opacity = useTransform(scrollY, [0, rangePx], [0, 1], { clamp: true })

  return <motion.div style={{ opacity }}>{children}</motion.div>
}
