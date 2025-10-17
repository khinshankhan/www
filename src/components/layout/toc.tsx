"use client"

import React from "react"
import {
  ActiveAnchorsProvider,
  useActiveAnchors,
} from "@/components/design-system/patterns/view-observers/active-anchors"
import { ListTree } from "@/components/design-system/primitives/icon"
import { H2 } from "@/components/design-system/primitives/text"
import { cn } from "@/lib/utils"

export interface Heading {
  id: string
  title: string
  depth: number
}

interface TocItemProps {
  heading: Heading
}
function TocItem({ heading }: TocItemProps) {
  const { activeId } = useActiveAnchors()
  const isActive = activeId === heading.id

  // TODO: implement this
  return (
    <li>
      <a
        className={cn("pl-4 hover:underline", isActive && "text-accent-11")}
        href={`#${heading.id}`}
      >
        {heading.title}
      </a>
    </li>
  )
}

interface TableOfContentsProps {
  headings?: Heading[]
  className?: string
}

export function TOC({ headings = [], className = "" }: TableOfContentsProps) {
  return (
    <ActiveAnchorsProvider ids={headings.map((h) => h.id)}>
      <nav
        aria-label="Table of contents"
        className={cn(
          "bg-background-2 xl:bg-background-2/70 sticky top-0 w-full rounded-lg rounded-t-none px-2 py-3 backdrop-blur xl:-mt-3",
          className
        )}
      >
        <H2
          variant="h5"
          className="text-foreground mb-4 mt-0 flex flex-row items-center justify-start gap-2"
        >
          <span>
            <ListTree />
          </span>
          On this page
        </H2>

        <ul
          className="border-background-1 flex flex-col gap-2"
          style={{
            borderLeftWidth: "1.5px",
          }}
        >
          {headings.map((heading) => (
            <TocItem key={heading.id} heading={heading} />
          ))}
        </ul>
      </nav>
    </ActiveAnchorsProvider>
  )
}
