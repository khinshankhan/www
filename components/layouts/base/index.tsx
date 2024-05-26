import React from "react"
import { ThemeToggle } from "./toggles"

function Header() {
  return (
    <header role="navigation">
      <nav>
        <div className="flex flex-row items-center">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}

export function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-screen flex-col">
      <Header />
      {/* NOTE: assumes pages will be wrapped in main tags with background color + grow */}
      {children}
      <footer>footer</footer>
    </div>
  )
}
