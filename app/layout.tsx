import React, { type CSSProperties, type ReactNode } from "react"
import type { Metadata } from "next"
import { createMetadata } from "@/lib/seo/open-graph"
import { cn } from "@/quicksilver/lib/classname"
import { textVariants } from "@/quicksilver/react/primitives/text.variants"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"
import { RootProvider } from "./providers"

import "./globals.css"

const fontAliases = {
  ["--font-heading"]: "var(--font-geist-sans)",
  ["--font-body"]: "var(--font-geist-sans)",
  ["--font-mono"]: "var(--font-geist-mono)",
} as CSSProperties

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(GeistSans.variable, GeistMono.variable)}
      style={fontAliases}
    >
      <body
        className={cn(
          textVariants({ variant: "body" }),
          "accent-theme-default relative isolate flex flow-root min-h-screen flex-col bg-background-1 text-foreground"
        )}
      >
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  )
}

export function generateMetadata(): Metadata | undefined {
  return createMetadata({})
}
