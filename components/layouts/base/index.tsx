import React from "react"
import { Nav } from "./nav"

export function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div vaul-drawer-wrapper="">
      <div className="relative isolate z-0 flex min-h-[87vh] flex-col xs:min-h-[96vh]">
        <Nav />
        {/* NOTE: assumes pages will be wrapped in main tags with background color + grow */}
        {children}
      </div>
      <footer className="bg-background py-16">
        <div className="page-container">footer</div>
      </footer>
    </div>
  )
}
