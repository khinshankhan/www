import React from "react"
import { SiteFooter } from "./footer"
import { SiteHeader, SiteHeaderProps } from "./header"

interface AppShellProps {
  siteHeaderProps?: Partial<SiteHeaderProps>
  children: React.ReactNode
}

export function AppShell({ siteHeaderProps, children }: AppShellProps) {
  return (
    <div className="isolate flex min-h-screen w-full grow flex-col">
      <div
        className="xs:min-h-[96vh] flex min-h-[87vh] w-full grow flex-col"
        vaul-drawer-wrapper="true"
      >
        <SiteHeader {...siteHeaderProps} />

        {children}
      </div>

      <SiteFooter position="static" />
    </div>
  )
}
