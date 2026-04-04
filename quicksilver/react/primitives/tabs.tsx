"use client"

import { createContext, type ComponentProps, useContext } from "react"
import { cn } from "@/quicksilver/lib/classname"
import { textVariants } from "@/quicksilver/react/primitives/text.variants"
import { Tabs as HeadlessTabs } from "@base-ui/react/tabs"
import {
  tabsIndicatorVariants,
  tabsListVariants,
  tabsTabVariants,
  type TabsVariantProps,
} from "./tabs.variants"

const TabsVariantContext = createContext<NonNullable<TabsVariantProps["variant"]>>("default")

export interface TabsRootProps
  extends ComponentProps<typeof HeadlessTabs.Root>,
    Pick<TabsVariantProps, "variant"> {}

export function TabsRoot({
  className = "",
  variant = "default",
  ...props
}: TabsRootProps) {
  const resolvedVariant = variant ?? "default"

  return (
    <TabsVariantContext.Provider value={resolvedVariant}>
      <HeadlessTabs.Root
        data-elem="tabs"
        className={cn(
          "overflow-hidden rounded-md",
          resolvedVariant === "default" && "border border-muted bg-background-1",
          className
        )}
        {...props}
      />
    </TabsVariantContext.Provider>
  )
}

export interface TabsListProps
  extends ComponentProps<typeof HeadlessTabs.List>, Pick<TabsVariantProps, "variant"> {}

export function TabsList({ className = "", variant, ...props }: TabsListProps) {
  const inheritedVariant = useContext(TabsVariantContext)
  const resolvedVariant = variant ?? inheritedVariant

  return (
    <HeadlessTabs.List
      className={cn(tabsListVariants({ variant: resolvedVariant }), className)}
      {...props}
    />
  )
}

export interface TabsTabProps
  extends ComponentProps<typeof HeadlessTabs.Tab>, Pick<TabsVariantProps, "variant"> {}

export function TabsTab({ className = "", variant, ...props }: TabsTabProps) {
  const inheritedVariant = useContext(TabsVariantContext)
  const resolvedVariant = variant ?? inheritedVariant

  return (
    <HeadlessTabs.Tab
      className={cn(
        textVariants({ variant: "small" }),
        tabsTabVariants({ variant: resolvedVariant }),
        className
      )}
      {...props}
    />
  )
}

export interface TabsIndicatorProps
  extends ComponentProps<typeof HeadlessTabs.Indicator>, Pick<TabsVariantProps, "variant"> {}

export function TabsIndicator({
  className = "",
  variant,
  ...props
}: TabsIndicatorProps) {
  const inheritedVariant = useContext(TabsVariantContext)
  const resolvedVariant = variant ?? inheritedVariant

  return (
    <HeadlessTabs.Indicator
      className={cn(tabsIndicatorVariants({ variant: resolvedVariant }), className)}
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
