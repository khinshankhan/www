import React, { useState } from "react"
import * as Collapsible from "@radix-ui/react-collapsible"
import Headroom from "react-headroom"

import { zIndex } from "lib/theme"
import { cx } from "lib/utils"
import { HomeToggle } from "components/toggles"

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

export default Header
