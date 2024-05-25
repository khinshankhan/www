import React from "react"

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex grow flex-col bg-nav text-nav-foreground">
      <div className="grow">{children}</div>
    </main>
  )
}
