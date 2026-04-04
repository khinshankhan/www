"use client"

import React from "react"
import { cn } from "@/quicksilver/lib/classname"
import { ScrollArea as HeadlessScrollArea } from "@base-ui/react/scroll-area"

type ScrollViewportProps = React.ComponentPropsWithRef<typeof HeadlessScrollArea.Viewport>

export function ScrollViewport({ className = "", children, ...props }: ScrollViewportProps) {
  return (
    <HeadlessScrollArea.Viewport
      className={cn("size-full rounded-[inherit]", className)}
      {...props}
    >
      <HeadlessScrollArea.Content>{children}</HeadlessScrollArea.Content>
    </HeadlessScrollArea.Viewport>
  )
}

type ScrollAreaProps = React.ComponentPropsWithRef<typeof HeadlessScrollArea.Root> & {
  type?: "auto" | "always" | "scroll" | "hover"
}

export function ScrollArea({ className = "", children, type, ...props }: ScrollAreaProps) {
  void type

  return (
    <HeadlessScrollArea.Root className={cn("overflow-hidden", className)} {...props}>
      {children}
      <HeadlessScrollArea.Corner />
    </HeadlessScrollArea.Root>
  )
}

type ScrollBarProps = React.ComponentPropsWithoutRef<typeof HeadlessScrollArea.Scrollbar>

export function ScrollBar({ className, orientation = "vertical", ...props }: ScrollBarProps) {
  return (
    <HeadlessScrollArea.Scrollbar
      orientation={orientation}
      className={cn(
        "pointer-events-none z-2 flex touch-none rounded-full bg-transparent p-0.5 transition-colors duration-[160ms] ease-out select-none data-[hovering]:bg-accent-a3/25 data-[scrolling]:bg-accent-a3/25",
        orientation === "vertical" && "z-2 w-2 flex-row",
        orientation === "horizontal" && "h-2 flex-col",
        className
      )}
      {...props}
    >
      <HeadlessScrollArea.Thumb className="pointer-events-auto relative flex-1 cursor-pointer rounded-full bg-accent-11 shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--color-accent-12)_20%,transparent)] transition-colors duration-[160ms] ease-out hover:bg-accent-8/80 focus-visible:bg-accent-8/80" />
    </HeadlessScrollArea.Scrollbar>
  )
}
