"use client"

import React from "react"
import { flags } from "@/settings"
import { cn } from "@/lib/utils"
import { typographyVariants } from "@/components/primitives/typography"
import { HamburgerMenu, HomeLink, NavLinks } from "./links"
import { ModeToggleDesktop, ModeToggleMobile } from "./toggles"

function Banner({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("w-full bg-secondary py-2 text-secondary-foreground", className)}>
      <p
        className={cn(
          typographyVariants({ variant: "nav" }),
          "flex items-center justify-center gap-2"
        )}
      >
        {children}
      </p>
    </div>
  )
}

export function Nav() {
  return (
    <header className="z-banner flex h-auto flex-col">
      {flags.showCeaseFireBanner && (
        <Banner className="border-b border-muted-foreground">
          <span>Ceasefire now!</span>
          <span>🕊️</span>
        </Banner>
      )}

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
