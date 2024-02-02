"use client"

import React from "react"
import NextLink from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { typographyVariants } from "@/components/primitives/typography"

// TODO: get back to this to style
export function NavItem({ route, name }: { route: string; name: string }) {
  const pathname = usePathname()

  return (
    <li>
      <NextLink
        href={route}
        className={cn(
          typographyVariants({ variant: "nav" }),
          "text-gray-400 hover:text-white",
          route === pathname && "text-gray-900 dark:text-white"
        )}
      >
        {name}
      </NextLink>
    </li>
  )
}
