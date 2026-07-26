"use client"

import React, { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/quicksilver/lib/classname"
import { buttonVariants } from "@/quicksilver/react/primitives/button.variants"
import { MAIN_CONTENT_ID, TOC_CONTENT_ID } from "./skip-targets"

/** Visually hidden until one of its links takes keyboard focus, then slides down from the top. */
export function SkipLinks() {
  const [hasToc, setHasToc] = useState(false)
  const pathname = usePathname()
  const sentinelRef = useRef<HTMLDivElement>(null)
  const isInitialRender = useRef(true)

  // A client-side nav parks focus on <body>, which isn't in the tab sequence, so the next Tab
  // resumes past this bar and the links become unreachable. Focusing a sentinel restarts the
  // sequence here. It sits outside the styled container because focus-within also matches the
  // container itself, which would slide the bar into view on every navigation.
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }
    sentinelRef.current?.focus()
  }, [pathname])

  useEffect(() => {
    // The incoming route's DOM isn't painted yet, so check on the next frame; otherwise a TOC page
    // reached from a non-TOC page comes up missing its link.
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(TOC_CONTENT_ID)
      // offsetParent goes null under display:none, which is how the TOC hides below xl
      setHasToc(target !== null && target.offsetParent !== null)
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname])

  const linkClassName = cn(buttonVariants({ variant: "ghost", size: "sm" }), "text-14")

  return (
    <>
      <div ref={sentinelRef} tabIndex={-1} className="sr-only" aria-hidden="true" />
      <div
        className={cn(
          "fixed inset-x-0 -top-24 z-100 flex items-center gap-3 border-b border-solid border-surface-7 bg-background-2 px-4 py-3 transition-[top] duration-200",
          "focus-within:top-0"
        )}
      >
        <span className="text-14 font-semibold text-foreground-strong">Skip to</span>
        <a href={`#${MAIN_CONTENT_ID}`} className={linkClassName}>
          Main content
        </a>
        {hasToc && (
          <a href={`#${TOC_CONTENT_ID}`} className={linkClassName}>
            Table of contents
          </a>
        )}
      </div>
    </>
  )
}
