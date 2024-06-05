"use client"

import React from "react"

export function Nav() {
  return (
    <header
      role="navigation"
      className="sticky top-0 z-50 h-16 border-b border-foreground/10 bg-background/50 backdrop-blur-md transition-colors"
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
