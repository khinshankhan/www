"use client"

import React, { Children, isValidElement, type ReactNode } from "react"
import Slugger from "github-slugger"
import { cn } from "@/quicksilver/lib/classname"
import { TabsIndicator, TabsList, TabsPanel, TabsRoot, TabsTab } from "./tabs"

const slugger = new Slugger()

export interface TabbifyProps {
  labels: string[]
  defaultIndex?: number
  children: ReactNode
  className?: string
  listClassName?: string
  panelClassName?: string
  ariaLabel?: string
}

export interface TabbifyPanelProps {
  children: ReactNode
  className?: string
}

export function TabbifyPanel({ children, className = "" }: TabbifyPanelProps) {
  return (
    <div className={cn("prose block px-4 py-4 md:px-5 md:py-5 **:last:mb-0", className)}>
      {children}
    </div>
  )
}

export function Tabbify({
  labels,
  defaultIndex = 0,
  children,
  className = "",
  listClassName = "",
  panelClassName = "",
  ariaLabel = "Tabbed content",
}: TabbifyProps) {
  const panels = Children.toArray(children).filter((child) => {
    if (typeof child === "string") {
      return child.trim().length > 0
    }

    if (typeof child === "number") {
      return true
    }

    return isValidElement(child)
  })

  if (labels.length === 0 || panels.length === 0) {
    throw new Error("Tabbify requires at least one label and one child")
  }

  if (labels.length !== panels.length) {
    throw new Error("Tabbify requires labels and children to have the same length")
  }

  slugger.reset()
  const items = labels.map((label) => ({
    label,
    value: slugger.slug(label),
  }))

  const defaultItem = items[defaultIndex] ?? items[0]

  if (!defaultItem) {
    throw new Error("Tabbify could not determine a default tab")
  }

  return (
    <TabsRoot defaultValue={defaultItem.value} className={className}>
      <TabsList aria-label={ariaLabel} className={listClassName}>
        {items.map((item) => (
          <TabsTab key={item.value} value={item.value}>
            {item.label}
          </TabsTab>
        ))}
        <TabsIndicator />
      </TabsList>

      {items.map((item, index) => (
        <TabsPanel
          key={item.value}
          value={item.value}
          className={cn("block h-auto bg-background-1 p-0", panelClassName)}
        >
          {panels[index]}
        </TabsPanel>
      ))}
    </TabsRoot>
  )
}
