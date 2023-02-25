import React, { type ReactNode } from "react"
import { m } from "framer-motion"

interface PageSkeletonLayoutProps {
  title: string
  subtitle: string | ReactNode
  children: ReactNode
}

export function PageSkeletonLayout({ title, subtitle, children }: PageSkeletonLayoutProps) {
  // TODO: add flex grow to article when wrapping it with sidebar
  // move page container up to sidebar when implemented
  return (
    <main>
      <m.header
        className="bg-theme-bg py-14 text-center"
        layout
        key="page-info-header"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.25, ease: "easeInOut" }}
        exit={{ opacity: 0, transition: { duration: 0 } }}
      >
        <h1 className="pb-6">{title}</h1>
        <p className="main-nav">{subtitle}</p>
      </m.header>

      <m.div
        className="bg-theme-contentBg py-5"
        layout
        key="page-content"
        initial={{ marginTop: "150vh" }}
        animate={{ marginTop: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        exit={{ marginTop: "150vh", transition: { delay: 0, duration: 0.5 } }}
      >
        <div className="page-container">
          <article id="article" className="mt-6 pt-0 sm:pt-2">
            {children}
          </article>
        </div>
      </m.div>
    </main>
  )
}

export default PageSkeletonLayout
