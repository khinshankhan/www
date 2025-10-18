"use client"

import React, { useMemo, useState } from "react"
import {
  ActiveAnchorsProvider,
  useActiveAnchors,
} from "@/components/design-system/patterns/view-observers/active-anchors"
import { Button } from "@/components/design-system/primitives/button"
import { ChevronDown, ListTree } from "@/components/design-system/primitives/icon"
import { Link } from "@/components/design-system/primitives/link"
import { ProgressCircle } from "@/components/design-system/primitives/progress-circle"
import { typographyVariants } from "@/components/design-system/primitives/typography"
import { useBreakpoint } from "@/hooks/breakpoints"
import { useIsomorphicEffect } from "@/hooks/core/useIsomorphicEffect"
import { cn } from "@/lib/utils"
import { LayoutGroup, motion } from "motion/react"
import { Collapsible } from "@base-ui-components/react/collapsible"

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

interface MobileTocLabelProps {
  isOpen: boolean
  headings: Heading[]
}
function MobileTocLabel({ isOpen, headings }: MobileTocLabelProps) {
  const { activeId } = useActiveAnchors()
  const activeHeading =
    (activeId ? headings.find((h) => h.id === activeId) : headings?.[0])?.title ||
    "No headings found"

  const activeIndex = headings.findIndex((h) => h.id === activeId)
  const progress = activeIndex === -1 ? 0 : ((activeIndex + 1) / headings.length) * 100

  return (
    <span className="flex items-center gap-2">
      <ProgressCircle value={progress} className="accent-theme-default text-accent-11 size-[1em]" />

      <span className={cn(typographyVariants({ variant: "h5" }), "text-foreground")}>
        {isOpen ? "On this page" : activeHeading}
      </span>
    </span>
  )
}

interface TableOfContentsProps {
  headings?: Heading[]
  className?: string
}
export function TOC({ headings = [], className = "" }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const isXl = useBreakpoint("xl")
  useIsomorphicEffect(() => setIsOpen(isXl), [isXl])

  const minDepth = headings.length === 0 ? 1 : Math.min(...headings.map(({ depth }) => depth))
  const ids = useMemo(() => headings.map((h) => h.id), [headings])

  return (
    <ActiveAnchorsProvider ids={ids}>
      <LayoutGroup id="toc">
        <Collapsible.Root
          open={isOpen}
          className={cn("bg-background-2 sticky top-0 w-full py-2", className)}
        >
          <Collapsible.Trigger
            render={(props) => (
              <Button
                {...props}
                variant="ghost"
                className="group flex w-full justify-between px-2 py-2 xl:hidden"
                onClick={() => setIsOpen(!isOpen)}
              >
                <MobileTocLabel isOpen={isOpen} headings={headings} />
                <ChevronDown className="size-5 rotate-90 transition-all duration-300 ease-out group-data-[panel-open]:-rotate-90" />
              </Button>
            )}
          />

          <div className="text-foreground-muted hidden px-1 xl:block">
            <span className="flex items-center gap-2">
              <ListTree />
              <span className={cn(typographyVariants({ variant: "h5" }), "text-foreground-muted")}>
                On this page
              </span>
            </span>
          </div>

          <Collapsible.Panel
            className="h-(--h) flex flex-col justify-end overflow-hidden opacity-100 transition-all ease-out data-[ending-style]:h-0 data-[starting-style]:h-0 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0"
            style={
              {
                ["--h"]: "var(--collapsible-panel-height)",
              } as React.CSSProperties
            }
          >
            <nav aria-label="Table of contents" className="px-1 pb-2 pt-2">
              <ul className="list-none">
                {headings.map((heading) => (
                  <TocItem key={heading.id} heading={heading} indents={heading.depth - minDepth} />
                ))}
              </ul>
            </nav>
          </Collapsible.Panel>
        </Collapsible.Root>
      </LayoutGroup>
    </ActiveAnchorsProvider>
  )
}
