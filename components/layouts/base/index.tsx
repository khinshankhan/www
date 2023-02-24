import React, { Fragment, type ReactNode } from "react"

import { cx } from "lib/utils"
import Footer from "./footer"
import Header from "./header"

interface BaseLayoutProps {
  isHero?: boolean
  children: ReactNode
}

export function BaseLayout({ isHero = false, children }: BaseLayoutProps) {
  return (
    <Fragment>
      <div
        className={cx(
          "relative z-base flex min-h-[87vh] flex-col xs:min-h-[96vh]",
          !isHero && "bg-theme-contentBg"
        )}
      >
        <Header />
        <div className="page-container">{children}</div>
      </div>
      <Footer />
    </Fragment>
  )
}

export default BaseLayout
