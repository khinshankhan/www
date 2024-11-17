"use client"

import React from "react"
import { cn } from "@/lib/utils"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

// prettier-ignore
type ScrollViewportProps = React.ComponentPropsWithRef<typeof ScrollAreaPrimitive.Viewport>

export function ScrollViewport({ className = "", children, ...props }: ScrollViewportProps) {
  return (
    <ScrollAreaPrimitive.Viewport
      className={cn("size-full rounded-[inherit]", className)}
      {...props}
    >
      {children}
    </ScrollAreaPrimitive.Viewport>
  )
}

// prettier-ignore
type ScrollAreaProps = React.ComponentPropsWithRef<typeof ScrollAreaPrimitive.Root>

export function ScrollArea({ className = "", children, ...props }: ScrollAreaProps) {
  return (
    <ScrollAreaPrimitive.Root className={cn("overflow-hidden", className)} {...props}>
      {children}
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

// prettier-ignore
type ScrollBarProps = React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Scrollbar>

export function ScrollBar({ className, orientation = "vertical", ...props }: ScrollBarProps) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      orientation={orientation}
      className={cn(
        "flex touch-none p-0.5 transition-colors duration-[160ms] ease-out select-none hover:bg-background-1/30",
        orientation === "vertical" && "w-2 flex-row",
        orientation === "horizontal" && "h-2 flex-col",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-accent-link/70" />
    </ScrollAreaPrimitive.Scrollbar>
  )
}
