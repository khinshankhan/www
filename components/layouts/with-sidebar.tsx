"use client"

import React, { type ReactNode } from "react"
import { cn } from "@/quicksilver/lib/classname"
import { headerHeight } from "./elements/header"

export interface WithSidebarProps {
  direction?: "left" | "right"
  sidebar?: ReactNode
  reserveSidebarSpace?: boolean
  className?: string
  sidebarClassName?: string

  children: ReactNode
}

export const sidebarTopDisplacement = "[--h-d:0px] xl:[--h-d:56px]"
export const sidebarTop = "calc(var(--h) + var(--h-d))"

// NOTE: children should leverage the min-w-full class to ensure it fills the width of the container rather than
// allowing it to be constrained by the sidebar width
export function WithSidebar({
  direction = "right",
  sidebar,
  reserveSidebarSpace = false,
  className = "",
  sidebarClassName = "",
  children,
}: WithSidebarProps) {
  const hasSidebar = Boolean(sidebar)
  const hasSidebarSpace = reserveSidebarSpace || hasSidebar

  return (
    <div className="relative mx-auto xl:maxw-content">
      <div
        className={cn(
          hasSidebarSpace && "xl:maxw-content-with-sidebar",
          "flex w-full flex-col xl:justify-end",
          direction === "left" ? "xl:ml-auto xl:flex-row" : "xl:mr-auto xl:flex-row-reverse",
          className
        )}
        style={{ gap: hasSidebarSpace ? "var(--sidebar-gap)" : undefined }}
      >
        {hasSidebar && (
          <aside
            className={cn(
              "relative z-50 w-full pb-4 lg:self-start xl:pb-0 vh-comfy:sticky",
              headerHeight,
              sidebarTopDisplacement,
              sidebarClassName
            )}
            style={{
              minWidth: "var(--sidebar-w)",
              maxWidth: "var(--sidebar-w)",
              top: sidebarTop,
            }}
          >
            {sidebar}
          </aside>
        )}

        <div
          className={cn(
            "mx-auto flex w-full flex-col",
            hasSidebarSpace ? "maxw-content xl:min-w-full" : "maxw-content"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
