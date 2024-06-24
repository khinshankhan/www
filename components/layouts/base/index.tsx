import React from "react"
import { info } from "@/settings"
import { Nav } from "./nav"

export function Footer() {
  return (
    <footer className="relative z-1 bg-background py-16">
      <div className="page-container flex flex-col">
        <p className="text-center">
          &copy; {info.startYear}+, {info.fullname}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div vaul-drawer-wrapper="">
      <div className="relative isolate z-0 flex min-h-[87vh] flex-col xs:min-h-[96vh]">
        <Nav />
        {/* NOTE: assumes pages will be wrapped in main tags with background color + grow */}
        <div id="page-content" className="relative flex grow flex-col">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  )
}
