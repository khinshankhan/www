"use client"

import React, { useMemo } from "react"
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
  const gridColor2 = contrast ? "var(--color-surface-3)" : "var(--color-surface-3)"

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

function generateStars(seed: number, count: number): SingleStarProps[] {
  if (count === 0) return []

  const random = seededRandom(seed)

  const navbar = document?.querySelector<HTMLElement>("#navbar")
  const navbarHeight = navbar?.clientHeight ?? 0

  const pageContent = document.getElementById("page-content")
  const availableWidth = pageContent?.clientWidth ?? 0
  const availableHeight = pageContent?.clientHeight ?? 0

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

    const xMargin = Math.floor(availableWidth * 0.1)
    const yMargin = Math.floor(availableHeight * 0.1)

    do {
      left = xMargin / 2 + Math.floor(random() * (availableWidth - xMargin))
      top = yMargin / 2 + Math.floor(random() * (availableHeight - yMargin))

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
    const allowedColorsCount = i % 7 === 0 || i % 13 === 0 || i % 17 === 0 ? 5 : i % 5 === 0 ? 3 : 2
    const color = [color1_base, color2_base, color3_base, color1_bold, color2_bold, color3_bold][
      Math.floor(random() * allowedColorsCount)
    ]

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
}
export function StarGridPattern({
  contrast,
  dense = false,
  seed = defaultSeed,
  className = "",
}: StarGridPatternProps) {
  const mounted = useMounted()

  const starsCount = useMemo(() => {
    if (!mounted) return 0

    const pageContent = document.getElementById("page-content")
    const availableWidth = Math.floor(pageContent?.clientWidth ?? 0 ?? 0)
    const availableHeight = Math.floor(pageContent?.clientHeight ?? 0 ?? 0)
    const availableArea = availableWidth * availableHeight

    const density = dense ? 0.000025 : 0.000015

    return Math.floor(availableArea * density)
  }, [mounted, dense])

  const stars = useMemo(() => {
    if (!mounted) return []

    return generateStars(seed, starsCount)
  }, [seed, starsCount])

  return (
    <div role="presentation" className={cn("relative", className)}>
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
