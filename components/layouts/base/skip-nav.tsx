"use client"

import React, { useEffect } from "react"
import { usePathname } from "next/navigation"

export function focusSkipNav(blur = false) {
  const el = document.getElementById("skip-nav")
  if (el) {
    el?.focus()
    if (blur) {
      el?.blur()
    }
  }
}

// TODO: add button to skip to main content
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
    ></div>
  )
}

export default SkipNav
