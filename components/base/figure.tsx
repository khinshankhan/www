import React from "react"

export function Figcaption({ children }: { children: React.ReactNode }) {
  return (
    <figcaption className="mt-4 text-balance text-center text-muted-foreground">
      {children}
    </figcaption>
  )
}
