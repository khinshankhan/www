import React, { Fragment, type ReactNode } from "react"
import Footer from "./footer"
import Header from "./header"
import ScrollToTop from "./scroll-to-top"

interface BaseLayoutProps {
  // TODO: utilize isHero to create visual separators between layout
  isHero?: boolean
  children: ReactNode
}

export function BaseLayout({ isHero, children }: BaseLayoutProps) {
  return (
    <Fragment>
      <div className={"z-base xs:min-h-[96vh] relative flex min-h-[87vh] flex-col"}>
        <Header />
        {children}
      </div>
      <Footer isHero={isHero ?? false} />
      <ScrollToTop />
    </Fragment>
  )
}

export default BaseLayout
