"use client"

import React, { useEffect, useState } from "react"
import { cn, scrollToElement, truthyPredicate } from "@/lib/utils"
import { useBreakpoint, useMounted, useScrollSpy } from "hooks"
import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Icon,
  typographyVariants,
} from "@/components/ui"
import { ChevronDown } from "@/components/icons"

export function scrollToHeading(event: React.MouseEvent<HTMLButtonElement>) {
  const id = event.currentTarget.dataset.id
  if (!id) return // too lazy to do type assertion
  // TODO: might be sweet to toast 'successfully scroll to <content>'
  scrollToElement(`[id="${id}"]`)
}

interface TocProps {
  headings?: { id: string; level: number; content: string }[]
  showExcerpt?: boolean
}

export function Toc({ headings: headingsProp = [], showExcerpt = true }: TocProps) {
  const mounted = useMounted()
  const [open, setOpen] = useState(true)
  const action = open ? "Close" : "Open"

  const isXl = useBreakpoint("xl")
  useEffect(() => setOpen(isXl), [isXl])

  const minLevel =
    headingsProp.length === 0
      ? 0 // by default the minimum is 0
      : headingsProp.reduce(
          (min, { level }) => Math.min(min, level),
          7 // 7 is an upperbound since indents are limited to 6 due to h1-6
        )

  const headings = [
    showExcerpt && { id: "excerpt", level: minLevel, content: "Introduction" },
  ].filter(truthyPredicate)

  const activeIds = useScrollSpy(
    headings.map(({ id }) => `[id="${id}"]`),
    { rootMargin: "-15% 0% -80% 0%" }
  )

  if (!mounted) {
    return null
  }

  if (headingsProp.length === 0 && !showExcerpt) {
    return null
  }

  return (
    <Collapsible className="w-full" open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <Button
          aria-label={`${action} table of contents.`}
          variant="ghost"
          className="group w-full pl-0 xl:pl-2.5"
        >
          <span className="group flex items-center justify-between">
            <span>On this page</span>
            <Icon>
              <ChevronDown className="text-violet10 animated-arrow" aria-hidden />
            </Icon>
          </span>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="motion-safe:animated-collapsible">
        <ul className="mt-4">
          {headings.map(({ id, level, content }) => {
            const active = activeIds.includes(id)
            const indents = level - minLevel

            return (
              <li
                key={id}
                className={cn(
                  "pointer-events-none hyphens-auto border-l-2 border-link-base pb-0.5 last:pb-1",
                  active && "border-link-active",
                  // this should be exhaustive for h1-6
                  indents === 0 && "pl-4",
                  indents === 1 && "pl-10",
                  indents === 2 && "pl-16",
                  indents === 3 && "pl-24",
                  indents === 4 && "pl-[7.5rem]", // 30 if it existed
                  indents === 5 && "pl-36"
                )}
              >
                <button data-id={id} onClick={scrollToHeading} className="pointer-events-auto">
                  <span className={typographyVariants({ variant: active ? "link-on" : "link" })}>
                    {content}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  )
}

export default Toc
