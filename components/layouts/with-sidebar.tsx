"use client"

import React, { type ReactNode } from "react"
import { cn } from "@/quicksilver/lib/classname"
import { headerHeight } from "./elements/header"

export interface WithSidebarProps {
  direction?: "left" | "right"
  sidebar?: ReactNode
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
            "sticky z-50 w-full pb-4 lg:self-start xl:pb-0",
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

      {children}
    </div>
  )
}
