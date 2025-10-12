"use client"

import React from "react"
import NextLink from "next/link"
import { LinkProvider } from "@/components/design-system/headless/link/context"
import { LinkProps } from "@/components/design-system/headless/link/types"
import { ThemeProvider } from "next-themes"

function InternalLink({ href, ...props }: LinkProps) {
  return <NextLink href={href ?? "/"} {...props} />
}

export function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <LinkProvider InternalComponent={InternalLink}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </LinkProvider>
  )
}
