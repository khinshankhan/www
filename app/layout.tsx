import "./globals.css"
import React, { type ReactNode } from "react"
import type { Metadata } from "next"
import { Montserrat, Open_Sans, Source_Code_Pro } from "next/font/google"
import { cn } from "@/lib/utils"
import { ThemeProvider, TooltipProvider } from "components/providers"
import Footer from "./footer"
import Header from "./header"

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
          "font-body bg-theme text-theme-placeholder h-full w-full hyphens-auto text-lg lg:text-[1.3125rem] 2xl:text-[1.43775rem]"
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>
            <div className="z-base relative flex min-h-[96vh] flex-col">
              <Header />
              {children}
            </div>
            <Footer />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
