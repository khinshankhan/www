import React, { type ReactNode } from "react"
import { RevealFooter } from "./footer"
import { Header } from "./header"

interface ShellProps {
  header?: ReactNode
  footer?: ReactNode
  /**
   * Repo-relative path of the page's own source. The footer sits outside the layout that
   * knows about the page, so this rides along on the shell rather than the layout below it.
   */
  ghPath?: string
  children: ReactNode
}

export function Shell({ header = <Header />, footer, ghPath, children }: ShellProps) {
  return (
    <div className="isolate flex min-h-screen w-full grow flex-col">
      <div className="flex min-h-[87vh] w-full grow flex-col xs:min-h-[96vh]">
        {header}

        {children}
      </div>

      {footer === undefined ? <RevealFooter ghPath={ghPath} /> : footer}
    </div>
  )
}
