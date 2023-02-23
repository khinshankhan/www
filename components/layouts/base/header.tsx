import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import * as Collapsible from "@radix-ui/react-collapsible"
import { useBreakpoint } from "hooks"
import Headroom from "react-headroom"

import { zIndex } from "lib/theme"
import { cx } from "lib/utils"
import { HomeToggle, MenuToggle, ThemeToggle } from "components/toggles"

// TODO: move this out to config
const links = [
  { title: "About", to: "/about" },
  { title: "Writings", to: "/writings" },
  { title: "Projects", to: "/projects" },
  { title: "Contact", to: "/contact" },
]
function Links() {
  const { pathname, query, isReady } = useRouter()
  const link = isReady ? (query as { slug: string[] }).slug ?? pathname : pathname
  const onLink = Array.isArray(link) ? `/${link.join("/")}` : link

  return (
    <ul className="flex flex-col isDesktop:flex-row">
      {links.map(({ title, to }) => {
        return (
          <li key={to} className="m-4 inline-block text-center">
            <Link
              className={cx("main-nav", onLink === to && "on")}
              href={to}
              aria-label={`Navigate to ${title}.`}
            >
              {title}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

const settings = [
  { id: 0, node: <ThemeToggle className="mx-0 my-4 px-0 py-[3px] lg:py-[7.75px]" /> },
  // { id: 1, node: "hello" },
  // for testing multiple icons
  // { id: 1, node: <ThemeToggle /> },
]
function Settings({ className = "" }: { className?: string }) {
  return (
    <ul className={cx("flex flex-row items-center isDesktop:mr-4 isDesktop:items-end", className)}>
      {settings.map(({ id, node }) => {
        return (
          <li key={id} className="mx-1 my-0 inline-block text-center">
            {node}
          </li>
        )
      })}
    </ul>
  )
}

function Menu({ className = "" }: { className?: string }) {
  return (
    <menu
      className={cx(
        "flex flex-col items-center justify-center isDesktop:flex-row isDesktop:items-end isDesktop:justify-between",
        className
      )}
    >
      <Links />
      <Settings className="hide-mobile" />
    </menu>
  )
}

function Navbar({ showing }: { showing: boolean }) {
  const [open, setOpen] = useState(false)
  const isMobile = useBreakpoint("isMobile")

  useEffect(() => {
    if (!showing || !isMobile) {
      setOpen(false)
    }
  }, [showing, isMobile])

  return (
    <Collapsible.Root className="w-full" open={open} onOpenChange={setOpen}>
      <header role="navigation" className="nav-bg min-h-[55px]">
        <nav className="flex w-full flex-row items-center justify-between pt-4 pb-2.5">
          <HomeToggle />
          <Menu className="hide-mobile" />
          <div className={"hide-desktop flex flex-row"}>
            <Settings className="hide-desktop" />
            <Collapsible.Trigger asChild>
              <MenuToggle isOpen={open} />
            </Collapsible.Trigger>
          </div>
        </nav>
        <Collapsible.Content className="animated-collapsible">
          <Menu className="hide-desktop" />
        </Collapsible.Content>
      </header>
    </Collapsible.Root>
  )
}

const PosMap = {
  PINNED: "PINNED",
  UNPINNED: "UNPINNED",
  DEFAULT: "DEFAULT",
}

function Header() {
  const [pos, setPos] = useState(PosMap.DEFAULT)
  const showing = pos !== PosMap.UNPINNED

  return (
    <>
      <Headroom
        style={{
          zIndex: zIndex.banner,
        }}
        onPin={() => setPos(PosMap.PINNED)}
        onUnpin={() => setPos(PosMap.UNPINNED)}
        onUnfix={() => setPos(PosMap.DEFAULT)}
      >
        <Navbar showing={showing} />
      </Headroom>
    </>
  )
}

export default Header
