import React from "react"
import { typographyVariants } from "@/components/base/typography"
import { cn } from "@/lib/utils"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"
import { ThemeProvider } from "next-themes"

import "./globals.css"

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="touch-manipulation scroll-auto focus-within:scroll-smooth"
      suppressHydrationWarning
    >
      <head></head>
      <body
        className={cn(
          GeistSans.variable,
          GeistMono.variable,
          typographyVariants({ variant: "p" }),
          "min-h-screen bg-background-1 font-body text-foreground antialiased"
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
