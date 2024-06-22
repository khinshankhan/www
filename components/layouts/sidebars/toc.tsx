"use client"

import React, { useRef, useState, type ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
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

export interface TOCItemType {
  id: string
  depth: number
  title: ReactNode
}

interface TocProps {
  headings?: TOCItemType[]
}

export function Toc({ headings = [] }: TocProps) {
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
        <TocList headings={headings} />
      </CollapsibleContent>
    </Collapsible>
  )
}

function TocList({ headings = [] }: TocProps) {
  const minDepth =
    headings.length === 0
      ? 0 // by default the minimum is 0 (no headings)
      : headings.reduce(
          (min, { depth }) => Math.min(min, depth),
          7 // 7 is an upperbound since indents are limited to 6 due to h1-h6
        )

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
              activeIds.includes(heading.id) ||
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
  heading: TOCItemType
  indents: number
  isFirstItem: boolean
  isLastItem: boolean
  isActive: boolean
}) {
  const liRef = useRef<HTMLLIElement | null>(null)

  return (
    <li key={id} ref={liRef} data-active={isActive} className={cn("pointer-events-none relative")}>
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
          "pointer-events-auto text-left",
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
      >
        <span className={cn(typographyVariants({ variant: "small" }), "hyphens-auto")}>
          {title}
        </span>
      </button>
    </li>
  )
}

export default Toc