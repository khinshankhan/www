"use client"

import React, { type ComponentProps } from "react"
import { cn } from "@/quicksilver/lib/classname"
import { textVariants } from "@/quicksilver/react/primitives/text.variants"
import { Tabs as HeadlessTabs } from "@base-ui/react/tabs"
import {
  tabsIndicatorVariants,
  tabsListVariants,
  tabsTabVariants,
  type TabsVariantProps,
} from "./tabs.variants"

export function TabsRoot({ className = "", ...props }: ComponentProps<typeof HeadlessTabs.Root>) {
  return (
    <HeadlessTabs.Root
      data-elem="tabs"
      className={cn("overflow-hidden rounded-md border border-muted bg-background-1", className)}
      {...props}
    />
  )
}

export interface TabsListProps
  extends ComponentProps<typeof HeadlessTabs.List>, Pick<TabsVariantProps, "variant"> {}

export function TabsList({ className = "", variant = "default", ...props }: TabsListProps) {
  return <HeadlessTabs.List className={cn(tabsListVariants({ variant }), className)} {...props} />
}

export interface TabsTabProps
  extends ComponentProps<typeof HeadlessTabs.Tab>, Pick<TabsVariantProps, "variant"> {}

export function TabsTab({ className = "", variant = "default", ...props }: TabsTabProps) {
  return (
    <HeadlessTabs.Tab
      className={cn(textVariants({ variant: "small" }), tabsTabVariants({ variant }), className)}
      {...props}
    />
  )
}

export interface TabsIndicatorProps
  extends ComponentProps<typeof HeadlessTabs.Indicator>, Pick<TabsVariantProps, "variant"> {}

export function TabsIndicator({
  className = "",
  variant = "default",
  ...props
}: TabsIndicatorProps) {
  return (
    <HeadlessTabs.Indicator
      className={cn(tabsIndicatorVariants({ variant }), className)}
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
