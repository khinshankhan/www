import React, { Fragment, type ReactNode } from "react"

import Footer from "./footer"
import Header from "./header"

interface BaseLayoutProps {
  // TODO: utilize isHero to create visual separators between layout
  isHero?: boolean
  children: ReactNode
}

export function BaseLayout({ isHero, children }: BaseLayoutProps) {
  return (
    <Fragment>
      <div className={"z-base relative flex min-h-[87vh] flex-col xs:min-h-[96vh]"}>
        <Header />
        {children}
      </div>
      <Footer isHero={isHero} />
    </Fragment>
  )
}

export default BaseLayout
