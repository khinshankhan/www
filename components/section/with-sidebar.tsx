import React from "react"
import { cn } from "@/lib/utils"

export interface WithSidebarProps {
  direction?: "left" | "right"
  sidebar?: React.ReactNode
  className?: string

  children: React.ReactNode
}

// NOTE: children should leverage the min-w-full class to ensure it fills the width of the container rather than
// allowing it to be constrained by the sidebar width
export function WithSidebar({
  direction = "right",
  sidebar,
  className = "",
  children,
}: WithSidebarProps) {
  return (
    <div
      className={cn(
        sidebar && "bounded-with-sidebar-layout",
        "flex w-full flex-col xl:justify-end xl:gap-16",
        direction === "left" ? "xl:ml-auto xl:flex-row" : "xl:mr-auto xl:flex-row-reverse",
        className
      )}
    >
      {sidebar && (
        <aside className="z-50 w-full xl:sticky xl:top-4 xl:max-w-[250px] xl:min-w-[250px] xl:self-start 2xl:max-w-[275px] 2xl:min-w-[275px]">
          {sidebar}
        </aside>
      )}

      {children}
    </div>
  )
}
