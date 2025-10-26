"use client"

import React from "react"
import { cn } from "@/quicksilver/lib/classname"
import { ScrollArea as ScrollAreaPrimitive } from "radix-ui"

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

type ScrollAreaProps = React.ComponentPropsWithRef<typeof ScrollAreaPrimitive.Root>

export function ScrollArea({ className = "", children, ...props }: ScrollAreaProps) {
  return (
    <ScrollAreaPrimitive.Root className={cn("overflow-hidden", className)} {...props}>
      {children}
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

type ScrollBarProps = React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Scrollbar>

export function ScrollBar({ className, orientation = "vertical", ...props }: ScrollBarProps) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      orientation={orientation}
      className={cn(
        "z-2 flex touch-none p-0.5 transition-colors duration-[160ms] ease-out select-none hover:bg-background-1",
        orientation === "vertical" && "z-2 w-2 flex-row",
        orientation === "horizontal" && "h-2 flex-col",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 cursor-pointer rounded-full bg-foreground hover:bg-stark-contrast" />
    </ScrollAreaPrimitive.Scrollbar>
  )
}
