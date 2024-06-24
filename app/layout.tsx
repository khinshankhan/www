import "./globals.css"

import React from "react"
import { Montserrat, Open_Sans, Source_Code_Pro } from "next/font/google"
import { cn } from "@/lib/utils"
import { BaseLayout } from "@/components/layouts/base"
import { typographyVariants } from "@/components/primitives/typography"
import { ThemeProvider, TooltipProvider } from "./providers"

const headingFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})
const bodyFont = Open_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})
const monoFont = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

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
          headingFont.variable,
          bodyFont.variable,
          monoFont.variable,
          typographyVariants({ variant: "body" }),
          "min-h-screen bg-background text-foreground antialiased"
        )}
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
