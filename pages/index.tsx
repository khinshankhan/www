import React, { Fragment, useState, type ReactNode } from "react"
import * as Collapsible from "@radix-ui/react-collapsible"
import Headroom from "react-headroom"

import { zIndex } from "lib/theme"
import { cx, narray } from "lib/utils"
import { HomeToggle, ThemeToggle } from "components/toggles"

function Menu({ className = "" }: { className?: string }) {
  return (
    <menu
      className={cx(
        "flex flex-col items-center justify-center isDesktop:flex-row isDesktop:items-end isDesktop:justify-between",
        className
      )}
    >
      <div>one</div>
      <div>two</div>
    </menu>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <Collapsible.Root className="w-full" open={open} onOpenChange={setOpen}>
      <header role="navigation" className="nav-bg main-nav min-h-[55px]">
        <nav className="flex w-full flex-row items-center justify-between pt-4 pb-2.5">
          <HomeToggle />
          <Menu className="hide-mobile" />
          <Collapsible.Trigger asChild>
            <button className="hide-desktop inline-flex h-[25px] w-[25px] items-center justify-center rounded-full">
              {open ? "x" : "+"}
            </button>
          </Collapsible.Trigger>
        </nav>
        <Collapsible.Content className="animated-collapsible">
          <Menu className="hide-desktop" />
        </Collapsible.Content>
      </header>
    </Collapsible.Root>
  )
}

function Header() {
  return (
    <Headroom
      style={{
        zIndex: zIndex.banner,
      }}
    >
      <Navbar />
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
