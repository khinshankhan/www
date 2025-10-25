"use client"

import React, { useMemo, useState, type CSSProperties } from "react"
import { useIsomorphicEffect } from "@/hooks/core/use-isomorphic-effect"
import { useBreakpoint } from "@/hooks/use-breakpoint"
import { checkIfElementInView, focusElement } from "@/lib/focus"
import { scrollToElement, waitForWindowScrollEnd } from "@/lib/scroll"
import { cn } from "@/quicksilver/lib/classname"
import {
  ActiveAnchorsProvider,
  useActiveAnchors,
} from "@/quicksilver/react/headless/anchor/use-active-anchors"
import { ScrollFadeIn } from "@/quicksilver/react/patterns/motion/scroll-fade-in"
import { Button } from "@/quicksilver/react/primitives/button"
import { Divider } from "@/quicksilver/react/primitives/divider"
import { ChevronRight } from "@/quicksilver/react/primitives/icons"
import { Link } from "@/quicksilver/react/primitives/link"
import { ProgressCircle } from "@/quicksilver/react/primitives/progress-circle"
import { textVariants } from "@/quicksilver/react/primitives/text.variants"
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
      className="link-box relative mx-1 w-full transition-[background-color] data-[active=false]:duration-500 data-[active=true]:bg-surface-5/25 data-[active=true]:duration-1000"
    >
      {/* default sideline */}
      <span className="absolute top-0 left-0 h-full w-0.5 bg-surface-12/10" />

      {/* shared sideline that morphs between active items */}
      {isActive && (
        <motion.span
          layoutId="toc-active-indicator"
          className="absolute inset-y-0 left-0 w-0.5 bg-accent-11 will-change-transform"
          transition={{ type: "spring", stiffness: 420, damping: 36, mass: 0.6 }}
        />
      )}

      <Link
        href={`#${heading.id}`}
        data-active={isActive ? "true" : "false"}
        variant="toc"
        className={cn(
          textVariants({ variant: "xs" }),
          "ml-2 inline-block w-(--w) scroll-smooth py-0 text-left",
          indents === 0 && "ps-2",
          indents === 1 && "ps-6",
          indents === 2 && "ps-10",
          indents === 3 && "ps-14",
          indents === 4 && "ps-18",
          indents === 5 && "ps-22"
        )}
        style={
          {
            "--w": `calc(100% - 0.7rem)`,
          } as CSSProperties
        }
        onClick={async (e) => {
          /* Reasoning for this approach:
           * Since headings aren't "focusable" elements, the 'focus-within' smooth scroll won't work and we need to
           * handle the scroll ourselves. Non js users will still get the default anchor behavior ('abruptly jumping'
           * to the link) which isn't as nice but it's still usable. It's fine as opting to not use js often comes with
           * a different set of expectations. Similarly, focus element won't work for non-js users but it's a nice to have
           * for js users, which hopefully most people who need accessibility tools have on.
           */

          // prevent default anchor behavior
          e.preventDefault()

          // update the url without causing a full page reload
          // this may even handle scrolling to target smoothly
          history.pushState(null, "", `#${heading.id}`)

          // definitively scroll smoothly to the section
          scrollToElement(`#${heading.id}`, { behavior: "smooth" })

          // wait for scroll to end, then focus the element because focusing 'jumps' the page
          await waitForWindowScrollEnd()
          const isElementInView = await checkIfElementInView(`#${heading.id}`)
          if (isElementInView) {
            focusElement(`#${heading.id} a`)
          }
        }}
      >
        {heading.title}
      </Link>
    </li>
  )
}

interface TocTitleProps {
  isOpen: boolean
  headings: Heading[]
}
function TocTitle({ isOpen, headings }: TocTitleProps) {
  const { activeId } = useActiveAnchors()
  const activeHeading =
    (activeId ? headings.find((h) => h.id === activeId) : headings[0])?.title ?? "No headings found"

  const activeIndex = headings.findIndex((h) => h.id === activeId)
  const progress = activeIndex === -1 ? 0 : ((activeIndex + 1) / headings.length) * 100

  return (
    <span className="flex items-center justify-center gap-2 xl:justify-start">
      <ProgressCircle value={progress} className="accent-theme-default size-[1em] text-accent-11" />

      <span className={cn(textVariants({ variant: "h5" }), "text-foreground")}>
        <span
          className="block max-w-(--max-w-mobile) overflow-hidden text-ellipsis xl:hidden"
          style={
            {
              "--max-w-mobile": "calc(min(55ch, 100vw) - 5em)",
            } as CSSProperties
          }
        >
          {isOpen ? "On this page" : activeHeading}
        </span>
        <span className="hidden xl:block">On this page</span>
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
          className={cn("sticky top-0 w-full bg-background-2 py-2", className)}
        >
          <Collapsible.Trigger
            render={(props) => (
              <Button
                {...props}
                variant="ghost"
                className="group relative mx-auto flex w-full max-w-[55ch] justify-between px-2 py-2 xl:hidden xl:max-w-full"
                onClick={() => setIsOpen(!isOpen)}
              >
                <TocTitle isOpen={isOpen} headings={headings} />
                <ChevronRight className="size-5 rotate-90 transition-all duration-300 ease-out group-data-[panel-open]:-rotate-90" />
              </Button>
            )}
          />

          <div className="hidden px-1 text-foreground-muted xl:block">
            <TocTitle isOpen={isOpen} headings={headings} />
          </div>

          <Collapsible.Panel
            className="mx-auto flex h-(--h) flex-col justify-end overflow-hidden opacity-100 transition-all ease-out data-[ending-style]:h-0 data-[ending-style]:opacity-0 data-[starting-style]:h-0 data-[starting-style]:opacity-0"
            style={
              {
                ["--h"]: "var(--collapsible-panel-height)",
              } as CSSProperties
            }
          >
            <nav aria-label="Table of contents" className="px-1 pt-2 pb-2">
              <ul className="list-none">
                {headings.map((heading) => (
                  <TocItem key={heading.id} heading={heading} indents={heading.depth - minDepth} />
                ))}
              </ul>
            </nav>
          </Collapsible.Panel>

          <ScrollFadeIn startPx={150} rangePx={400}>
            <Divider
              className="absolute bottom-0 left-1/2 z-2 block w-full -translate-x-1/2 transform xl:hidden"
              intensity="solid"
              style={{
                width:
                  // NOTE: we minus 20px to account for scrollbar, otherwise a horizontal scroll may appear
                  "calc(100dvw - 20px)",
              }}
            />
          </ScrollFadeIn>
        </Collapsible.Root>
      </LayoutGroup>
    </ActiveAnchorsProvider>
  )
}
