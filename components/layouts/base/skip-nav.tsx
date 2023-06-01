"use client"

import React, { useEffect } from "react"
import { usePathname } from "next/navigation"
import { Link, buttonVariants } from "@/components/ui"

export function focusSkipNav(blur = false) {
  const el = document.getElementById("skip-nav")
  if (el) {
    el?.focus()
    if (blur) {
      el?.blur()
    }
  }
}

export function SkipNav() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === "undefined") return undefined
    if (window.location.hash) return undefined
    focusSkipNav(true)
  }, [pathname])

  return (
    <div
      id="skip-nav"
      tabIndex={-1}
      className="absolute -top-96 -z-1 mt-6 w-full focus-within:top-0 focus-within:z-skipLink"
    >
      <div className="page-container">
        <Link
          id="skip-to-content"
          href="#content"
          className={buttonVariants({ variant: "primary" })}
          variant="default"
        >
          Skip to content
        </Link>
      </div>
    </div>
  )
}

export default SkipNav
