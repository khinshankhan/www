import React from "react"
import { ThemeToggle } from "./toggles"

function Header() {
  return (
    <header role="navigation">
      <div className="bg-nav flex min-h-[68px] items-center pt-2 md:min-h-[78px] lg:min-h-[88px]">
        <nav className="page-container flex w-full flex-row items-center justify-between">
          {/* lhs on all views */}
          <div>home</div>

          {/* rhs on desktop view */}
          <div className="hide-mobile flex flex-row items-center gap-4">
            <div>desk</div>
            <div>menu</div>
          </div>

          {/* rhs on mobile view */}
          <div className="hide-desktop flex flex-col-reverse gap-2 xss:flex-row">
            <div>mobile</div>
            <div>menu</div>
          </div>
        </nav>
      </div>
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
