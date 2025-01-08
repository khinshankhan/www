"use client"

import React, { useMemo } from "react"
import { Star } from "@/components/base/icon"
import { useMounted } from "@/hooks/media"
import { color1_base, color1_bold, color2_base, color2_bold, defaultSeed } from "@/lib/constants"
import { cn, createStarGlow, getAbsolutePosition, range, seededRandom } from "@/lib/utils"

interface GridPatternProps extends React.HTMLAttributes<HTMLDivElement> {
  contrast?: boolean
  className?: string
}

export function GridPattern({
  contrast = false,
  className = "",
  style = {},
  ...props
}: GridPatternProps) {
  const gridColor = contrast ? "var(--color-surface-4)" : "var(--color-surface-3)"

  return (
    <div
      role="presentation"
      className={cn("absolute inset-0", className)}
      style={{
        backgroundImage: `linear-gradient(90deg, ${gridColor} 1px, transparent 1px),
                          linear-gradient( 0deg, ${gridColor} 1px, transparent 1px)`,
        backgroundSize: "50px 50px, 50px 50px, 50px 50px",
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
  const animationStyle = {
    ["--animation"]: `${pattern} ${duration}s infinite linear`,
  } as React.CSSProperties

  return (
    <div
      className={cn("star absolute motion-safe:custom-animation")}
      style={{
        ...animationStyle,
        top: top,
        left: left,
        width: size,
        height: size,
        color: color,
        filter: createStarGlow(color),
        rotate: `${rotation}deg`,
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

  const stars = range(count).map((i) => {
    const size = Math.floor(random() * 20) + 10

    let top = -1
    let left = -1

    let tries = 0
    const maxTries = 10

    do {
      top = Math.floor(random() * availableHeight)
      left = Math.floor(random() * availableWidth)

      const starTop = top
      const starLeft = left
      const starBottom = starTop + size
      const starRight = starLeft + size

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
    const allowedColorsIndices = i % 5 === 0 || i % 13 === 0 || i % 17 === 0 ? 4 : 2
    const color = [color1_base, color2_base, color1_bold, color2_bold][
      Math.floor(random() * allowedColorsIndices) % allowedColorsIndices
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

    const density = dense ? 0.000025 : 0.00001

    return Math.floor(availableArea * density)
  }, [mounted, dense])

  const stars = useMemo(() => {
    if (!mounted) return []

    return generateStars(seed, starsCount)
  }, [seed, starsCount])

  return (
    <div role="presentation" className={cn("relative", className)}>
      {/* Background Grid */}
      <GridPattern contrast={contrast} />
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
