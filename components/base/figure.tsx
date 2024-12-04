import React from "react"

export function Figcaption({ children }: { children: React.ReactNode }) {
  return (
    <figcaption className="mt-4 text-center text-balance text-muted-foreground">
      {children}
    </figcaption>
  )
}
