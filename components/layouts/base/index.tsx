import React, { Fragment, type ReactNode } from "react"

import Footer from "./footer"
import Header from "./header"
import ScrollToTop from "./scroll-to-top"

interface BaseLayoutProps {
  // TODO: utilize isHero to create visual separators between layout
  isHero?: boolean
  children: ReactNode
}

export function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <Fragment>
      <div className={"relative z-base flex min-h-[87vh] flex-col xs:min-h-[96vh]"}>
        <Header />
        {children}
      </div>
      <ScrollToTop />
      <Footer />
    </Fragment>
  )
}

export default BaseLayout
