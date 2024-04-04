import React from "react"

export default function HeroLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <main className="grow bg-nav">{children}</main>
}
