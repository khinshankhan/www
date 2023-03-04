import React, { useEffect, useState } from "react"

import { cx } from "lib/utils"
import { useBreakpoint, useMounted } from "hooks"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "components/ui"
import { ChevronDown } from "components/icons"

interface TocProps {
  headings: { id: string; level: number; content: string }[]
}
export function Toc({ headings: headingsProp }: TocProps) {
  const mounted = useMounted()
  const [open, setOpen] = useState(true)
  const action = open ? "Close" : "Open"

  const isXl = useBreakpoint("xl")
  useEffect(() => {
    if (isXl) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [isXl])

  const minLevel =
    headingsProp.length === 0 ? 0 : headingsProp.reduce((min, { level }) => Math.min(min, level), 7)

  const headings = [{ id: "excerpt", level: minLevel, content: "Introduction" }, ...headingsProp]

  if (!mounted) {
    return null
  }

  return (
    <Collapsible className="w-full" open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <button className="group w-full" aria-label={`${action} table of contents.`}>
          <span className="group flex items-center justify-between">
            <span>On this page</span>
            <ChevronDown
              className="text-violet10 transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=closed]:-rotate-90"
              aria-hidden
            />
          </span>
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="motion-safe:animated-collapsible">
        <ul className="mt-4">
          {headings.map(({ id, level, content }) => {
            // TODO: use a scrollspy to determine active
            const active = false
            const indents = level - minLevel
            return (
              <li
                key={id}
                className={cx(
                  "hyphens-auto",
                  active ? "shadow-tocOn" : "shadow-tocBase",
                  // this should be exhaustive for h1-6
                  indents === 0 && "pl-4",
                  indents === 1 && "pl-10",
                  indents === 2 && "pl-16",
                  indents === 3 && "pl-24",
                  indents === 4 && "pl-[7.5rem]", // 30 if it existed
                  indents === 5 && "pl-36"
                )}
              >
                <a href="#">{content}</a>
              </li>
            )
          })}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  )
}
