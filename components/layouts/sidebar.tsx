import React, { type ReactNode } from "react"

import { cx } from "lib/utils"

export interface WithSidebarProps {
  direction?: "left" | "right"
  sidebar?: ReactNode
  children: ReactNode
}

export function WithSidebar({ direction = "left", sidebar, children }: WithSidebarProps) {
  return (
    <div
      className={cx(
        "page-container flex-col gap-20 xl:flex",
        direction === "left" ? "xl:flex-row xl:justify-start" : "xl:flex-row-reverse xl:justify-end"
      )}
    >
      {sidebar && <aside className="mt-6 pt-0 sm:pt-2">{sidebar}</aside>}
      <article id="article" className="mt-6 pt-0 sm:pt-2">
        {children}
      </article>
    </div>
  )
}
