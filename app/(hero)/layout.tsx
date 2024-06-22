import React from "react"
import { HeroPattern } from "@/components/patterns"

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="isolate flex grow flex-col bg-background text-foreground">
      <div className="z-1 grow">{children}</div>

      <HeroPattern />
    </main>
  )
}
