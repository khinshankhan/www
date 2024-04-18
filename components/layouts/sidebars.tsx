"use client"

import React, { useState } from "react"
import { useBreakpoints, useIsomorphicEffect, useScrollSpy } from "@/hooks"
import { cn, scrollToElement, truthyPredicate } from "@/lib/utils"
import { SvgIcon } from "@/components/icons"
import { Button } from "@/components/primitives/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/primitives/collapsible"
import { linkVariants } from "@/components/primitives/link"
import { typographyVariants } from "@/components/primitives/typography"

export function scrollToHeading(event: React.MouseEvent<HTMLButtonElement>) {
  const id = event.currentTarget.dataset.id
  if (!id) return // too lazy to do type assertion
  // TODO: might be sweet to toast 'successfully scroll to <content>'
  scrollToElement(`[id="${id}"]`)
}

interface TocProps {
  headings?: { id: string; level: number; text: string }[]
  showExcerpt?: boolean
}

export function Toc({ headings: headingsProp = [], showExcerpt = true }: TocProps) {
  const [open, setOpen] = useState(false)
  const action = open ? "Close" : "Open"

  const { isXl } = useBreakpoints()
  useIsomorphicEffect(() => setOpen(isXl), [isXl])

  const minLevel =
    headingsProp.length === 0
      ? 0 // by default the minimum is 0 (no headings)
      : headingsProp.reduce(
          (min, { level }) => Math.min(min, level),
          7 // 7 is an upperbound since indents are limited to 6 due to h1-h6
        )

  const headings = [
    showExcerpt && { id: "excerpt", level: minLevel, text: "Introduction" },
    ...headingsProp,
  ].filter(truthyPredicate)

  const activeIds = useScrollSpy(
    headings.map(({ id }) => `[id="${id}"]`),
    { rootMargin: "0px 0px -65% 0px" }
  )

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
        <ul className="mt-4">
          {headings.map(({ id, level, text }) => {
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
                <button
                  data-id={id}
                  onClick={scrollToHeading}
                  className="pointer-events-auto text-left"
                >
                  <span className={linkVariants({ variant: active ? "on" : "default" })}>
                    {text}
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
