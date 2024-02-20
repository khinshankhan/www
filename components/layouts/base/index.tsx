import React, { type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { typographyVariants } from "@/components/primitives/typography"
import { HomeToggle } from "@/components/toggles"

export function Header() {
  return (
    <header
      role="navigation"
      className="sticky top-0 z-banner flex min-h-[60px] items-center bg-red-200 md:min-h-[70px] lg:min-h-[80px]"
    >
      <nav className="page-container flex w-full flex-row items-center justify-between">
        {/* lhs on all views */}
        <HomeToggle />

        {/* rhs on desktop view */}
        <div className={cn(typographyVariants({ variant: "nav" }), "hide-mobile flex flex-row")}>
          <div>Links</div>
          <div>Settings</div>
        </div>

        {/* rhs on mobile view */}
        <div className={cn(typographyVariants({ variant: "nav" }), "hide-desktop flex flex-row")}>
          <div>menu</div>
        </div>
      </nav>
    </header>
  )
}

export const info = {
  fullname: "Khinshan Khan",
  startYear: 2017,
}

export function Footer() {
  return (
    <footer>
      <p className="text-center">
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
      <div className="relative z-0 flex min-h-[87vh] flex-col xs:min-h-[96vh]">
        <Header />
        <main className="flex grow flex-col">{children}</main>
      </div>
      <Footer />
    </>
  )
}

export default BaseLayout
