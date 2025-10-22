"use client"

import React, { useMemo, useState } from "react"
import NextLink from "next/link"
import { usePathname } from "next/navigation"
import { useMounted } from "@/hooks/core/use-mounted"
import { cn } from "@/quicksilver/lib/classname"
import { ScrollBgCrossfade } from "@/quicksilver/react/patterns/motion/scroll-bg-crossfade"
import { ScrollFadeIn } from "@/quicksilver/react/patterns/motion/scroll-fade-in"
import { Button } from "@/quicksilver/react/primitives/button"
import { buttonVariants } from "@/quicksilver/react/primitives/button.variants"
import { Divider } from "@/quicksilver/react/primitives/divider"
import { EdgeFade, type EdgeFadeProps } from "@/quicksilver/react/primitives/edge-fade"
import {
  Close,
  HamburgerMenu,
  Moon,
  ScreenShareOff,
  Sun,
  SunMoon,
  type IconProps,
} from "@/quicksilver/react/primitives/icons"
import { Link, ResolvedLinkComponent } from "@/quicksilver/react/primitives/link"
import { textVariants } from "@/quicksilver/react/primitives/text.variants"
import { navLinks } from "@/settings"
import { useTheme } from "next-themes"
import { Drawer } from "vaul-base"
import { FooterParagraph } from "./footer"
import { Logo } from "./logo"

type Theme = "light" | "system" | "dark"

function getNextTheme(current: string | undefined): Theme {
  const currentTheme = current ?? "system"

  switch (currentTheme) {
    case "dark":
      return "light"
    case "light":
      return "system"
    case "system":
      return "dark"
    default:
      // NOTE: fallback to assuming current theme is system
      return "dark"
  }
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
        <li key={link.href} className={textVariants({ variant: "nav" })}>
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
    <Drawer.Root shouldScaleBackground={false} open={isOpen} onOpenChange={setIsOpen}>
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
          className="fixed inset-x-0 bottom-0 h-[72vh] w-full rounded-t-2xl border border-surface-7/60 bg-background-1"
        >
          <Drawer.Handle className="top-3" />

          <nav
            className="mx-auto flex h-full max-w-sm flex-col gap-1 px-4 py-6"
            style={{
              paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))",
            }}
          >
            <header className="mb-8">
              <p
                className={cn(
                  textVariants({ variant: "xs", weight: "medium" }),
                  "text-muted-foreground mb-6 tracking-[0.16em] uppercase"
                )}
              >
                Navigation
              </p>
              <Divider />
            </header>

            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const active = pathname === link.href
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      render={(props, { kind }) => {
                        // NOTE: we purposefully override the Link component's className here to match the design
                        return (
                          <ResolvedLinkComponent
                            kind={kind}
                            {...props}
                            className={cn(
                              buttonVariants({ variant: "ghost" }),
                              textVariants({ variant: "nav" }),
                              "group flex w-full flex-row items-center justify-between"
                            )}
                            onClick={() => setIsOpen(false)}
                          >
                            <span>{link.label}</span>
                            <span
                              className="text-muted-foreground ml-3 transition group-hover:-rotate-90"
                              aria-hidden="true"
                            >
                              &rarr;
                            </span>
                          </ResolvedLinkComponent>
                        )
                      }}
                    />
                  </li>
                )
              })}
            </ul>

            <div className="mt-auto">
              <Divider intensity="solid" thickness="light" className="mb-6" />

              <FooterParagraph />
            </div>
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
      suppressHydrationWarning
    >
      <ModeIcon theme={theme} role="presentation" aria-hidden="true" />

      {/* fallback in case theme isn't working (likely because javascript is disabled)  */}
      <ScreenShareOff
        className="hidden size-[1.2rem] noscript:block"
        role="presentation"
        aria-hidden="true"
      />
    </Button>
  )
}

type HeaderBufferProps = Partial<EdgeFadeProps>

export function HeaderEdgeFade({ className = "", ...props }: HeaderBufferProps) {
  return (
    <EdgeFade
      direction="bottom"
      className={cn("absolute -bottom-16 z-2 h-16", className)}
      {...props}
    />
  )
}

export const headerHeight = "[--h:68px] md:[--h:78px] lg:[--h:88px]"

export interface HeaderProps {
  edgeFadeProps?: Partial<EdgeFadeProps>
}
export function Header({ edgeFadeProps }: HeaderProps) {
  return (
    <ScrollBgCrossfade
      fromColor="var(--color-background-1)"
      toColor="var(--color-background-2)"
      rangePx={900}
      className={cn(
        "sticky top-0 z-2 flex h-(--h) w-full flex-col items-center justify-center",
        headerHeight
      )}
    >
      <header className="align-center flex w-full justify-center">
        <div className="w-full maxw-page">
          <nav className="align-center flex flex-row items-center justify-between">
            {/* lhs on all views */}
            <NextLink aria-label="Navigate to homepage." href="/" className="group">
              <Logo className={cn("size-[42px] md:size-[45px] lg:size-[52px]")} />
            </NextLink>

            {/* rhs on desktop view */}
            <div className="max-md:hide-print flex hide-mobile flex-row items-center gap-3">
              <div className="flex flex-row items-center gap-4">
                <NavLinksDesktop />
              </div>

              <div className="flex flex-row gap-4">
                <ModeToggle />
              </div>
            </div>

            {/* rhs on mobile view */}
            <div className="md:hide-print flex show-mobile flex-col-reverse gap-2 xss:flex-row">
              <ModeToggle />
              <NavLinksMobile />
            </div>
          </nav>
        </div>

        {/* just a really cool line effect */}
        <ScrollFadeIn rangePx={200}>
          <Divider className="absolute bottom-0 left-1/2 z-2 maxw-page -translate-x-1/2 transform" />
        </ScrollFadeIn>
      </header>

      {/* acts as buffer to gradually introduce actual header's overlay onto content */}
      <HeaderEdgeFade {...edgeFadeProps} />
    </ScrollBgCrossfade>
  )
}
