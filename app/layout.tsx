import "./globals.css"
import type { Metadata } from "next"
import { BaseLayout } from "@/components/layouts/base"
import { Providers } from "@/components/providers"

export const metadata: Metadata = {}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-full w-full bg-primary-background text-primary-foreground"
    >
      <body className="flex min-h-screen w-full flex-col">
        <Providers>
          <BaseLayout>{children}</BaseLayout>
        </Providers>
      </body>
    </html>
  )
}
