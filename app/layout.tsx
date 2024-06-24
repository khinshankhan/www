import "./globals.css"

import React from "react"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"
import { cn } from "@/lib/utils"
import { BaseLayout } from "@/components/layouts/base"
import { typographyVariants } from "@/components/primitives/typography"
import { ThemeProvider, TooltipProvider } from "./providers"

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
