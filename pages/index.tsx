import React, { Fragment, type ReactNode } from "react"

import { ThemeToggle } from "components/toggles"

function Header() {
  return <div>header</div>
}

function Footer() {
  return <div>footer</div>
}

function Layout({ children }: { children: ReactNode }) {
  return (
    <Fragment>
      <div className="relative z-base flex min-h-[87vh] flex-col xs:min-h-[96vh]">
        <Header />
        {children}
      </div>
      <Footer />
    </Fragment>
  )
}

export default function Page() {
  return (
    <Layout>
      <div>
        <p className="text-sky-400">hello there and lorem ipsum</p>
        <ThemeToggle />
      </div>
    </Layout>
  )
}
