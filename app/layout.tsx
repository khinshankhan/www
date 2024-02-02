import "./globals.css"

import type { Metadata } from "next"
import { Inter, Montserrat, Source_Code_Pro } from "next/font/google"
import { cn } from "@/lib/utils"
import { BaseLayout } from "@/components/layouts/base"
import { typographyVariants } from "@/components/primitives/typography"
import { Providers } from "@/components/providers"

export const metadata: Metadata = {}

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        headingFont.variable,
        bodyFont.variable,
        monoFont.variable,
        "h-full w-full bg-primary-background text-primary-foreground"
      )}
    >
      <body
        className={cn(
          typographyVariants({ variant: "default" }),
          "flex min-h-screen w-full flex-col"
        )}
      >
        <Providers>
          <BaseLayout>{children}</BaseLayout>
        </Providers>
      </body>
    </html>
  )
}
