import React, { type ReactNode } from "react"
import { StarGridPattern } from "@/components/base/patterns"

export function HeroLayout({ slug, children }: { slug: string; children: ReactNode }) {
  const seed = slug.split("").reduce((acc, curr) => acc + curr.charCodeAt(0), 0)

  return (
    <main
      id="page-content"
      className="bg-background relative isolate flex grow flex-col overflow-hidden text-foreground"
    >
      <div className="z-1 grow">{children}</div>

      <StarGridPattern
        seed={seed}
        className="absolute inset-0 mask-gradient-reveal-center"
        contrast
        dense
      />
    </main>
  )
}
