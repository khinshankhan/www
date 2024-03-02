import "./globals.css"

import type { Metadata } from "next"
import { Montserrat, Nunito, Source_Code_Pro } from "next/font/google"
import { cn } from "@/lib/utils"
import { BreakpointsIndicator } from "@/components/indicators"
import { BaseLayout } from "@/components/layouts"
import { typographyVariants } from "@/components/primitives/typography"
import { ThemeProvider } from "./providers"

export const metadata: Metadata = {
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
const bodyFont = Nunito({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})
const monoFont = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          headingFont.variable,
          bodyFont.variable,
          monoFont.variable,
          typographyVariants({ variant: "default" }),
          "flex flex-col"
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <BaseLayout>{children}</BaseLayout>
        </ThemeProvider>
        <BreakpointsIndicator />
      </body>
    </html>
  )
}
