"use client"

import React, { useRef, useState } from "react"
import { motion } from "framer-motion"
import { type TocItem } from "@/lib/mdx-plugins/remark-toc"
import { cn, scrollToElement } from "@/lib/utils"
import { useBreakpoint, useIsomorphicEffect } from "@/hooks/media"
import { useScrollSpy } from "@/hooks/scroll"
import { Button } from "@/components/primitives/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/primitives/collapsible"
import { linkVariants } from "@/components/primitives/link"
import { SvgIcon } from "@/components/primitives/svg-icon"
import { typographyVariants } from "@/components/primitives/typography"

interface TocProps {
  headings?: TocItem[]
  markExcerpt?: boolean
}

export function Toc({ headings = [], markExcerpt = true }: TocProps) {
  const [open, setOpen] = useState(false)
  const action = open ? "Close" : "Open"

  const isXl = useBreakpoint("xl")
  useIsomorphicEffect(() => setOpen(isXl), [isXl])

  return (
    <Collapsible
      className="w-full rounded-lg bg-background/25 px-2 py-3 backdrop-blur-md xl:backdrop-blur-sm"
      open={open}
      onOpenChange={setOpen}
    >
      <CollapsibleTrigger asChild>
        <Button
          aria-label={`${action} table of contents.`}
          variant="ghost"
          className="group w-full pl-0 xl:pl-2.5"
        >
          <span
            className={cn(
              typographyVariants({ variant: "h5" }),
              "group flex w-full items-center justify-between text-knockout"
            )}
          >
            <span>On this page</span>
            <SvgIcon id="chevron-down" className="animated-arrow" aria-hidden />
          </span>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="motion-safe:animated-collapsible">
        <TocList headings={headings} markExcerpt={markExcerpt} />
      </CollapsibleContent>
    </Collapsible>
  )
}

function TocList({ headings: headingsProp = [], markExcerpt = true }: TocProps) {
  const minDepth =
    headingsProp.length === 0
      ? 1 // by default the minimum is 1
      : headingsProp.reduce(
          (min, { depth }) => Math.min(min, depth),
          6 // 6 is an upperbound since headings are limited (h1-h6)
        )

  const headings: TocItem[] = !markExcerpt
    ? headingsProp
    : [
        {
          id: "excerpt",
          title: "Introduction",
          depth: minDepth,
        },
        ...headingsProp,
      ]

  const activeIds = useScrollSpy(
    headings.map(({ id }) => `[id="${id}"]`),
    { rootMargin: `0% 0% -80% 0%` }
  )

  if (headings.length === 0) return <div className="mt-4">Nothing to show...</div>

  return (
    <ul className="isolate z-0 mt-4">
      {headings.map((heading, idx) => {
        return (
          <TocItem
            key={heading.id}
            heading={heading}
            indents={heading.depth - minDepth}
            isFirstItem={idx === 0}
            isLastItem={idx === headings.length - 1}
            isActive={
              activeIds?.[0] === heading.id ||
              // forcibly activate the first item if no other items are active
              (activeIds.length === 0 && idx === 0)
            }
          />
        )
      })}
    </ul>
  )
}

function TocItem({
  heading: { id, title },
  indents,
  isFirstItem,
  isLastItem,
  isActive,
}: {
  heading: TocItem
  indents: number
  isFirstItem: boolean
  isLastItem: boolean
  isActive: boolean
}) {
  const liRef = useRef<HTMLLIElement | null>(null)

  return (
    <li key={id} ref={liRef} data-active={isActive} className="pointer-events-none relative">
      {/* default sideline for the toc items */}
      <span className="absolute z-1 h-full w-0.5 bg-muted duration-0" />

      {/* sideline for the active toc item, visually above the default sideline */}
      {isActive && (
        <motion.div
          layoutId="toc-sideline-on"
          className="absolute z-sticky w-0.5 bg-link-border duration-0"
          style={{ height: liRef.current?.offsetHeight ?? 0 }}
        />
      )}

      <button
        data-active={isActive}
        className={cn(
          linkVariants({ variant: "toc" }),
          typographyVariants({ variant: "small" }),
          "pointer-events-auto text-left transition-[font-weight] data-[active=true]:font-semibold",
          isFirstItem && "pb-1.5",
          isLastItem && "pt-1.5",
          !isFirstItem && !isLastItem && "py-1.5",
          // this should be exhaustive for h1-6
          indents === 0 && "ps-4",
          indents === 1 && "ps-8",
          indents === 2 && "ps-12",
          indents === 3 && "ps-16",
          indents === 4 && "ps-20",
          indents === 5 && "ps-24"
        )}
        onClick={() => {
          scrollToElement(`[id="${id}"]`)
        }}
      >
        <span className="hyphens-auto">{title}</span>
      </button>
    </li>
  )
}

export default Toc
