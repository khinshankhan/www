import React, { Fragment, type ReactNode } from "react"
import Footer from "./footer"
import Header from "./header"
import Main from "./main"
import SkipNav from "./skip-nav"

interface BaseLayoutProps {
  children: ReactNode
}

export function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <Fragment>
      <SkipNav />
      <div className="z-base relative flex min-h-[87vh] flex-col xs:min-h-[96vh]">
        <Header />
        <Main>{children}</Main>
      </div>
      <Footer />
    </Fragment>
  )
}

export default BaseLayout
