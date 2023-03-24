import React, { type ReactNode } from "react"

import { WithSidebar, type WithSidebarProps } from "./sidebar"

export interface PageSkeletonLayoutProps extends WithSidebarProps {
  title: string
  subtitle: ReactNode
  children: ReactNode
}

export function PageSkeletonLayout({
  title,
  subtitle,
  direction,
  sidebar,
  children,
}: PageSkeletonLayoutProps) {
  // the flex grow applies to the base layout's min-h flex div. this keeps any negative space between content to footer
  // (within the min-h) the content bg color, accounting for potentially shorter content
  return (
    <main className="flex grow flex-col">
      <header className="bg-theme-bg py-14 text-center">
        <h1 className="pb-6">{title}</h1>
        <span className="main-nav">{subtitle}</span>
      </header>

      <div className="grow bg-theme-contentBg py-5">
        <WithSidebar direction={direction} sidebar={sidebar}>
          {children}
        </WithSidebar>
      </div>
    </main>
  )
}

export default PageSkeletonLayout
