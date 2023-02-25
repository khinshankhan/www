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
        initial={{ marginTop: "150vh" }}
        animate={{ marginTop: 0 }}
        exit={{ marginTop: "150vh" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <h1 style={{ paddingBottom: "24px" }}>{title}</h1>
        <p className="main-nav">{subtitle}</p>
      </m.header>

      <div className="bg-theme-contentBg py-5">
        <div className="page-container">
          <article id="article" className="mt-6 pt-0 sm:pt-2">
            {children}
          </article>
        </div>
      </div>
    </main>
  )
}

export default PageSkeletonLayout
