import React from "react"
import { ScrollArea, ScrollBar, ScrollViewport } from "@/components/primitives/scroll-area"

interface CodeblockProps {
  children?: React.ReactNode
}

export async function Codeblock({ children }: CodeblockProps) {
  return (
    <div className="group relative flex w-full items-start justify-center">
      <ScrollArea
        dir="ltr"
        type="auto"
        className="group mb-0.5 block size-full rounded-lg border border-muted-foreground bg-muted"
      >
        <ScrollViewport>{children}</ScrollViewport>
        <ScrollBar orientation="horizontal" className="mx-1 mb-0.5" />
      </ScrollArea>
    </div>
  )
}
