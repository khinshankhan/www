import React, { type ReactNode } from "react"

export default function PagesLayout({ children }: { children: ReactNode }) {
  return <div className="page-container">{children}</div>
}
