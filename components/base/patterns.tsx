"use client"

import React, { useMemo } from "react"
import { useBreakpoint, useMounted } from "@/hooks/media"
import { cn, range } from "@/lib/utils"

// floating cogs from https://heropatterns.com/
export const floatingCogsUrl = "url(/floating-cogs.svg?v=1)"

const contentPatternBlockHeight = 50
const contentPatternBlockDistance = 48
const contentPatternBlockGap = 8

const pxToRem = (px: number) => px / 16

function calculateBlocks(h: number, b: number, g: number) {
  if (b <= 0) throw new Error("Block height must be greater than 0")
  if (g < 0) throw new Error("Gap must be non-negative")

  return Math.floor((h + g) / (b + g))
}

export function ContentPattern() {
  const mounted = useMounted()
  const isLg = useBreakpoint("lg")

  const blockCount = useMemo(() => {
    if (!mounted || !isLg) return 0

    // NOTE: this height is in px
    const pageContentHeight = document.getElementById("page-content")?.clientHeight
    const availableHeight = Math.floor(pxToRem(pageContentHeight ?? 0))

    const blockHeightAfterClip = contentPatternBlockHeight * 0.75

    const possibleBlockCount = calculateBlocks(
      availableHeight,
      blockHeightAfterClip,
      contentPatternBlockDistance + contentPatternBlockGap - blockHeightAfterClip
    )

    return possibleBlockCount
  }, [mounted, isLg])

  if (
    !mounted ||
    !isLg ||
    // we don't want to show the pattern with just one block
    blockCount < 2
  ) {
    return null
  }

  return range(0, blockCount).map((i) => {
    return (
      <div
        key={i}
        role="presentation"
        className="absolute -z-1 size-0 lg:h-[var(--content-pattern-block-height)] lg:w-20 xl:w-40"
        style={
          {
            "--content-pattern-block-height": `${contentPatternBlockHeight}rem`,
            [i % 2 ? "right" : "left"]: "0",
            top: `${i * contentPatternBlockDistance + contentPatternBlockGap}rem`,
          } as React.CSSProperties
        }
      >
        <div
          className={cn(
            "absolute inset-0 w-full bg-transparent",
            i % 2 ? "mask-gradient-reveal-from-right" : "mask-gradient-reveal-from-left"
          )}
          style={{
            background: floatingCogsUrl,
          }}
        ></div>
      </div>
    )
  })
}

export function HeroPattern() {
  const mounted = useMounted()
  const isLg = useBreakpoint("lg")

  if (!mounted || !isLg) return null

  return (
    <div role="presentation" className={"absolute top-0 left-0 -z-1 size-0 lg:size-full"}>
      <div
        className="absolute inset-0 w-full bg-transparent mask-gradient-reveal-center"
        style={{
          background: floatingCogsUrl,
        }}
      ></div>
    </div>
  )
}
