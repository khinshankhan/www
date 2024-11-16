import React from "react"
import { ScrollArea, ScrollBar, ScrollViewport } from "@/components/base/scroll-area"
import { cn } from "@/lib/utils"

// prettier-ignore
export interface PreProps extends React.ComponentPropsWithRef<"pre"> {
}

export function Pre({ className = "", ...props }: PreProps) {
  return (
    <ScrollArea className="w-full" type="auto">
      <ScrollViewport className="size-full rounded-md border border-muted bg-muted/30 p-2">
        <pre
          className={cn("text-sm md:text-base lg:text-xl [&>code]:contents", className)}
          {...props}
        />
      </ScrollViewport>

      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
