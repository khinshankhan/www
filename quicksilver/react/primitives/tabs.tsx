"use client"

import { createContext, useContext, type ComponentProps } from "react"
import { cn } from "@/quicksilver/lib/classname"
import { textVariants } from "@/quicksilver/react/primitives/text.variants"
import { Tabs as HeadlessTabs } from "@base-ui/react/tabs"
import {
  tabsIndicatorVariants,
  tabsListVariants,
  tabsPanelVariants,
  tabsRootVariants,
  tabsTabVariants,
  type TabsVariantProps,
} from "./tabs.variants"

const TabsVariantContext = createContext<NonNullable<TabsVariantProps["variant"]>>("default")

export interface TabsRootProps extends ComponentProps<typeof HeadlessTabs.Root> {
  variant?: NonNullable<TabsVariantProps["variant"]>
}

export function TabsRoot({ className, variant = "default", ...props }: TabsRootProps) {
  return (
    <TabsVariantContext.Provider value={variant}>
      <HeadlessTabs.Root className={cn(tabsRootVariants({ variant }), className)} {...props} />
    </TabsVariantContext.Provider>
  )
}

export interface TabsListProps
  extends ComponentProps<typeof HeadlessTabs.List>, Pick<TabsVariantProps, "variant"> {}

export function TabsList({ className, variant, ...props }: TabsListProps) {
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

export function TabsTab({ className, variant, ...props }: TabsTabProps) {
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

export function TabsIndicator({ className, variant, ...props }: TabsIndicatorProps) {
  const inheritedVariant = useContext(TabsVariantContext)
  const resolvedVariant = variant ?? inheritedVariant

  return (
    <HeadlessTabs.Indicator
      className={cn(tabsIndicatorVariants({ variant: resolvedVariant }), className)}
      {...props}
    />
  )
}

export function TabsPanel({ className, ...props }: ComponentProps<typeof HeadlessTabs.Panel>) {
  return <HeadlessTabs.Panel className={cn(tabsPanelVariants(), className)} {...props} />
}

export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Tab: TabsTab,
  Indicator: TabsIndicator,
  Panel: TabsPanel,
}
