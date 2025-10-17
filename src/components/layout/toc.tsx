"use client"

import React from "react"
import {
  ActiveAnchorsProvider,
  useActiveAnchors,
} from "@/components/design-system/patterns/view-observers/active-anchors"
import { ListTree } from "@/components/design-system/primitives/icon"
import { Link } from "@/components/design-system/primitives/link"
import { H2 } from "@/components/design-system/primitives/text"
import { typographyVariants } from "@/components/design-system/primitives/typography"
import { cn } from "@/lib/utils"
import { LayoutGroup, motion } from "motion/react"

export interface Heading {
  id: string
  title: string
  depth: number
}

interface TocItemProps {
  heading: Heading
  indents: number
}
function TocItem({ heading, indents }: TocItemProps) {
  const { activeId } = useActiveAnchors()
  const isActive = activeId === heading.id

  return (
    <li
      data-active={isActive ? "true" : "false"}
      className="link-box data-[active=true]:bg-surface-5/25 relative mx-1 w-full transition-[background-color] data-[active=false]:duration-500 data-[active=true]:duration-1000"
    >
      {/* default sideline */}
      <span className="bg-surface-12/10 absolute left-0 top-0 h-full w-0.5" />

      {/* shared sideline that morphs between active items */}
      {isActive && (
        <motion.span
          layoutId="toc-active-indicator"
          className="bg-accent-11 absolute inset-y-0 left-0 w-0.5 will-change-transform"
          transition={{ type: "spring", stiffness: 420, damping: 36, mass: 0.6 }}
        />
      )}

      <Link
        href={`#${heading.id}`}
        data-active={isActive ? "true" : "false"}
        variant="toc"
        className={cn(
          typographyVariants({ variant: "xs" }),
          "ml-1 inline-block w-full scroll-smooth py-0 pe-1 text-left",
          indents === 0 && "ps-4",
          indents === 1 && "ps-8",
          indents === 2 && "ps-12",
          indents === 3 && "ps-16",
          indents === 4 && "ps-20",
          indents === 5 && "ps-24"
        )}
      >
        {heading.title}
      </Link>
    </li>
  )
}

interface TableOfContentsProps {
  headings?: Heading[]
  className?: string
}

export function TOC({ headings = [], className = "" }: TableOfContentsProps) {
  const minDepth =
    headings.length === 0
      ? 1 // 1 is an lowerbound since headings are limited (h1-h6) and this gets used for indents
      : Math.min(...headings.map(({ depth }) => depth))

  return (
    <ActiveAnchorsProvider ids={headings.map((h) => h.id)}>
      <LayoutGroup id="toc">
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

          <ul className="list-none">
            {headings.map((heading) => (
              <TocItem key={heading.id} heading={heading} indents={heading.depth - minDepth} />
            ))}
          </ul>
        </nav>
      </LayoutGroup>
    </ActiveAnchorsProvider>
  )
}
