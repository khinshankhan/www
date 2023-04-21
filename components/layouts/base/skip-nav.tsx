"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/router"
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

export function yieldSkipNav() {
  focusSkipNav(true)
}

export function SkipNav() {
  const router = useRouter()

  useEffect(() => {
    router.events.on("routeChangeComplete", yieldSkipNav)
    return () => {
      router.events.off("routeChangeComplete", yieldSkipNav)
    }
  }, [router.events])

  return (
    <div id="skip-nav" tabIndex={-1} className="-z-1 focus-within:z-skipLink fixed mt-6 w-full">
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
