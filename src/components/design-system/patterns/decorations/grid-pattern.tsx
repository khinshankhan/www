"use client"
"use client"

import React from "react"
import { cn } from "@/lib/utils"

type GridSize = "xs" | "sm" | "md" | "lg"

const SIZE_MAP: Record<GridSize, { s1: string; s2: string }> = {
  xs: { s1: "40px", s2: "10px" },
  sm: { s1: "60px", s2: "15px" },
  md: { s1: "80px", s2: "20px" },
  lg: { s1: "120px", s2: "30px" },
}

interface GridPatternProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Render a looser grid */
  primaryPattern?: boolean
  /** Render a tighter grid */
  secondaryPattern?: boolean
  /** Named sizes, or override via `style={{ --grid-size-1: "..." }}` */
  size?: GridSize
  /** Higher-contrast palette */
  contrast?: boolean
  /** Keep absolute overlay by default. Set `false` to render inline */
  absolute?: boolean
  className?: string
}

export function GridPattern({
  primaryPattern = false,
  secondaryPattern = false,
  size = "sm",
  contrast = false,
  absolute = true,
  className = "",
  style = {},
  ...props
}: GridPatternProps) {
  const gridColor1 = contrast ? "var(--color-surface-5)" : "var(--color-surface-4)"
  const gridColor2 = contrast ? "var(--color-background-2)" : "var(--color-surface-3)"

  const { s1, s2 } = SIZE_MAP[size]

  const img1 = `linear-gradient(90deg, ${gridColor1} 1px, transparent 1px),
                linear-gradient( 0deg, ${gridColor1} 1px, transparent 1px)`
  const img2 = `linear-gradient(90deg, ${gridColor2} 1px, transparent 1px),
                linear-gradient( 0deg, ${gridColor2} 1px, transparent 1px)`

  const size1 = `${s1} ${s1}, ${s1} ${s1}`
  const size2 = `${s2} ${s2}, ${s2} ${s2}`

  const cssVarsStyle = {
    ["--grid-size-1" as any]: s1,
    ["--grid-size-2" as any]: s2,
  } as React.CSSProperties

  return (
    <div
      aria-hidden="true"
      className={cn(absolute && "absolute inset-0", "pointer-events-none", className)}
      style={{
        ...cssVarsStyle,
        backgroundImage: [primaryPattern ? img1 : "", secondaryPattern ? img2 : ""]
          .join(primaryPattern && secondaryPattern ? "," : " ")
          .trim(),
        backgroundSize: [primaryPattern ? size1 : "", secondaryPattern ? size2 : ""]
          .join(primaryPattern && secondaryPattern ? "," : " ")
          .trim(),
        ...style,
      }}
      {...props}
    />
  )
}
