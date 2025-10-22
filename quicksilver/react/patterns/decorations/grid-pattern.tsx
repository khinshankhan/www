"use client"

import React, { useMemo, type HTMLAttributes } from "react"
import { existPredicate } from "@/quicksilver/lib/array"
import { cn } from "@/quicksilver/lib/classname"

type GridSize = "xs" | "sm" | "md" | "lg"

const SIZE_MAP: Record<GridSize, { s1: string; s2: string }> = {
  xs: { s1: "40px", s2: "10px" },
  sm: { s1: "60px", s2: "15px" },
  md: { s1: "80px", s2: "20px" },
  lg: { s1: "120px", s2: "30px" },
} as const

interface GridPatternProps extends HTMLAttributes<HTMLDivElement> {
  /** Which patterns to render. `1` renders a loose grid, `2` renders a tighter grid, and both renders both grids */
  pattern?: "1" | "2" | "both" | "none"
  /** Named sizes. Can also be set via `style={{ --grid-size-1: "..." }}` */
  size?: GridSize
  /** Higher contrast palette. Can also be set via `style={{ --grid-color-1: "...", --grid-color-2: "..." }` */
  contrast?: boolean
  /** Keep absolute overlay by default. Set `false` to render inline */
  absolute?: boolean
  /** Grid line thickness for pattern 1 (CSS length). Can also be set via `style={{ --grid-line-1: "2px" }}` */
  lineWidth1?: string
  /** Grid line thickness for pattern 2 (CSS length). Can also be set via `style={{ --grid-line-2: "2px" }}` */
  lineWidth2?: string
  className?: string
}

export function GridPattern({
  pattern = "both",
  size = "sm",
  contrast = false,
  absolute = true,
  lineWidth1 = "1px",
  lineWidth2 = "1px",
  className = "",
  style = {},
  ...props
}: GridPatternProps) {
  const { s1, s2 } = SIZE_MAP[size]

  const cssVarsStyle = {
    ["--grid-color-1"]: contrast ? "var(--color-surface-5)" : "var(--color-surface-4)",
    ["--grid-color-2"]: contrast ? "var(--color-background-2)" : "var(--color-surface-3)",
    ["--grid-size-1"]: s1,
    ["--grid-size-2"]: s2,
    ["--grid-line-1"]: lineWidth1,
    ["--grid-line-2"]: lineWidth2,
  }

  const shouldRenderPrimary = pattern === "1" || pattern === "both"
  const shouldRenderSecondary = pattern === "2" || pattern === "both"

  const { backgroundImage, backgroundSize } = useMemo(() => {
    const layer = (
      color: string,
      sizePx: string,
      lineWidth: string
    ): { img: string; sz: string } => {
      return {
        img: `linear-gradient(90deg, ${color} ${lineWidth}, transparent 0),
              linear-gradient(0deg, ${color} ${lineWidth}, transparent 0)`,
        sz: `${sizePx} ${sizePx}, ${sizePx} ${sizePx}`,
      }
    }

    const layers: { img: string; sz: string }[] = [
      shouldRenderPrimary
        ? layer("var(--grid-color-1)", "var(--grid-size-1)", "var(--grid-line-1)")
        : null,
      shouldRenderSecondary
        ? layer("var(--grid-color-2)", "var(--grid-size-2)", "var(--grid-line-2)")
        : null,
    ].filter(existPredicate)

    return {
      backgroundImage: layers.map((l) => l.img).join(", "),
      backgroundSize: layers.map((l) => l.sz).join(", "),
    }
  }, [shouldRenderPrimary, shouldRenderSecondary])

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none", absolute && "absolute inset-0", className)}
      style={{
        ...cssVarsStyle,
        backgroundImage,
        backgroundSize,
        backgroundPosition: "top left",
        backgroundRepeat: "repeat",
        ...style,
      }}
      {...props}
    />
  )
}
