"use client"

import React from "react"
import { siteHeaderHeight } from "@/components/layout/site-header"
import { cn } from "@/lib/utils"

export interface WithSidebarProps {
  direction?: "left" | "right"
  sidebar?: React.ReactNode
  className?: string
  sidebarClassName?: string

  children: React.ReactNode
}

// NOTE: children should leverage the min-w-full class to ensure it fills the width of the container rather than
// allowing it to be constrained by the sidebar width
export function WithSidebar({
  direction = "right",
  sidebar,
  className = "",
  sidebarClassName = "",
  children,
}: WithSidebarProps) {
  return (
    <div
      className={cn(
        sidebar && "maxw-content-with-sidebar",
        "flex w-full flex-col xl:justify-end",
        direction === "left" ? "xl:ml-auto xl:flex-row" : "xl:mr-auto xl:flex-row-reverse",
        className
      )}
      style={{ gap: sidebar ? "var(--sidebar-gap)" : undefined }}
    >
      {sidebar && (
        <aside
          className={cn(
            "top-(--h) sticky z-50 w-full xl:self-start",
            sidebarClassName,
            siteHeaderHeight
          )}
          style={{
            minWidth: "var(--sidebar-w)",
            maxWidth: "var(--sidebar-w)",
            top: "calc(var(--h) + 56px)",
          }}
        >
          {sidebar}
        </aside>
      )}

      {children}
    </div>
  )
}
