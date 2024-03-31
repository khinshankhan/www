import React, { type ReactNode } from "react"
import { flags, info } from "@/config"
import { cn } from "@/lib/utils"
import { typographyVariants } from "@/components/primitives/typography"
import { HamburgerMenu, HomeLink, NavLinks } from "./links"
import { ModeToggleDesktop, ModeToggleMobile } from "./toggles"

export function Header() {
  return (
    <header role="navigation" className="z-banner flex flex-col">
      {flags.banner && (
        <div className="w-full bg-danger-border py-4">
          <p
            className={cn(
              typographyVariants({ variant: "nav" }),
              "flex items-center justify-center gap-2"
            )}
          >
            <span>Ceasefire now!</span>
            <span>🕊️</span>
          </p>
        </div>
      )}

      <div className="flex min-h-[68px] items-center bg-nav pt-2 md:min-h-[78px] lg:min-h-[88px]">
        <nav className="page-container flex w-full flex-row items-center justify-between">
          {/* lhs on all views */}
          <HomeLink />

          {/* rhs on desktop view */}
          <div
            className={cn(
              typographyVariants({ variant: "nav" }),
              "hide-mobile flex flex-row items-center gap-4"
            )}
          >
            <NavLinks />
            <ModeToggleDesktop />
          </div>

          {/* rhs on mobile view */}
          <div
            className={cn(
              typographyVariants({ variant: "nav" }),
              "hide-desktop flex flex-col-reverse gap-2 xss:flex-row"
            )}
          >
            <ModeToggleMobile />
            <HamburgerMenu />
          </div>
        </nav>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer>
      <p className="bg-nav pb-28 pt-16 text-center">
        &copy; {info.startYear}+, {info.fullname}. All rights reserved.
      </p>
    </footer>
  )
}

interface BaseLayoutProps {
  children: ReactNode
}

export function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <>
      <div
        vaul-drawer-wrapper=""
        className="relative z-0 flex min-h-[87vh] flex-col xs:min-h-[96vh]"
      >
        <Header />
        <main className="flex grow flex-col">{children}</main>
      </div>
      <Footer />
    </>
  )
}

export default BaseLayout
