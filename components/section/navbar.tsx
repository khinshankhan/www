"use client"

import React from "react"
import NextLink from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/base/button"
import {
  Circle,
  Close,
  HamburgerMenu,
  MonitorCog,
  Moon,
  ScreenShareOff,
  Slash,
  Sun,
  type IconProps,
} from "@/components/base/icon"
import { Logo } from "@/components/base/logo"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/composite/dropdown-menu"
import { SmartLink } from "@/components/composite/smart-link"
import { useMounted } from "@/hooks/media"
import { capitalize, cn } from "@/lib/utils"
import { useTheme } from "next-themes"

const links = [
  { label: "About", href: "/about/" },
  { label: "Writings", href: "/writings/" },
  { label: "Projects", href: "/projects/" },
  { label: "Connect", href: "/connect/" },
]

function NavLinksDesktop({ className = "" }: { className?: string }) {
  const pathname = usePathname()

  return (
    <ul className={cn("flex flex-col gap-4 md:flex-row", className)}>
      {links.map((link) => (
        <li key={link.href}>
          <SmartLink href={link.href} variant="nav" data-active={pathname === link.href}>
            {link.label}
          </SmartLink>
        </li>
      ))}
    </ul>
  )
}

function NavLinksMobile() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <DropdownMenu modal={false} open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          className="relative"
        >
          {isOpen ? (
            <Close className="size-[1.2rem]" role="presentation" aria-hidden="true" />
          ) : (
            <HamburgerMenu className="size-[1.2rem]" role="presentation" aria-hidden="true" />
          )}

          <Slash className="show-no-js absolute hidden" role="presentation" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="bottom" align="end">
        <DropdownMenuRadioGroup value={pathname}>
          {links.map((link) => (
            <DropdownMenuRadioItem
              key={link.href}
              value={link.href}
              Indicator={() => (
                <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                  <Circle className={cn("h-2 w-2", pathname === link.href && "fill-current")} />
                </span>
              )}
              asChild
            >
              <NextLink
                aria-label={`Navigate to ${link.label.toLowerCase()} page`}
                href={link.href}
              >
                {link.label}
              </NextLink>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

interface ModeIconProps extends IconProps {
  ignoreMount?: boolean
  theme: string | undefined
}
function ModeIcon({ theme, ignoreMount = false, ...props }: ModeIconProps) {
  // TODO: circle back for disabled javascript
  const mounted = useMounted()
  if (!ignoreMount && !mounted) {
    return null
  }

  if (theme === "light") {
    return <Sun {...props} />
  }
  if (theme === "dark") {
    return <Moon {...props} />
  }

  return <MonitorCog {...props} />
}

function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Toggle theme">
          <ModeIcon
            theme={theme}
            className="size-[1.2rem]"
            role="presentation"
            aria-hidden="true"
          />

          {/* fallback in case theme isn't working (likely because javascript is disabled)  */}
          <ScreenShareOff
            className="show-no-js hidden size-[1.2rem]"
            role="presentation"
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="bottom" align="end">
        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          {["light", "dark", "system"].map((value) => (
            <DropdownMenuRadioItem
              key={value}
              aria-label={`Toggle ${value} mode`}
              value={value}
              Indicator={() => (
                <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                  <Circle className={cn("h-2 w-2", theme === value && "fill-current")} />
                </span>
              )}
            >
              <span className="flex w-full flex-row items-center justify-between">
                <span>{capitalize(value)}</span>

                <ModeIcon
                  theme={value}
                  className="size-[1.2rem]"
                  role="presentation"
                  aria-hidden="true"
                />
              </span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function Navbar() {
  return (
    <header className="bounded-page-layout flex min-h-[68px] items-center pt-2 md:min-h-[78px] lg:min-h-[88px]">
      <nav className="flex w-full flex-row items-center justify-between">
        {/* lhs on all views */}
        <NextLink aria-label="Navigate to homepage." href="/" className="group">
          <Logo className={cn("size-[42px] md:size-[45px] lg:size-[55px]")} />
        </NextLink>

        {/* rhs on desktop view */}
        <div className="hide-mobile flex flex-row items-center gap-4">
          <NavLinksDesktop />

          <div className="flex flex-row gap-4">
            <ModeToggle />
          </div>
        </div>

        {/* rhs on mobile view */}
        <div className="show-mobile flex flex-col-reverse gap-2 xss:flex-row">
          <ModeToggle />
          <NavLinksMobile />
        </div>
      </nav>
    </header>
  )
}
