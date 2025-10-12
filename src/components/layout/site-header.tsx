import React from "react"
import NextLink from "next/link"
import { usePathname } from "next/navigation"
import {
  ScrollReveal,
  ScrollRevealBackground,
} from "@/components/design-system/patterns/view-observers/scroll-reveal"
import { Divider } from "@/components/design-system/primitives/divider"
import { EdgeFade } from "@/components/design-system/primitives/edge-fade"
import { Link } from "@/components/design-system/primitives/link"
import { Logo } from "@/components/layout/logo"
import { cn } from "@/lib/utils"
import { navLinks } from "@/settings"

function NavLinksDesktop({ className = "" }: { className?: string }) {
  const pathname = usePathname()

  return (
    <ul className={cn("flex flex-col gap-4 md:flex-row", className)}>
      {navLinks.map((link) => (
        <li key={link.href}>
          <Link href={link.href} variant="nav" data-active={pathname === link.href}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export const siteHeaderHeight = "[--h:68px] md:[--h:78px] lg:[--h:88px]"

export function SiteHeader() {
  return (
    <ScrollRevealBackground
      fromColor="var(--color-background-1)"
      toColor="var(--color-background-2)"
      rangePx={900}
      className={cn(
        "z-2 h-(--h) sticky top-0 flex w-full flex-col items-center justify-center",
        siteHeaderHeight
      )}
    >
      <header className="align-center flex w-full justify-center">
        <div className="maxw-page w-full">
          <nav className="align-center flex flex-row items-center justify-between">
            {/* lhs on all views */}
            <NextLink aria-label="Navigate to homepage." href="/" className="group">
              <Logo className={cn("size-[42px] md:size-[45px] lg:size-[52px]")} />
            </NextLink>

            {/* rhs on desktop view */}
            <div className="hide-mobile max-md:hide-print flex flex-row items-center gap-4">
              <NavLinksDesktop />
            </div>
          </nav>
        </div>

        {/* just a really cool line effect */}
        <ScrollReveal rangePx={200}>
          <Divider className="z-2 maxw-page absolute bottom-0 left-1/2 -translate-x-1/2 transform" />
        </ScrollReveal>
      </header>

      {/* acts as buffer to gradually introduce actual header's overlay onto content */}
      <EdgeFade direction="bottom" className="z-2 absolute -bottom-16 h-16" />
    </ScrollRevealBackground>
  )
}
