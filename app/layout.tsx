import "./globals.css"

import React from "react"
import type { Metadata } from "next"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"
import { emojiLookup } from "@/lib/emoji"
import { cn } from "@/lib/utils"
import { BaseLayout } from "@/components/layouts/base"
import { typographyVariants } from "@/components/primitives/typography"
import { ThemeProvider, TooltipProvider } from "./providers"

const faviconSrc =
  process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test"
    ? "/favicon.ico?v=1"
    : emojiLookup.get(":dancer:")!.url

export const metadata: Metadata = {
  metadataBase: new URL("https://khinshankhan.com"),
  title: {
    default: "Khinshan Khan",
    template: "%s | Khinshan Khan",
  },
  description:
    "Hello! Welcome to my digital garden, where I share my thoughts and musings. You may or may not learn something, but at least it'll be fun!",
  icons: {
    shortcut: faviconSrc,
  },
  openGraph: {
    title: "Khinshan Khan",
    description:
      "Hello! Welcome to my digital garden, where I share my thoughts and musings. You may or may not learn something, but at least it'll be fun!",
    url: "https://www.khinshankhan.com",
    siteName: "Khinshan Khan",
    locale: "en-US",
    type: "website",
    images: [
      {
        url: "https://www.khinshankhan.com/og.png?v=4",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    title: "Khinshan Khan",
    card: "summary_large_image",
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="touch-manipulation scroll-auto focus-within:scroll-smooth"
    >
      <head />
      <body
        className={cn(
          GeistSans.variable,
          GeistMono.variable,
          typographyVariants({ variant: "body" }),
          "min-h-screen bg-background text-foreground antialiased"
        )}
        style={{
          // @ts-ignore: this is a css variable which is perfectly valid
          "--font-heading": "var(--font-geist-sans)",
          // @ts-ignore: this is a css variable which is perfectly valid
          "--font-body": "var(--font-geist-sans)",
          // @ts-ignore: this is a css variable which is perfectly valid
          "--font-mono": "var(--font-geist-mono)",
        }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <BaseLayout>{children}</BaseLayout>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
