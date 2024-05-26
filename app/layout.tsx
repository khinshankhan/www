import "./globals.css"

import React from "react"
import { BaseLayout } from "@/components/layouts/base"
import { ThemeProvider } from "./providers"

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <BaseLayout>{children}</BaseLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
