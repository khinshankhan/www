import React, { useEffect, useState } from "react"

import { cx } from "lib/utils"
import { useBreakpoint } from "hooks"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "components/ui"
import { ListBullet } from "components/icons"
import { MenuToggle } from "components/toggles"

interface TocProps {
  headings: { id: string; level: number; content: string }[]
}
export function Toc({ headings: headingsProp }: TocProps) {
  const [open, setOpen] = useState(true)
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

  return (
    <Collapsible className="w-full" open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <button className="w-full">
          <span className="flex items-center justify-between">
            <span>On this page</span>
            <MenuToggle isOpen={open} openIcon={ListBullet} />
          </span>
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="animated-collapsible">
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
