"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { useHeadroom, useScrollDirection } from "@/hooks/scroll"

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

  return (
    <header
      role="navigation"
      className={cn(
        "z-50 h-16 border-b bg-background/50 backdrop-blur-md transition-colors",
        isAtZero ? "border-transparent" : "sticky top-0 border-foreground/10",
        !isScrollingUp && !isAtZero && "invisible"
      )}
    >
      <div className="bg-nav flex min-h-[68px] items-center pt-2 md:min-h-[78px] lg:min-h-[88px]">
        <nav className="page-container flex w-full flex-row items-center justify-between">
          {/* lhs on all views */}
          <div>home</div>

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
