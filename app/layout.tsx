import "./globals.css"
import React, { type ReactNode } from "react"
import type { Metadata } from "next"
import { Montserrat, Open_Sans, Source_Code_Pro } from "next/font/google"
import { cn } from "@/lib/utils"
import { ThemeProvider, TooltipProvider } from "components/providers"

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
  icons: {
    shortcut: "/logo.svg",
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full w-full">
      <body
        className={cn(
          headingFont.variable,
          bodyFont.variable,
          monoFont.variable,
          "font-body h-full w-full bg-green-200 dark:bg-green-600"
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
