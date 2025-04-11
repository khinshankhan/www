"use client"

import React, { useRef, useState } from "react"
import { Button } from "@/components/base/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/base/collapsible"
import { ChevronRight, ListTree } from "@/components/base/icon"
import { Text, typographyVariants } from "@/components/base/typography"
import { SmartLink } from "@/components/composite/smart-link"
import { useBreakpoint, useIsomorphicEffect } from "@/hooks/media"
import { useScrollSpy } from "@/hooks/scroll"
import {
  checkIfElementInView,
  cn,
  focusElement,
  scrollToElement,
  waitForWindowScrollEnd,
} from "@/lib/utils"
import { motion } from "framer-motion"
import Slugger from "github-slugger"

export interface Heading {
  id: string
  title: string
  depth: number
}

function TocItem({
  heading,
  indents,
  isActive,
  layoutId,
}: {
  heading: Heading
  indents: number
  isActive: boolean
  layoutId: string
}) {
  const liRef = useRef<HTMLLIElement | null>(null)

  return (
    <li
      ref={liRef}
      data-active={isActive}
      className={
        "link-box relative mx-1 w-full transition-[background-color] data-[active=false]:duration-500 data-[active=true]:bg-surface-5/25 data-[active=true]:duration-1000"
      }
    >
      {/* default sideline for the toc items */}
      <span className="absolute z-1 h-full w-0.5 bg-knockout/10 duration-0" />

      {/* sideline for the active toc item, visually above the default sideline */}
      {isActive && (
        <motion.span
          layoutId={layoutId}
          className="absolute z-50 w-0.5 bg-accent-11 duration-0"
          style={{ height: liRef.current?.offsetHeight ?? 0 }}
        />
      )}

      <SmartLink
        href={`#${heading.id}`}
        aria-label={`Jump to ${heading.title}`}
        data-active={isActive}
        variant="toc"
        className={cn(
          typographyVariants({ variant: "xs" }),
          "link-overlay ml-1 inline-block w-full scroll-smooth py-1.5 pe-1 text-left",
          indents === 0 && "ps-4",
          indents === 1 && "ps-8",
          indents === 2 && "ps-12",
          indents === 3 && "ps-16",
          indents === 4 && "ps-20",
          indents === 5 && "ps-24"
        )}
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
      </SmartLink>
    </li>
  )
}

interface TocProps {
  headings?: Heading[]
}

function TocList({
  headings = [],
  layoutId,
  className = "",
  activeId,
}: TocProps & { layoutId: string; className?: string; activeId: string }) {
  const minDepth =
    headings.length === 0
      ? 1 // 1 is an lowerbound since headings are limited (h1-h6) and this gets used for indents
      : Math.min(...headings.map(({ depth }) => depth))

  if (headings.length === 0) return <div className="mt-4">Nothing to show...</div>

  return (
    <ul className={cn("list-none pt-2", className)}>
      {headings?.map((heading, idx) => (
        <TocItem
          key={idx}
          heading={heading}
          indents={heading.depth - minDepth}
          isActive={activeId === heading.id}
          layoutId={layoutId}
        />
      ))}
    </ul>
  )
}

function TocDescription() {
  return (
    <Text
      as="span"
      variant="h5"
      className="group flex w-full items-center justify-between text-foreground"
    >
      <span className="flex w-full items-center gap-2 text-foreground xl:gap-4">
        <ListTree />
        <span>On this page</span>
      </span>

      <ChevronRight className="block rotate-90 transition-transform duration-300 ease-arrow-rotation group-data-[state=closed]:rotate-0 xl:hidden" />
    </Text>
  )
}

const layoutIdSlugger = new Slugger()
export function Toc({ headings }: TocProps) {
  layoutIdSlugger.reset()

  const [open, setOpen] = useState(false)
  const action = open ? "Close" : "Open"

  const isXl = useBreakpoint("xl")
  useIsomorphicEffect(() => setOpen(isXl), [isXl])

  // this exists outside of the collapsible content so it won't be unmounted
  // allowing us to track the current active id even if the toc is closed
  const activeIdsString = useScrollSpy({
    selectors: (headings ?? []).map(({ id }) => `[id="${id}"]`),
    options: {
      rootMargin: "0% 0% -80% 0%",
    },
  })
  const activeIds = activeIdsString.split(" ")
  const activeId = activeIds[activeIds.length - 1] || (headings?.[0]?.id ?? "")

  return (
    <>
      <Collapsible
        className="block h-[64px] w-full rounded-lg bg-background-1/25 px-2 py-3 backdrop-blur-2xl data-[state=open]:bg-background-1 xl:hidden"
        open={open}
        onOpenChange={setOpen}
      >
        <CollapsibleTrigger asChild>
          <Button
            aria-label={`${action} table of contents.`}
            variant="ghost"
            className="group w-full pl-2.5"
          >
            <TocDescription />
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="animated-collapsible pt-4">
          <TocList
            headings={headings}
            activeId={activeId}
            layoutId={layoutIdSlugger.slug("toc-sideline-on")}
            className="rounded-lg bg-background-1 pb-1 backdrop-blur-2xl"
          />
        </CollapsibleContent>
      </Collapsible>

      <div className="hidden w-full rounded-lg px-2 py-3 backdrop-blur-xs xl:block">
        <div>
          <TocDescription />
        </div>
        <div className="animated-collapsible">
          <TocList
            headings={headings}
            activeId={activeId}
            layoutId={layoutIdSlugger.slug("toc-sideline-on")}
          />
        </div>
      </div>
    </>
  )
}
