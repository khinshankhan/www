import React, { Fragment, type ReactNode } from "react"
import Headroom from "react-headroom"

import { narray } from "lib/utils"
import { ThemeToggle } from "components/toggles"

function Header() {
  return (
    <Headroom
      style={{
        zIndex: 1200, // banner z index
      }}
    >
      <div className="nav-bg">header</div>
    </Headroom>
  )
}

function Footer() {
  return <div>footer</div>
}

function Layout({ children }: { children: ReactNode }) {
  return (
    <Fragment>
      <div className="relative z-base flex min-h-[87vh] flex-col xs:min-h-[96vh]">
        <Header />
        <div className="bg-theme-contentBg">{children}</div>
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

        {narray(100).map((v) => {
          return (
            <p key={v}>
              Hello there, this is some random gibberish. It's not meant to have any meaning, it
              sounds like gibberish because it is gibberish.
            </p>
          )
        })}
      </div>
    </Layout>
  )
}
