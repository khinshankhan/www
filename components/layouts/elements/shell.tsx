import React, { type ReactNode } from "react"
import { Footer } from "./footer"
import { Header } from "./header"

interface ShellProps {
  header?: ReactNode
  footer?: ReactNode
  children: ReactNode
}

export function Shell({
  header = <Header />,
  footer = <Footer position="static" />,
  children,
}: ShellProps) {
  return (
    <div className="isolate flex min-h-screen w-full grow flex-col">
      <div
        className="flex min-h-[87vh] w-full grow flex-col xs:min-h-[96vh]"
        vaul-drawer-wrapper="true"
      >
        {header}

        {children}
      </div>

      {footer}
    </div>
  )
}
