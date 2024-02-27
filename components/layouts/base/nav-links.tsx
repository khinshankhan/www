"use client"

import React from "react"
import { usePathname } from "next/navigation"
import { headerLinks } from "@/config"
import { cn } from "@/lib/utils"
import { Link } from "@/components/primitives/link"
import { typographyVariants } from "@/components/primitives/typography"

export function NavLinks({ className = "" }: { className?: string }) {
  const pathname = usePathname()

  return (
    <ul
      className={cn(
        typographyVariants({ variant: "nav" }),
        "flex flex-col gap-4 md:flex-row",
        className
      )}
    >
      {headerLinks.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={typographyVariants({ variant: pathname === link.href ? "link-on" : "link" })}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}
