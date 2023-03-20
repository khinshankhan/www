import React, { type ReactNode } from "react"

import { WithSidebar, type WithSidebarProps } from "./sidebar"

export interface PageSkeletonLayoutProps extends WithSidebarProps {
  title: string
  subtitle: string | ReactNode
  children: ReactNode
}

export function PageSkeletonLayout({
  title,
  subtitle,
  direction,
  sidebar,
  children,
}: PageSkeletonLayoutProps) {
  // TODO: add flex grow to article when wrapping it with sidebar
  // move page container up to sidebar when implemented

  // the flex grow applies to the base layout's min-h flex div. this keeps any negative space between content to footer
  // (within the min-h) the content bg color, accounting for potentially shorter content
  return (
    <main className="flex grow flex-col">
      <header className="bg-theme-bg py-14 text-center">
        <h1 className="pb-6">{title}</h1>
        <p className="main-nav">{subtitle}</p>
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
