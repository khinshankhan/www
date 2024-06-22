"use client"

import React, { useState } from "react"
import { cn, range } from "@/lib/utils"
import { useIsomorphicEffect } from "@/hooks/media"

// floating cogs from https://heropatterns.com/
export const floatingCogsUrl = "url(/floating-cogs.svg?v=1)"

const contentPatternBlockHeight = 50
const contentPatternBlockDistance = 48

const remToPx = (rem: number) => rem * 16

export function ContentPattern() {
  const [blockCount, setBlockCount] = useState(0)

  useIsomorphicEffect(() => {
    if (!document) return

    // NOTE: this height is in px
    const pageContentHeight = document.getElementById("page-content")?.clientHeight
    const possibleBlockCount = Math.floor(
      ((pageContentHeight ?? 0) -
        // leave some margin at the bottom
        remToPx(contentPatternBlockHeight) / 8) /
        // distance between blocks tops is all that matters
        remToPx(contentPatternBlockDistance)
    )

    // we don't want to show the pattern with just one block
    setBlockCount(possibleBlockCount > 1 ? possibleBlockCount : 0)
  }, [])

  return range(0, blockCount).map((i) => {
    return (
      <div
        key={i}
        role="presentation"
        className="absolute -z-1 size-0 lg:h-[var(--content-pattern-block-height)] lg:w-20 xl:w-40"
        style={{
          // @ts-ignore: this is a css variable which is perfectly valid
          "--content-pattern-block-height": `${contentPatternBlockHeight}rem`,
          [i % 2 ? "right" : "left"]: "0",
          top: `${i * contentPatternBlockDistance + 8}rem`,
        }}
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
  return (
    <div role="presentation" className={"absolute left-0 top-0 -z-1 size-0 lg:size-full"}>
      <div
        className="mask-gradient-reveal-center absolute inset-0 w-full bg-transparent"
        style={{
          background: floatingCogsUrl,
        }}
      ></div>
    </div>
  )
}
