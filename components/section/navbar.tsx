"use client"

import React from "react"
import NextLink from "next/link"
import { usePathname } from "next/navigation"
import { Logo } from "@/components/base/logo"
import { SmartLink } from "@/components/composite/smart-link"
import { cn } from "@/lib/utils"

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
        </div>
      </nav>
    </header>
  )
}
