import React from "react"
import type { Metadata } from "next"
import { TooltipProvider } from "@/components/base/tooltip"
import { typographyVariants } from "@/components/base/typography"
import { Navbar } from "@/components/section/navbar"
import { createMetadata } from "@/lib/seo"
import { cn } from "@/lib/utils"
import { info } from "@/settings"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"
import { BreakpointsIndicator, ThemeProvider } from "./providers"

import "./globals.css"

const fontAliases = {
  ["--font-heading"]: "var(--font-geist-sans)",
  ["--font-body"]: "var(--font-geist-sans)",
  ["--font-mono"]: "var(--font-geist-mono)",
} as React.CSSProperties

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(GeistSans.variable, GeistMono.variable)}
      style={fontAliases}
    >
      <head></head>
      <body
        className={cn(
          typographyVariants({ variant: "body" }),
          "font-body relative min-h-screen bg-background-1 text-foreground antialiased"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <div role="presentation" className="noise" />

            <div
              className={
                // z-1 ensures content is above the noise background
                "z-1"
              }
            >
              <div className="relative isolate z-0 flex min-h-[87vh] flex-col xs:min-h-[96vh]">
                <Navbar />
                {/* NOTE: assumes pages will be wrapped in main tags with background color + grow */}
                <div className="relative flex grow flex-col">{children}</div>
              </div>

              <div className="relative isolate z-0 flex flex-col">
                <footer className="bounded-page-layout h-40 py-8">
                  <p
                    className="text-center text-balance"
                    dangerouslySetInnerHTML={{
                      __html: `&copy; ${info.startYear}+, ${info.fullname}. All rights reserved.`,
                    }}
                  />
                </footer>
              </div>
            </div>
            <BreakpointsIndicator />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export async function generateMetadata(): Promise<Metadata | undefined> {
  return createMetadata({})
}
