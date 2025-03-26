import React from "react"

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main id="main-content" className="relative flex grow flex-col">
      {children}
    </main>
  )
}
