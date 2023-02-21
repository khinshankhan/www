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
      <div className="nav-bg main-nav">header</div>
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

        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>
        <p className="main-nav">main nav</p>
        <p>paragraph</p>

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
