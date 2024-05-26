import React from "react"

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex grow flex-col bg-background text-foreground">
      <div className="grow">{children}</div>
    </main>
  )
}
