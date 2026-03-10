"use client"

import React, { type ComponentProps } from "react"
import { cn } from "@/quicksilver/lib/classname"
import { textVariants } from "@/quicksilver/react/primitives/text.variants"
import { Tabs as HeadlessTabs } from "@base-ui-components/react/tabs"

export function TabsRoot({ className = "", ...props }: ComponentProps<typeof HeadlessTabs.Root>) {
  return (
    <HeadlessTabs.Root
      data-elem="tabs"
      className={cn("overflow-hidden rounded-md border border-muted bg-background-1", className)}
      {...props}
    />
  )
}

export function TabsList({ className = "", ...props }: ComponentProps<typeof HeadlessTabs.List>) {
  return (
    <HeadlessTabs.List
      className={cn("relative z-0 flex gap-1 border-b border-surface-4 px-1 py-0.5", className)}
      {...props}
    />
  )
}

export function TabsTab({ className = "", ...props }: ComponentProps<typeof HeadlessTabs.Tab>) {
  return (
    <HeadlessTabs.Tab
      className={cn(
        textVariants({ variant: "small" }),
        "flex h-8 items-center justify-center border-0 px-2 font-medium break-keep whitespace-nowrap text-foreground-muted hover:text-foreground data-[selected]:text-foreground-strong",
        "cursor-pointer outline-none select-none before:inset-x-0 before:inset-y-1 before:rounded-sm before:-outline-offset-1 before:outline-stark-contrast focus-visible:relative focus-visible:before:absolute focus-visible:before:outline focus-visible:before:outline-1",
        className
      )}
      {...props}
    />
  )
}

export function TabsIndicator({
  className = "",
  ...props
}: ComponentProps<typeof HeadlessTabs.Indicator>) {
  return (
    <HeadlessTabs.Indicator
      className={cn(
        "absolute top-1/2 left-0 -z-1 h-6 w-[var(--active-tab-width)] translate-x-[var(--active-tab-left)] -translate-y-1/2 rounded-sm bg-stark-contrast/10 transition-all duration-200 ease-in-out",
        className
      )}
      {...props}
    />
  )
}

export function TabsPanel({ className = "", ...props }: ComponentProps<typeof HeadlessTabs.Panel>) {
  return (
    <HeadlessTabs.Panel
      className={cn(
        "relative flex h-32 items-center justify-center bg-background-2",
        "-outline-offset-1 outline-stark-contrast focus-visible:rounded-md focus-visible:rounded-t-none focus-visible:outline focus-visible:outline-1",
        className
      )}
      {...props}
    />
  )
}

export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Tab: TabsTab,
  Indicator: TabsIndicator,
  Panel: TabsPanel,
}
