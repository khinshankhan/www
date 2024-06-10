"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { useHeadroom, useScrollDirection } from "@/hooks/scroll"
import { HomeLink } from "./links"

export function Nav() {
  const { isScrollingUp } = useScrollDirection({
    initalIsScrollingUp: true,
    upThreshold: 0,
    downThreshold: 10,
  })
  const { positionStatus } = useHeadroom({
    pinStart: 0,
  })
  const isAtZero = positionStatus === "before-start" || positionStatus === "at-start"
  const isVisible = isScrollingUp || isAtZero

  return (
    <header
      role="navigation"
      className={cn(
        "z-50 h-16 h-auto bg-background/50 transition-colors",
        !isVisible && "invisible",
        !isAtZero && "sticky top-0"
      )}
    >
      <div
        className={cn(
          "flex min-h-[68px] items-center border-b bg-background/50 pt-2 backdrop-blur-md md:min-h-[78px] lg:min-h-[88px]",
          isAtZero ? "border-transparent" : "border-foreground/10"
        )}
      >
        <nav className="page-container flex w-full flex-row items-center justify-between">
          {/* lhs on all views */}
          <HomeLink />

          {/* rhs on desktop view */}
          <div className="hide-mobile flex flex-row items-center gap-4">
            <div>desk</div>
            <div>menu</div>
          </div>

          {/* rhs on mobile view */}
          <div className="hide-desktop flex flex-col-reverse gap-2 xss:flex-row">
            <div>mobile</div>
            <div>menu</div>
          </div>
        </nav>
      </div>
    </header>
  )
}
