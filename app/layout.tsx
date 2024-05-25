import "./globals.css"

import React from "react"

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="min-h-screen bg-nav font-sans text-nav-foreground antialiased">
        <div className="relative flex h-screen flex-col">
          <nav>navbar</nav>
          {/* NOTE: assumes pages will be wrapped in main tags with background color + grow */}
          {children}
          <footer>footer</footer>
        </div>
      </body>
    </html>
  )
}
