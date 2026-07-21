"use client"

import type React from "react"
import { motion, useReducedMotion } from "motion/react"

interface ProgressCircleProps extends Omit<
  React.ComponentPropsWithoutRef<"svg">,
  // motion.svg owns these; their motion prop types conflict with the DOM/SVG ones
  "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "values"
> {
  value: number
  size?: number
  strokeWidth?: number
  min?: number
  max?: number
  className?: string
}

export function ProgressCircle({
  value,
  size = 28,
  strokeWidth = 3,
  min = 0,
  max = 100,
  className,
  style,
  ...props
}: ProgressCircleProps) {
  const reduce = useReducedMotion()
  const w = size,
    r = (w - strokeWidth) / 2
  const C = 2 * Math.PI * r
  const determinate = Number.isFinite(value)
  const pct = determinate ? Math.min(Math.max((value - min) / (max - min), 0), 1) : 0.25
  const dashOffset = C - C * pct
  const progressDashOffset = determinate ? dashOffset : C - C * 0.25

  return (
    <motion.svg
      {...props}
      role="progressbar"
      viewBox={`0 0 ${w} ${w}`}
      width={w}
      height={w}
      aria-valuemin={min}
      aria-valuemax={max}
      {...(determinate
        ? {
            // the clamped value on the caller's scale: screen readers derive the percentage
            // from now/min/max themselves, so reporting pct * 100 here misstates any
            // range that isn't exactly 0-100
            "aria-valuenow": min + pct * (max - min),
          }
        : {})}
      className={className}
      animate={determinate || reduce ? {} : { rotate: 360 }}
      transition={determinate || reduce ? {} : { repeat: Infinity, ease: "linear", duration: 1.1 }}
      style={{ originX: "50%", originY: "50%", ...style }}
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
        strokeDashoffset={progressDashOffset}
        transform={`rotate(-90 ${w / 2} ${w / 2})`}
        animate={{ strokeDashoffset: progressDashOffset }}
        transition={reduce ? { duration: 0 } : { type: "tween", duration: 0.3, ease: "easeOut" }}
      />
    </motion.svg>
  )
}
