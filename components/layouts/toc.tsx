import React, { useEffect, useState } from "react"

import { cx, scrollToElement } from "lib/utils"
import { useBreakpoint, useMounted, useScrollSpy } from "hooks"

import { Button, Collapsible, CollapsibleContent, CollapsibleTrigger, Icon } from "components/ui"
import { ChevronDown } from "components/icons"

export function scrollToHeading(event: React.MouseEvent<HTMLButtonElement>) {
  const id = event.currentTarget.dataset.id
  if (!id) return // too lazy to do type assertion
  // TODO: might be sweet to toast 'successfully scroll to <content>'
  scrollToElement(`[id="${id}"]`)
}

interface TocProps {
  headings: { id: string; level: number; content: string }[]
}
export function Toc({ headings: headingsProp }: TocProps) {
  const mounted = useMounted()
  const [open, setOpen] = useState(true)
  const action = open ? "Close" : "Open"

  const isXl = useBreakpoint("xl")
  useEffect(() => setOpen(isXl), [isXl])

  const minLevel =
    headingsProp.length === 0 ? 0 : headingsProp.reduce((min, { level }) => Math.min(min, level), 7)

  const headings = [{ id: "excerpt", level: minLevel, content: "Introduction" }, ...headingsProp]

  const activeIds = useScrollSpy(
    headings.map(({ id }) => `[id="${id}"]`),
    { rootMargin: "-20% 0% -80% 0%" }
  )

  if (!mounted) {
    return null
  }

  return (
    <Collapsible className="w-full" open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <Button
          aria-label={`${action} table of contents.`}
          variant="ghost"
          className="group w-full"
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
                className={cx(
                  "pointer-events-none border-l-2 border-link-base pb-0.5 hyphens-auto last:pb-1 focus-within:border-link-on hover:border-link-on",
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
                <button data-id={id} onClick={scrollToHeading} className="link pointer-events-auto">
                  {content}
                </button>
              </li>
            )
          })}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  )
}
