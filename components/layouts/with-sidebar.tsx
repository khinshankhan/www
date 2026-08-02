"use client"

import React, { type ReactNode } from "react"
import { headerHeight } from "@/lib/constants"
import { cn } from "@/quicksilver/lib/classname"

export interface WithSidebarProps {
  direction?: "left" | "right"
  sidebar?: ReactNode
  reserveSidebarSpace?: boolean
  className?: string
  sidebarClassName?: string

  children: ReactNode
}

export const sidebarTopDisplacement = "[--h-d:0px] xl:[--h-d:56px]"
/**
 * Only offsets once the rail is actually pinned. As an inline style this applied at every
 * height, so below `vh-comfy` -- where the aside is static and there is no sticky header to
 * clear -- it pushed the sidebar down by a header's worth of nothing.
 */
export const sidebarTop = "vh-comfy:top-[calc(var(--h)+var(--h-d))]"

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
              "relative top-0 z-50 w-full pb-4 lg:self-start xl:pb-0 vh-comfy:sticky",
              headerHeight,
              sidebarTopDisplacement,
              sidebarTop,
              sidebarClassName
            )}
            style={{
              minWidth: "var(--sidebar-w)",
              maxWidth: "var(--sidebar-w)",
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
