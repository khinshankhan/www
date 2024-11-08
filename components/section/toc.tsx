"use client"

import React, { useRef, useState } from "react"
import { Button } from "@/components/base/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/base/collapsible"
import { ChevronRight } from "@/components/base/icon"
import { Link } from "@/components/base/link"
import { Text, typographyVariants } from "@/components/base/typography"
import { SmartLink } from "@/components/composite/smart-link"
import { useScrollSpy } from "@/hooks/scroll"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export interface Heading {
  id: string
  title: string
  depth: number
}

function TocItem({
  heading,
  indents,
  isActive,
}: {
  heading: Heading
  indents: number
  isActive: boolean
}) {
  const liRef = useRef<HTMLLIElement | null>(null)

  return (
    <li ref={liRef} className="relative w-full">
      {/* default sideline for the toc items */}
      <span className="absolute z-1 h-full w-0.5 bg-muted/40 duration-0" />

      {/* sideline for the active toc item, visually above the default sideline */}
      {isActive && (
        <motion.div
          layoutId="toc-sideline-on"
          className="absolute z-50 w-0.5 bg-accent-link duration-0"
          style={{ height: liRef.current?.offsetHeight ?? 0 }}
        />
      )}

      <SmartLink
        href={`#${heading.id}`}
        data-active={isActive}
        variant="toc"
        className={cn(
          typographyVariants({ variant: "xs" }),
          "inline-block w-full scroll-smooth py-1.5 text-left transition-[background-color] data-[active=false]:duration-500 data-[active=true]:bg-surface-5/25 data-[active=true]:duration-1000",
          indents === 0 && "ps-4",
          indents === 1 && "ps-8",
          indents === 2 && "ps-12",
          indents === 3 && "ps-16",
          indents === 4 && "ps-20",
          indents === 5 && "ps-24"
        )}
      >
        {heading.title}
      </SmartLink>
    </li>
  )
}

interface TocProps {
  headings?: Heading[]
}

function TocList({ headings = [] }: TocProps) {
  const minDepth =
    headings.length === 0
      ? 1 // by default the minimum is 1
      : headings.reduce(
          (min, { depth }) => Math.min(min, depth),
          6 // 6 is an upperbound since headings are limited (h1-h6)
        )

  const activeIds = useScrollSpy(
    headings.map(({ id }) => `[id="${id}"]`),
    {
      rootMargin: "0% 0% -80% 0%",
    }
  )

  const activeId = activeIds[activeIds.length - 1] || headings[0].id

  console.log({ activeId, activeIds })

  if (headings.length === 0) return <div className="mt-4">Nothing to show...</div>

  return (
    <ul className="list-none pt-2">
      {headings?.map((heading, idx) => (
        <TocItem
          key={idx}
          heading={heading}
          indents={heading.depth - minDepth}
          isActive={activeId === heading.id}
        />
      ))}
    </ul>
  )
}

export function Toc({ headings }: TocProps) {
  const [open, setOpen] = useState(true)
  const action = open ? "Close" : "Open"

  return (
    <Collapsible
      className="w-full rounded-lg bg-background-1/25 py-3 px-2 backdrop-blur-md xl:backdrop-blur-sm"
      open={open}
      onOpenChange={setOpen}
    >
      <CollapsibleTrigger asChild>
        <Button
          aria-label={`${action} table of contents.`}
          variant="ghost"
          className="group w-full pl-0 xl:pl-2.5"
        >
          <Text
            as="span"
            variant="h5"
            className="group flex w-full items-center justify-between text-foreground"
          >
            <span>On this page</span>
            <ChevronRight className="ease-arrow-rotation rotate-90 transition-transform duration-300 group-data-[state=closed]:rotate-0" />
          </Text>
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent className="animated-collapsible">
        <TocList headings={headings} />
      </CollapsibleContent>
    </Collapsible>
  )
}
