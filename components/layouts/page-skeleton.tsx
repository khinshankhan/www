import React, { type ReactNode } from "react"
import { m, useReducedMotion } from "framer-motion"

import { WithSidebar, type WithSidebarProps } from "./sidebar"

interface PageSkeletonLayoutProps extends WithSidebarProps {
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
  const shouldReduceMotion = useReducedMotion()
  // TODO: add flex grow to article when wrapping it with sidebar
  // move page container up to sidebar when implemented

  // the flex grow applies to the base layout's min-h flex div. this keeps any negative space between content to footer
  // (within the min-h) the content bg color, accounting for potentially shorter content
  return (
    <main className="flex grow flex-col">
      <m.header
        className="bg-theme-bg py-14 text-center"
        layout
        key="page-info-header"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: shouldReduceMotion ? 0 : 1.25, ease: "easeInOut" }}
        exit={{ opacity: 0, transition: { duration: 0 } }}
      >
        <h1 className="pb-6">{title}</h1>
        <p className="main-nav">{subtitle}</p>
      </m.header>

      <m.div
        className="grow bg-theme-contentBg py-5"
        layout
        key="page-content"
        initial={{ marginTop: "150vh" }}
        animate={{ marginTop: 0 }}
        transition={{ delay: shouldReduceMotion ? 0 : 0.3, duration: shouldReduceMotion ? 0 : 1 }}
        exit={{ marginTop: "150vh", transition: { delay: 0, duration: 0.5 } }}
      >
        <WithSidebar direction={direction} sidebar={sidebar}>
          {children}
        </WithSidebar>
      </m.div>
    </main>
  )
}

export default PageSkeletonLayout
