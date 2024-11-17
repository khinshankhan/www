import React from "react"
import { ScrollArea, ScrollBar, ScrollViewport } from "@/components/base/scroll-area"
import { cn } from "@/lib/utils"

// prettier-ignore
export type PreProps = React.ComponentPropsWithRef<"pre">

export function PreBlock({ className = "", ...props }: PreProps) {
  return (
    <pre
      className={cn("text-sm md:text-base lg:text-xl [&>code]:contents", className)}
      {...props}
    />
  )
}

export function ScrollablePreBlock({
  className = "",
  allowScroll = true,
  ...props
}: PreProps & { allowScroll?: boolean }) {
  const wrapperClasses = cn("size-full rounded-md border border-muted bg-muted/30 p-2", className)

  if (!allowScroll) {
    return <PreBlock className={wrapperClasses} {...props} />
  }

  return (
    <ScrollArea className="w-full" type="auto">
      <ScrollViewport className={wrapperClasses}>
        <PreBlock {...props} />
      </ScrollViewport>

      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
