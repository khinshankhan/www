import React from "react"
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
      <body className="min-h-screen bg-background text-foreground antialiased">
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
