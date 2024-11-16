"use client"

import React, { useRef, useState } from "react"
import { Button } from "@/components/base/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/base/collapsible"
import { ScrollArea, ScrollBar, ScrollViewport } from "@/components/base/scroll-area"
import { useIsomorphicEffect } from "@/hooks/media"
import { cn } from "@/lib/utils"

// prettier-ignore
export interface PreProps extends React.ComponentPropsWithRef<"pre"> {
}

function PreBlock({
  className = "",
  allowScroll = true,
  ...props
}: PreProps & { allowScroll?: boolean }) {
  if (!allowScroll) {
    return (
      <pre
        className={cn(
          "size-full overflow-hidden rounded-md border border-muted bg-muted/30 p-2 text-sm md:text-base lg:text-xl [&>code]:contents",
          className
        )}
        {...props}
      />
    )
  }

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

export function Pre({ className = "", ...props }: PreProps) {
  const [isCollapsible, setIsCollapsible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const preRef = useRef<HTMLPreElement | null>(null)

  useIsomorphicEffect(() => {
    if (!preRef.current) return
    console.log(preRef.current.clientHeight)
    if (preRef.current.clientHeight > 320) {
      setIsCollapsible(true)
    }
  }, [preRef.current])

  if (!isCollapsible) {
    return <PreBlock ref={preRef} className={className} allowScroll {...props} />
  }

  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
      <div className={cn("relative overflow-hidden", className)}>
        <CollapsibleContent forceMount className={cn("overflow-hidden", !isExpanded && "max-h-48")}>
          <PreBlock
            className={cn(className, isExpanded && "pb-12")}
            allowScroll={isExpanded}
            {...props}
          />
        </CollapsibleContent>

        <div
          className={cn(
            "absolute inset-x-0 bottom-0 flex items-center justify-center p-2",
            isExpanded ? "bottom-1" : "bg-gradient-to-b from-background-2/30 to-background-1/90"
          )}
        >
          <CollapsibleTrigger asChild>
            <Button variant="default" className="h-8 text-xs">
              {isExpanded ? "Collapse" : "Expand"}
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>
    </Collapsible>
  )
}
