import React from "react"

export default function ContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex grow flex-col bg-background text-foreground">
      <div className="grow">{children}</div>
      <div className="bg-nav text-nav-foreground">hiya</div>
    </main>
  )
}
