import React, { type ReactNode } from "react"
import { HeroPattern } from "@/components/base/patterns"

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <main className="bg-background isolate flex grow flex-col text-foreground">
      <div className="z-1 grow">{children}</div>

      <HeroPattern />
    </main>
  )
}
