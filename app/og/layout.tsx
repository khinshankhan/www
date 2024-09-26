import React, { type ReactNode } from "react"

export default function OgLayout({ children }: { children: ReactNode }) {
  return (
    <div className="dark">
      <div id="og" className="h-[590px] w-[1125px] bg-background text-foreground">
        {children}
      </div>
    </div>
  )
}
