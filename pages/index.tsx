import React, { Fragment, useState, type ReactNode } from "react"
import * as Collapsible from "@radix-ui/react-collapsible"
import Headroom from "react-headroom"

import { narray } from "lib/utils"
import { ThemeToggle } from "components/toggles"

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <Collapsible.Root className="w-[300px]" open={open} onOpenChange={setOpen}>
      <div className="flex flex-row">
        <span>Hello there</span>

        <Collapsible.Trigger asChild>
          <button className="inline-flex h-[25px] w-[25px] items-center justify-center rounded-full">
            {open ? "x" : "+"}
          </button>
        </Collapsible.Trigger>
      </div>
      <Collapsible.Content className="animated-collapsible">Hi there</Collapsible.Content>
    </Collapsible.Root>
  )
}

function Header() {
  return (
    <Headroom
      style={{
        zIndex: 1200, // banner z index
      }}
    >
      <div className="nav-bg main-nav">
        <Navbar />
      </div>
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
        <h3>
          <a className="anchor" href="https://google.com">
            Anchored Link
          </a>
        </h3>
        This is a link <a href="https://google.com">Google link</a> and it goes to google.
        {narray(100).map((v) => {
          return (
            <p key={v}>
              Hello there, this is some random gibberish. It is not meant to have any meaning, it
              sounds like gibberish because it is gibberish.
            </p>
          )
        })}
      </div>
    </Layout>
  )
}
