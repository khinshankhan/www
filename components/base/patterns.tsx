"use client"

import React, { useRef } from "react"
import { cn } from "@/lib/utils"

interface GridPatternProps extends React.HTMLAttributes<HTMLDivElement> {
  contrast?: boolean
  className?: string
  secondaryPattern?: boolean
}

export function GridPattern({
  contrast = false,
  secondaryPattern = false,
  className = "",
  style = {},
  ...props
}: GridPatternProps) {
  const gridColor1 = contrast ? "var(--color-surface-5)" : "var(--color-surface-4)"
  const gridColor2 = contrast ? "var(--color-background-2)" : "var(--color-surface-3)"

  const gridSize1 = "60px"
  const gridSize2 = "15px"

  function gridBackgroundImage(gridColor: string) {
    return `linear-gradient(90deg, ${gridColor} 1px, transparent 1px),
            linear-gradient( 0deg, ${gridColor} 1px, transparent 1px)`
  }

  function gridBackgroundSize(gridSize: string) {
    return `${gridSize} ${gridSize}, ${gridSize} ${gridSize}`
  }

  return (
    <div
      role="presentation"
      className={cn("absolute inset-0", className)}
      style={{
        backgroundImage:
          gridBackgroundImage(gridColor1) +
          (!secondaryPattern ? "" : "," + gridBackgroundImage(gridColor2)),
        backgroundSize:
          gridBackgroundSize(gridSize1) +
          (!secondaryPattern ? "" : "," + gridBackgroundSize(gridSize2)),

        ...style,
      }}
      {...props}
    />
  )
}

interface StarGridPatternProps extends React.HTMLAttributes<HTMLDivElement> {
  contrast?: boolean
  dense?: boolean
  seed?: number
  className?: string
  xMarginPercent?: number
  yMarginPercent?: number
}
export function StarGridPattern({ contrast, className = "" }: StarGridPatternProps) {
  const patternRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={patternRef} role="presentation" className={cn("relative", className)}>
      {/* Background Grid */}
      <GridPattern contrast={contrast} secondaryPattern />
    </div>
  )
}
