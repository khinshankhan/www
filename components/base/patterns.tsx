"use client"

import React, { useMemo, useRef } from "react"
import { Star } from "@/components/base/icon"
import { useMounted } from "@/hooks/media"
import { useUserAgent } from "@/hooks/navigator"
import {
  color1_base,
  color1_bold,
  color2_base,
  color2_bold,
  color3_base,
  color3_bold,
  color4_base,
  color4_bold,
  defaultSeed,
} from "@/lib/constants"
import { cn, createStarGlow, getAbsolutePosition, range, seededRandom } from "@/lib/utils"

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

interface SingleStarProps {
  size: string
  top: string
  left: string
  color: string
  rotation: number
  pattern: "jellyfish-floating-1" | "jellyfish-floating-2"
  duration: number
}

export function SingleStar({
  size,
  top,
  left,
  color,
  rotation,
  pattern,
  duration,
}: SingleStarProps) {
  const ua = useUserAgent()
  const disableAnimation =
    !ua?.browser.name ||
    ["firefox", "safari"].some((name) => ua.browser.name?.toLowerCase().includes(name))

  const animationStyle = {
    ["--animation"]: `${pattern} ${duration}s infinite linear`,
  } as React.CSSProperties

  return (
    <div
      className={cn("star absolute motion-safe:custom-animation")}
      style={{
        ...(disableAnimation ? {} : animationStyle),
        top: top,
        left: left,
        width: size,
        height: size,
        color: color,
        filter: createStarGlow(color),
        rotate: `${rotation}deg`,
        transform: "translateZ(0)",
      }}
    >
      <Star />
    </div>
  )
}

interface GenerateStarsProps {
  seed: number
  count: number
  availableWidth?: number
  availableHeight?: number
  xMarginPercent: number
  yMarginPercent: number
}
function generateStars({
  seed,
  count,
  availableWidth,
  availableHeight,
  xMarginPercent,
  yMarginPercent,
}: GenerateStarsProps): SingleStarProps[] {
  if (count === 0 || !availableWidth || !availableHeight) return []

  const random = seededRandom(seed)

  const navbar = document?.querySelector<HTMLElement>("#navbar")
  const navbarHeight = navbar?.clientHeight ?? 0

  const pageContent = document.getElementById("page-content")

  const contentElements = pageContent?.querySelectorAll<HTMLElement>(".exclude-stars")
  const excludedAreas = Array.from(contentElements ?? []).map((el) => {
    const { top, left } = getAbsolutePosition(el, navbarHeight)

    return {
      top,
      left,
      bottom: top + el.clientHeight,
      right: left + el.clientWidth,
    }
  })

  const maxTries = 10

  const stars = range(count).map((i) => {
    const size = Math.floor(random() * 20) + 10

    let tries = 0

    let top = -1
    let left = -1

    const xMargin = Math.floor(availableWidth * xMarginPercent)
    const yMargin = Math.floor(availableHeight * yMarginPercent)

    do {
      left = xMargin * 0.5 + Math.floor(random() * (availableWidth - xMargin))
      top = yMargin * 0.5 + Math.floor(random() * (availableHeight - yMargin))

      const starLeft = left
      const starTop = top
      const starRight = starLeft + size
      const starBottom = starTop + size

      const starInExcludedArea = excludedAreas.some((area) => {
        // check if the star's "box" intersects with any excluded area
        return (
          starTop < area.bottom &&
          starBottom > area.top &&
          starLeft < area.right &&
          starRight > area.left
        )
      })

      if (starInExcludedArea) {
        tries++
      } else {
        break
      }
    } while (tries < maxTries)

    // pseudo-random color assignment (based on cicada principle)
    // https://www.sitepoint.com/the-cicada-principle-and-why-it-matters-to-web-designers/
    const allowedColorsCount = i % 7 === 0 || i % 13 === 0 || i % 17 === 0 ? 8 : i % 5 === 0 ? 4 : 2
    const color = [
      color1_base,
      color2_base,
      color3_base,
      color4_base,
      color1_bold,
      color2_bold,
      color3_bold,
      color4_bold,
    ][Math.floor(random() * allowedColorsCount)]

    const star: SingleStarProps = {
      size: `${size}px`,
      top: `${top}px`,
      left: `${left}px`,
      color,
      rotation: Math.floor(random() * 60 - 30),
      pattern: Math.floor(random() * 3) % 2 === 0 ? "jellyfish-floating-1" : "jellyfish-floating-2",
      duration: (Math.floor(random() * 25) % 25) + 5,
    }

    return star
  })

  return stars
}

interface StarGridPatternProps extends React.HTMLAttributes<HTMLDivElement> {
  contrast?: boolean
  dense?: boolean
  seed?: number
  className?: string
  xMarginPercent?: number
  yMarginPercent?: number
}
export function StarGridPattern({
  contrast,
  dense = false,
  seed = defaultSeed,
  className = "",
  xMarginPercent = 0.25,
  yMarginPercent = 0.1,
}: StarGridPatternProps) {
  const mounted = useMounted()
  const patternRef = useRef<HTMLDivElement>(null)

  const availableWidth = patternRef.current?.clientWidth
  const availableHeight = patternRef.current?.clientHeight

  const starsCount = useMemo(() => {
    if (!mounted || !availableWidth || !availableHeight) return 0

    const availableArea = availableWidth * availableHeight
    const density = dense ? 0.0000155 : 0.000015

    return Math.floor(availableArea * density)
  }, [mounted, dense, availableWidth, availableHeight])

  const stars = useMemo(() => {
    if (!mounted || !availableWidth || !availableHeight) return []

    return generateStars({
      seed,
      count: starsCount,
      availableWidth,
      availableHeight,
      xMarginPercent,
      yMarginPercent,
    })
  }, [seed, starsCount, availableWidth, availableHeight, xMarginPercent, yMarginPercent])

  return (
    <div ref={patternRef} role="presentation" className={cn("relative", className)}>
      {/* Background Grid */}
      <GridPattern contrast={contrast} secondaryPattern />
      {/* Dynamically Generated Stars */}
      {stars.map((star, index) => {
        return (
          <SingleStar
            key={index}
            size={star.size}
            top={star.top}
            left={star.left}
            color={star.color}
            rotation={star.rotation}
            pattern={star.pattern}
            duration={star.duration}
          />
        )
      })}
    </div>
  )
}
