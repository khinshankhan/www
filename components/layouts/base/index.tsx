import React, { type ReactNode } from "react"
import { typographyVariants } from "@/components/ui"
import Footer from "./footer"
import Header from "./header"
import Main from "./main"
import SkipNav from "./skip-nav"

interface BaseLayoutProps {
  children: ReactNode
}

export function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <div className={typographyVariants()}>
      <SkipNav />
      <div className="z-base relative flex min-h-[87vh] flex-col xs:min-h-[96vh]">
        <Header />
        <Main>{children}</Main>
      </div>
      <Footer />
    </div>
  )
}

export default BaseLayout
