"use client"

import React, { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import { useRouter } from "next/router"
import * as Portal from "@radix-ui/react-portal"

import { cx } from "lib/utils"
import { useBreakpoint, useHeadroom, useMounted } from "hooks"

import { Collapsible, CollapsibleContent, CollapsibleTrigger, Link } from "components/ui"
import { HomeToggle, MenuToggle, ThemeToggle } from "components/toggles"
import ScrollToTop from "./scroll-to-top"

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
              isInternal
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

function Navbar({ open, setOpen }: { open: boolean; setOpen: Dispatch<SetStateAction<boolean>> }) {
  const isMobile = useBreakpoint("isMobile")
  const router = useRouter()

  useEffect(() => {
    if (!isMobile) {
      setOpen(() => false)
    }
  }, [isMobile, setOpen])

  const closeMenu = () => setOpen(() => false)
  useEffect(() => {
    closeMenu()

    router.events.on("routeChangeStart", closeMenu)
    return () => {
      router.events.off("routeChangeStart", closeMenu)
    }
  }, [router.events, closeMenu])

  return (
    <Collapsible className="w-full" open={open} onOpenChange={setOpen}>
      <header role="navigation" className="min-h-[55px]">
        <div className="w-full bg-theme-bg/[.85] backdrop-blur-sm">
          <nav className="page-container flex w-full flex-row items-center justify-between pt-4 pb-2.5">
            <HomeToggle />
            <Menu className="hide-mobile" />
            <div className={"hide-desktop flex flex-row"}>
              <Settings className="hide-desktop" />
              <CollapsibleTrigger asChild>
                <MenuToggle isOpen={open} />
              </CollapsibleTrigger>
            </div>
          </nav>
        </div>
        <CollapsibleContent className="motion-safe:animated-collapsible bg-theme-bg/[.85] backdrop-blur-sm">
          <Menu className="hide-desktop" />
          <div className="hide-desktop flex flex-row justify-center">
            <CollapsibleTrigger asChild>
              <MenuToggle isOpen={true} />
            </CollapsibleTrigger>
          </div>
          <div
            role="presentation"
            className="hide-desktop page-container mb-6 h-0.5 w-[70%] bg-theme-placeholder"
          />
        </CollapsibleContent>
      </header>
    </Collapsible>
  )
}

const PositionMap = {
  PINNED: "PINNED",
  UNPINNED: "UNPINNED",
  DEFAULT: "DEFAULT",
}

function Header() {
  const mounted = useMounted()

  const { position } = useHeadroom()
  const showing = position !== PositionMap.UNPINNED

  const [open, setOpen] = useState(() => false)

  if (!mounted) return null
  return (
    <>
      <div className="h-[88px] lg:h-[97.5px]">
        <div
          className={cx(
            "ease-in-out top-0 left-0 right-0 z-banner transition duration-200",
            position === PositionMap.DEFAULT ? "relative" : "fixed",
            showing || open ? "translate-y-0" : "-translate-y-full"
          )}
        >
          <Navbar open={open} setOpen={setOpen}></Navbar>
        </div>
      </div>

      <Portal.Root>
        <ScrollToTop show={position !== PositionMap.DEFAULT} />
      </Portal.Root>
    </>
  )
}

export default Header
