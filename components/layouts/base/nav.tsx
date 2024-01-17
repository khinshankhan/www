"use client"

import React from "react"
import NextLink from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

// TODO: get back to this to style
export function NavItem({ route, name }: { route: string; name: string }) {
  const pathname = usePathname()

  return (
    <li>
      <NextLink
        href={route}
        className={cn(
          route === pathname && "underline decoration-zinc-700 decoration-4 underline-offset-4"
        )}
      >
        {name}
      </NextLink>
    </li>
  )
}
