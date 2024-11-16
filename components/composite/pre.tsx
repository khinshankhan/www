"use client"

import React, { useRef, useState } from "react"
import { Button } from "@/components/base/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/base/collapsible"
import { ScrollArea, ScrollBar, ScrollViewport } from "@/components/base/scroll-area"
import { useIsomorphicEffect } from "@/hooks/media"
import { cn } from "@/lib/utils"

// prettier-ignore
type PreProps = React.ComponentPropsWithRef<"pre">

function PreBlock({ className = "", ...props }: PreProps) {
  return (
    <pre
      className={cn("text-sm md:text-base lg:text-xl [&>code]:contents", className)}
      {...props}
    />
  )
}

function ScrollablePreBlock({
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

export function Pre({ className = "", ...props }: PreProps) {
  const [isCollapsible, setIsCollapsible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const preRef = useRef<HTMLPreElement | null>(null)

  useIsomorphicEffect(() => {
    if (!preRef.current) return

    if (preRef.current.clientHeight > 320) {
      setIsCollapsible(true)
    }
  }, [preRef.current])

  if (!isCollapsible) {
    return <ScrollablePreBlock ref={preRef} className={className} allowScroll {...props} />
  }

  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
      <div className={cn("relative overflow-hidden", className)}>
        <CollapsibleContent forceMount className={cn("overflow-hidden", !isExpanded && "max-h-48")}>
          <ScrollablePreBlock
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
