"use client"

import React, { type ReactNode } from "react"
import NextLink from "next/link"
import { cn } from "@/quicksilver/lib/classname"
import { LinkProvider } from "@/quicksilver/react/headless/link/context"
import type { LinkProps } from "@/quicksilver/react/headless/link/types"
import { textVariants } from "@/quicksilver/react/primitives/text.variants"
import { TooltipProvider } from "@/quicksilver/react/primitives/tooltip"
import { ThemeProvider } from "next-themes"

export function BreakpointsIndicator() {
  if (process.env.NODE_ENV === "production") return null

  return (
    <div
      className={cn(
        textVariants({ variant: "xs" }),
        "fixed bottom-1 left-1 z-50 flex size-6 items-center justify-center rounded-full bg-accent-4 p-3 font-mono text-white"
      )}
    >
      <div className="block xss:hidden">0</div>
      <div className="hidden xss:block xs:hidden">xss</div>
      <div className="hidden xs:block sm:hidden">xs</div>
      <div className="hidden sm:block md:hidden">sm</div>
      <div className="hidden md:block lg:hidden">md</div>
      <div className="hidden lg:block xl:hidden">lg</div>
      <div className="hidden xl:block 2xl:hidden">xl</div>
      <div className="hidden 2xl:block">2xl</div>
    </div>
  )
}

function InternalLink({ href, ...props }: LinkProps) {
  return <NextLink href={href ?? "/"} {...props} />
}

export function RootProvider({ children }: { children: ReactNode }) {
  return (
    <LinkProvider InternalComponent={InternalLink}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <TooltipProvider>
          {children}
          <BreakpointsIndicator />
        </TooltipProvider>
      </ThemeProvider>
    </LinkProvider>
  )
}
