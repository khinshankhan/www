import React, { Fragment, type ReactNode } from "react"

import Footer from "./footer"
import Header from "./header"

export function BaseLayout({ children }: { children: ReactNode }) {
  return (
    <Fragment>
      <div className="relative z-base flex min-h-[87vh] flex-col bg-theme-contentBg xs:min-h-[96vh]">
        <Header />
        <div className="page-container">{children}</div>
      </div>
      <Footer />
    </Fragment>
  )
}

export default BaseLayout
