import React from "react"
import { Divider } from "@/components/primitives/divider"
import { Nav } from "./nav"

export function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div
        className="relative z-0 flex min-h-[87vh] flex-col xs:min-h-[96vh]"
        vaul-drawer-wrapper=""
      >
        <Nav />
        {/* NOTE: assumes pages will be wrapped in main tags with background color + grow */}
        {children}
      </div>
      <Divider width="w-full md:w-[80%]" />
      <footer className="page-container py-16">footer</footer>
    </div>
  )
}
