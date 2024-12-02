"use client"

import React, { useRef, useState } from "react"
import { Button } from "@/components/base/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/base/collapsible"
import { CopyButton } from "@/components/composite/copy-button"
import { ScrollablePreBlock, type PreProps } from "@/components/composite/pre-block"
import { useIsomorphicEffect } from "@/hooks/media"
import { cn } from "@/lib/utils"

function CopyButtonOverlay({ text, height }: { text: string; height: number }) {
  return (
    <div
      className={cn(
        "absolute top-0.5 right-0.5 flex items-center justify-end",
        height > 50 && "top-2 right-2"
      )}
    >
      <CopyButton text={text} />
    </div>
  )
}

export function Pre({ text, className = "", ...props }: { text: string } & PreProps) {
  const [isCollapsible, setIsCollapsible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [preRefHeight, setPreRefHeight] = useState(0)

  const preRef = useRef<HTMLPreElement | null>(null)

  useIsomorphicEffect(() => {
    if (!preRef.current) return

    setPreRefHeight(preRef.current.clientHeight)
    if (preRef.current.clientHeight > 320) {
      setIsCollapsible(true)
    }
  }, [preRef.current])

  if (!isCollapsible) {
    return (
      <div className="relative">
        <ScrollablePreBlock ref={preRef} className={className} allowScroll {...props} />

        <CopyButtonOverlay text={text} height={preRefHeight} />
      </div>
    )
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

        <CopyButtonOverlay text={text} height={preRefHeight} />

        <div
          className={cn(
            "absolute inset-x-0 bottom-0 flex items-center justify-center p-2",
            isExpanded ? "bottom-1" : "bg-linear-to-b from-background-2/30 to-background-1/90"
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
