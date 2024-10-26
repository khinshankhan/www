import React from "react"

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <main className="flex grow flex-col bg-background-2">{children}</main>
}
