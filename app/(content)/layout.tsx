import React from "react"

export default function ContentLayout({ children }: { children: React.ReactNode }) {
  return <main className="flex grow flex-col bg-content text-content-foreground">{children}</main>
}
