"use client"

import React, { type ReactNode } from "react"
import NextLink from "next/link"
import { LinkProvider } from "@/quicksilver/react/headless/link/context"
import type { LinkProps } from "@/quicksilver/react/headless/link/types"
import { TooltipProvider } from "@/quicksilver/react/primitives/tooltip"
import { ThemeProvider } from "next-themes"

function InternalLink({ href, ...props }: LinkProps) {
  return <NextLink href={href ?? "/"} {...props} />
}

export function RootProvider({ children }: { children: ReactNode }) {
  return (
    <LinkProvider InternalComponent={InternalLink}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <TooltipProvider>{children}</TooltipProvider>
      </ThemeProvider>
    </LinkProvider>
  )
}
