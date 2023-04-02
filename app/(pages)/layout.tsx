import React, { type ReactNode } from "react"

export default function PageLayout({ children }: { children: ReactNode }) {
  return <main className="bg-theme-contentBg flex grow flex-col">{children}</main>
}
