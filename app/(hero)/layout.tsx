import React from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="isolate flex grow flex-col bg-background-1 text-foreground">
      <div className="z-1 grow">{children}</div>
    </main>
  )
}
