"use client"

import React, { useMemo } from "react"
import { Star } from "@/components/base/icon"
import { useMounted } from "@/hooks/media"
import { color1_base, color1_bold, color2_base, color2_bold, defaultSeed } from "@/lib/constants"
import { cn, createStarGlow, pxToRem, range, seededRandom } from "@/lib/utils"

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

function generateStars(seed: number, count: number) {
  if (count === 0) return []

  const random = seededRandom(seed)

  const stars = range(count).map((i) => {
    const size = Math.floor(random() * 20) + 10

    const top = Math.floor(random() * 100)
    const left = Math.floor(random() * 100)

    // pseudo-random color assignment (based on cicada principle)
    // https://www.sitepoint.com/the-cicada-principle-and-why-it-matters-to-web-designers/
    const allowedColorsIndices = i % 5 === 0 || i % 13 === 0 || i % 17 === 0 ? 4 : 2
    const color = [color1_base, color2_base, color1_bold, color2_bold][
      Math.floor(random() * allowedColorsIndices) % allowedColorsIndices
    ]

    return {
      size: `${size}px`,
      top: `${top}%`,
      left: `${left}%`,
      color,
      rotation: Math.floor(random() * 60 - 30),
      bin: Math.floor(random() * 3) % 2,
      duration: (Math.floor(random() * 25) % 25) + 5,
    }
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
    const reasonableStars = Math.floor(availableArea * density)

    return reasonableStars
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
      {mounted &&
        stars.map((star, index) => {
          const animation = star.bin === 0 ? "jellyfish-floating-1" : "jellyfish-floating-2"
          const animationStyle = {
            ["--animation"]: `${animation} ${star.duration}s infinite linear`,
          } as React.CSSProperties

          return (
            <div
              key={index}
              className={cn("absolute motion-safe:custom-animation")}
              style={{
                ...animationStyle,
                top: star.top,
                left: star.left,
                width: star.size,
                height: star.size,
                color: star.color,
                filter: createStarGlow(star.color),
                rotate: `${star.rotation}deg`,
              }}
            >
              <Star />
            </div>
          )
        })}
    </div>
  )
}
