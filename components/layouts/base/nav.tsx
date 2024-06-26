"use client"

import React from "react"
import { HamburgerMenu, HomeLink, NavLinks } from "./links"
import { ModeToggleDesktop, ModeToggleMobile } from "./toggles"

export function Nav() {
  return (
    <header className="z-banner flex h-auto flex-col">
      <div className="flex min-h-[68px] items-center bg-background pt-2 md:min-h-[78px] lg:min-h-[88px]">
        <nav className="page-container flex w-full flex-row items-center justify-between">
          {/* lhs on all views */}
          <HomeLink />

          {/* rhs on desktop view */}
          <div className="hide-mobile flex flex-row items-center gap-4">
            <NavLinks />
            <ModeToggleDesktop />
          </div>

          {/* rhs on mobile view */}
          <div className="hide-desktop flex flex-col-reverse gap-2 xss:flex-row">
            <ModeToggleMobile />
            <HamburgerMenu />
          </div>
        </nav>
      </div>
    </header>
  )
}
