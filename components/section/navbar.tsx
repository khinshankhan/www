"use client"

import React from "react"
import NextLink from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/base/button"
import { MonitorCog, Moon, Sun, type IconProps } from "@/components/base/icon"
import { Logo } from "@/components/base/logo"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/composite/dropdown-menu"
import { SmartLink } from "@/components/composite/smart-link"
import { capitalize, cn } from "@/lib/utils"
import { useTheme } from "next-themes"

const links = [
  { label: "About", href: "/about/" },
  { label: "Writings", href: "/writings/" },
  { label: "Projects", href: "/projects/" },
  { label: "Connect", href: "/connect/" },
]

function NavLinks({ className = "" }: { className?: string }) {
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

function ModeIcon({ theme, ...props }: { theme: string } & IconProps) {
  if (theme === "light") return <Sun {...props} />
  if (theme === "dark") return <Moon {...props} />
  return <MonitorCog {...props} />
}

function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Toggle theme">
          <ModeIcon
            theme={theme ?? "system"}
            className="size-[1.2rem]"
            role="presentation"
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="bottom" align="end">
        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          {["light", "dark", "system"].map((value) => (
            <DropdownMenuRadioItem key={value} value={value}>
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
        <NextLink href="/" className="group">
          <Logo className={cn("size-[42px] md:size-[45px] lg:size-[55px]")} />
        </NextLink>

        {/* rhs on desktop view */}
        <div className="hide-mobile flex flex-row items-center gap-4">
          <NavLinks />

          <div className="flex flex-row gap-4">
            <ModeToggle />
          </div>
        </div>

        {/* rhs on mobile view */}
        <div className="show-mobile flex flex-col-reverse gap-2 xss:flex-row">
          <ModeToggle />
        </div>
      </nav>
    </header>
  )
}
