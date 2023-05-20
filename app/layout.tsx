import "./globals.css"
import React, { type ReactNode } from "react"
import type { Metadata } from "next"
import { Inter, Montserrat, Source_Code_Pro } from "next/font/google"
import { cn } from "@/lib/utils"
import { BaseLayout } from "@/components/layouts/base"
import { Providers } from "./providers"

export const metadata: Metadata = {
  viewport: {
    viewportFit: "cover",
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  title: {
    default: "Khinshan Khan",
    template: "%s | Khinshan Khan",
  },
  description:
    "Hello! Welcome to my digital garden, where I share my thoughts and musings. You may or may not learn something, but at least it'll be fun!",
  icons: {
    shortcut: "/favicon.ico",
  },
}

const headingFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})
const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})
const monoFont = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full w-full" suppressHydrationWarning>
      <body
        className={cn(
          headingFont.variable,
          bodyFont.variable,
          monoFont.variable,
          "h-full w-full hyphens-auto bg-theme-primary font-body text-theme-stark"
        )}
      >
        <Providers>
          <BaseLayout>{children}</BaseLayout>
        </Providers>
      </body>
    </html>
  )
}
