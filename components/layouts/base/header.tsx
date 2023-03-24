"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"

import { cx } from "lib/utils"
import { HeadroomPositions, useBreakpoint, useHeadroom } from "hooks"

import { Collapsible, CollapsibleContent, CollapsibleTrigger, Link } from "components/ui"
import { HomeToggle, MenuToggle, ThemeToggle } from "components/toggles"

// TODO: move this out to config
const links = [
  { title: "About", to: "/about" },
  { title: "Writings", to: "/writings" },
  { title: "Projects", to: "/projects" },
  { title: "Contact", to: "/contact" },
]
function Menu({ className = "" }: { className?: string }) {
  const { pathname, query, isReady } = useRouter()
  const link = isReady ? (query as { slug: string[] }).slug ?? pathname : pathname
  const onLink = Array.isArray(link) ? `/${link.join("/")}` : link

  return (
    <menu className={cx("flex flex-col md:flex-row", className)}>
      <ul className="flex flex-col md:flex-row">
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
    </menu>
  )
}

const settings = [
  // 4 - 1.5 since the buttons have a padding of 1.5
  { id: 0, node: <ThemeToggle className="mt-2.5 mb-2.5 inline align-top" /> },
  // { id: 1, node: <ThemeToggle className="mt-2.5 mb-2.5 inline align-top" /> },
]
function Settings({ className = "" }: { className?: string }) {
  return (
    <ul className={cx("flex flex-row space-x-1", className)}>
      {settings.map(({ id, node }) => {
        return (
          <li key={id} className={cx("inline-block text-center")}>
            <span>{node}</span>
          </li>
        )
      })}
    </ul>
  )
}

function Navbar({ position }: { position: keyof typeof HeadroomPositions }) {
  const showing = position !== HeadroomPositions.UNPINNED

  const isMobile = useBreakpoint("isMobile")
  const router = useRouter()

  const [open, setOpen] = useState(() => false)

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
  }, [router.events])

  return (
    <div className="h-[88px] lg:h-[97.5px]">
      <div
        className={cx(
          "ease-in-out top-0 left-0 right-0 z-banner transition duration-200",
          position === HeadroomPositions.DEFAULT ? "relative" : "fixed",
          showing || open ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <Collapsible className="w-full" open={open} onOpenChange={setOpen}>
          <header role="navigation" className="min-h-[55px]">
            <div className="w-full bg-theme-bg/[.85] backdrop-blur-sm">
              <nav className="page-container flex w-full flex-row items-center justify-between pt-4 pb-2.5">
                {/* lhs on desktop view */}
                <HomeToggle />

                {/* rhs on desktop view */}
                <div className="hide-mobile main-nav flex flex-row">
                  <Menu />
                  <Settings />
                </div>

                {/* rhs on mobile view */}
                <div className="hide-desktop main-nav flex flex-row">
                  <CollapsibleTrigger asChild>
                    <MenuToggle isOpen={open} className="m-2.5 inline-block text-center" />
                  </CollapsibleTrigger>
                </div>
              </nav>
            </div>

            {/* mobile dropdown content */}
            <CollapsibleContent className="motion-safe:animated-collapsible hide-desktop bg-theme-bg/[.85] backdrop-blur-sm">
              <Menu />
              <Settings className="justify-center" />

              {/* playing around the idea of users being able to easily close menu by keyboard? */}
              <div className="hide-desktop flex flex-row justify-center">
                <CollapsibleTrigger asChild>
                  <MenuToggle isOpen={true} />
                </CollapsibleTrigger>
              </div>

              <div
                role="presentation"
                className="hide-desktop page-container mt-4 mb-6 h-0.5 w-[70%] bg-theme-placeholder"
              />
            </CollapsibleContent>
          </header>
        </Collapsible>
      </div>
    </div>
  )
}

function Header() {
  const { position } = useHeadroom()

  return <Navbar position={position} />
}

export default Header
