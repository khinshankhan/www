"use client"

import { motion, useReducedMotion } from "motion/react"

interface ProgressCircleProps {
  value?: number | null
  size?: number
  strokeWidth?: number
  min?: number
  max?: number
  className?: string
}

export function ProgressCircle({
  value = null,
  size = 28,
  strokeWidth = 3,
  min = 0,
  max = 100,
  className,
}: ProgressCircleProps) {
  const reduce = useReducedMotion()
  const w = size,
    r = (w - strokeWidth) / 2
  const C = 2 * Math.PI * r
  const determinate = Number.isFinite(value as number)
  const pct = determinate ? Math.min(Math.max(((value as number) - min) / (max - min), 0), 1) : 0.25
  const dashOffset = C - C * pct

  return (
    <motion.svg
      role="progressbar"
      viewBox={`0 0 ${w} ${w}`}
      width={w}
      height={w}
      aria-valuemin={min}
      aria-valuemax={max}
      {...(determinate ? { "aria-valuenow": Math.round(pct * 100) } : {})}
      className={className}
      animate={determinate || reduce ? {} : { rotate: 360 }}
      transition={determinate || reduce ? {} : { repeat: Infinity, ease: "linear", duration: 1.1 }}
      style={{ originX: "50%", originY: "50%" }}
    >
      {/* Track */}
      <circle
        cx={w / 2}
        cy={w / 2}
        r={r}
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth={strokeWidth}
      />
      {/* Progress */}
      <motion.circle
        cx={w / 2}
        cy={w / 2}
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={C}
        transform={`rotate(-90 ${w / 2} ${w / 2})`}
        animate={{ strokeDashoffset: determinate ? dashOffset : C - C * 0.25 }}
        transition={reduce ? { duration: 0 } : { type: "tween", duration: 0.3, ease: "easeOut" }}
      />
    </motion.svg>
  )
}
