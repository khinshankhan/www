import React, { type ComponentProps } from "react"
import { cn } from "@/quicksilver/lib/classname"
import { CopyButton } from "./code"
import { ScrollArea, ScrollBar, ScrollViewport } from "./scroll-area"

export interface PreProps extends ComponentProps<"pre"> {
  className?: string
  textToCopy?: string
}

export function Pre({ className = "", textToCopy, ...props }: PreProps) {
  return (
    <ScrollArea className="relative w-full" type="auto">
      <ScrollViewport
        className={cn(
          "size-full rounded-md border-1 border-stark-contrast/10 bg-muted/30",
          className
        )}
      >
        {textToCopy && <CopyButton text={textToCopy} />}
        <pre className="sticky" {...props} />
      </ScrollViewport>

      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
