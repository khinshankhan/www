"use client"

import React, { useRef, useState } from "react"
import { ScrollArea, ScrollBar, ScrollViewport } from "@/components/base/scroll-area"
import { CopyButton } from "@/components/composite/copy-button"
import { useIsomorphicEffect } from "@/hooks/media"
import { cn } from "@/lib/utils"

// prettier-ignore
type PreElementProps = React.ComponentPropsWithRef<"pre">

export interface PreProps extends PreElementProps {
  showLineNumbers?: boolean
  start?: string | number
}

export function PreBlock({
  className = "",

  showLineNumbers = false,
  start = 1,
  style = {},

  ...props
}: PreProps) {
  const lineStyles = {
    ["--start"]: start,
  } as React.CSSProperties

  return (
    <pre
      className={cn("text-sm md:text-base lg:text-xl [&>code]:contents", className)}
      data-show-lines={showLineNumbers ? "true" : "false"}
      style={{
        ...lineStyles,
        ...style,
      }}
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
  const [preRefHeight, setPreRefHeight] = useState(0)

  const preRef = useRef<HTMLPreElement | null>(null)

  useIsomorphicEffect(() => {
    if (!preRef.current) return

    setPreRefHeight(preRef.current.clientHeight)
  }, [preRef.current])

  return (
    <div className="relative">
      <ScrollablePreBlock ref={preRef} className={className} allowScroll {...props} />

      <CopyButtonOverlay text={text} height={preRefHeight} />
    </div>
  )
}
