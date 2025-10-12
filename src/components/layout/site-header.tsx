"use client"

import React, { useMemo, useState } from "react"
import NextLink from "next/link"
import { usePathname } from "next/navigation"
import {
  ScrollReveal,
  ScrollRevealBackground,
} from "@/components/design-system/patterns/view-observers/scroll-reveal"
import { Button } from "@/components/design-system/primitives/button"
import { Divider } from "@/components/design-system/primitives/divider"
import { EdgeFade } from "@/components/design-system/primitives/edge-fade"
import {
  Close,
  HamburgerMenu,
  IconProps,
  Moon,
  ScreenShareOff,
  Sun,
  SunMoon,
} from "@/components/design-system/primitives/icon"
import { Link } from "@/components/design-system/primitives/link"
import { H2 } from "@/components/design-system/primitives/text"
import { typographyVariants } from "@/components/design-system/primitives/typography"
import { Logo } from "@/components/layout/logo"
import { useMounted } from "@/hooks/core/useMounted"
import { cn } from "@/lib/utils"
import { navLinks } from "@/settings"
import { useTheme } from "next-themes"
import { Drawer } from "vaul-base"

const THEMES = ["light", "system", "dark"]

function getNextTheme(curr: string | undefined, themes = THEMES): string {
  const currIndex = themes.indexOf(curr || "system")

  let nextIndex = currIndex + 1
  if (nextIndex < 0) {
    return themes[themes.length - 1]
  }
  if (nextIndex >= themes.length) {
    return themes[0]
  }
  return themes[nextIndex]
}

interface ModeIconProps extends IconProps {
  ignoreMount?: boolean
  theme: string | undefined
}
function ModeIcon({ theme, ignoreMount = false, className = "", ...props }: ModeIconProps) {
  const mounted = useMounted()
  if (!ignoreMount && !mounted) {
    return null
  }

  if (theme === "light") {
    return <Sun className={cn("size-[1rem]", className)} {...props} />
  }
  if (theme === "dark") {
    return <Moon className={cn("size-[1rem]", className)} {...props} />
  }

  // NOTE: using 1.25 rem instead of 1 rem since the icon is loaded with both sun and moon which makes it appear smaller
  return <SunMoon className={cn("size-[1.25rem]", className)} {...props} />
}

function NavLinksDesktop({ className = "" }: { className?: string }) {
  const pathname = usePathname()

  return (
    <ul className={cn("flex flex-col gap-4 md:flex-row", className)}>
      {navLinks.map((link) => (
        <li key={link.href} className={typographyVariants({ variant: "nav" })}>
          <Link href={link.href} variant="nav" data-active={pathname === link.href}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

function NavLinksMobile() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Drawer.Root shouldScaleBackground open={isOpen} onOpenChange={setIsOpen}>
      <Drawer.Trigger
        render={(triggerProps, { open }) => (
          <Button
            variant="ghost"
            size="icon-sm"
            className="relative"
            aria-label={open ? "Close menu" : "Open menu"}
            title={open ? "Close menu" : "Open menu"}
            {...triggerProps}
          >
            {open ? (
              <Close className="size-[1.25rem]" aria-hidden="true" />
            ) : (
              <HamburgerMenu className="size-[1.25rem]" aria-hidden="true" />
            )}
          </Button>
        )}
      />

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/60" />
        <Drawer.Content
          aria-label="Main menu"
          className="border-border/60 bg-background-1 fixed inset-x-0 bottom-0 h-[70vh] w-full rounded-t-2xl border backdrop-blur"
        >
          <Drawer.Handle className="top-3" />

          <nav className="mx-auto flex h-full max-w-sm flex-col gap-1 px-4 py-6">
            <H2 className="text-muted-foreground mb-2 uppercase tracking-wide">Navigation</H2>

            <ul className="flex flex-col">
              {navLinks.map((link) => {
                return (
                  <li key={link.href} className={typographyVariants({ variant: "nav" })}>
                    <Link
                      href={link.href}
                      variant="nav"
                      data-active={pathname === link.href}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* optional footer space or extras later */}
            <div className="text-muted-foreground mt-auto pt-4 text-xs">Press Esc to close</div>
          </nav>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const nextTheme = useMemo(() => getNextTheme(theme), [theme])

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      className="relative"
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
      onClick={() => {
        setTheme(nextTheme)
      }}
    >
      <ModeIcon theme={theme} role="presentation" aria-hidden="true" />

      {/* fallback in case theme isn't working (likely because javascript is disabled)  */}
      <ScreenShareOff
        className="noscript:block hidden size-[1.2rem]"
        role="presentation"
        aria-hidden="true"
      />
    </Button>
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
            <div className="hide-mobile max-md:hide-print flex flex-row items-center gap-3">
              <div className="flex flex-row items-center gap-4">
                <NavLinksDesktop />
              </div>

              <div className="flex flex-row gap-4">
                <ModeToggle />
              </div>
            </div>

            {/* rhs on mobile view */}
            <div className="show-mobile xss:flex-row md:hide-print flex flex-col-reverse gap-2">
              <ModeToggle />
              <NavLinksMobile />
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
