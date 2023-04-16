"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { cn } from "@/lib/utils"
import { useBreakpoint } from "@/hooks"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Link,
  typographyVariants,
} from "@/components/ui"
import { HomeToggle, MenuToggle, ThemeToggle } from "@/components/toggles"

// TODO: move this out to config
const links = [
  { title: "About", to: "/about" },
  { title: "Writings", to: "/writings" },
  { title: "Projects", to: "/projects" },
  { title: "Contact", to: "/contact" },
]
function Menu({ className = "" }: { className?: string }) {
  const { asPath } = useRouter()
  const mainNavClasses = typographyVariants({ variant: "main-nav" })

  return (
    <menu className={cn("flex flex-col md:flex-row", className)}>
      <ul className="flex flex-col md:flex-row">
        {links.map(({ title, to }) => {
          return (
            <li key={to} className="m-4 inline-block text-center">
              <Link
                className={mainNavClasses}
                href={to}
                variant={asPath === to ? "link-on" : "link"}
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
  { id: 0, node: <ThemeToggle className="mb-2.5 mt-2.5 inline align-top" /> },
  // { id: 1, node: <ThemeToggle className="mt-2.5 mb-2.5 inline align-top" /> },
]
function Settings({ className = "" }: { className?: string }) {
  return (
    <ul className={cn("flex flex-row space-x-1", className)}>
      {settings.map(({ id, node }) => {
        return (
          <li key={id} className={cn("inline-block text-center")}>
            <span>{node}</span>
          </li>
        )
      })}
    </ul>
  )
}

function Navbar() {
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
        className={cn(
          "z-banner relative left-0 right-0 top-0 translate-y-0 transition duration-200 ease-in-out"
          // position !== HeadroomPositions.DEFAULT && "fixed",
          // !showing && !open && "-translate-y-full"
        )}
      >
        <Collapsible className="w-full" open={open} onOpenChange={setOpen}>
          <header role="navigation" className="min-h-[55px]">
            <div className="bg-theme-bg/[.85] w-full backdrop-blur-sm">
              <nav className="page-container flex w-full flex-row items-center justify-between pb-2.5 pt-4">
                {/* lhs on desktop view */}
                <HomeToggle />

                {/* rhs on desktop view */}
                <div
                  className={typographyVariants({
                    variant: "main-nav",
                    className: "hide-mobile flex flex-row",
                  })}
                >
                  <Menu />
                  <Settings />
                </div>

                {/* rhs on mobile view */}
                <div
                  className={typographyVariants({
                    variant: "main-nav",
                    className: "hide-desktop flex flex-row",
                  })}
                >
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
                className="hide-desktop page-container bg-theme-placeholder mb-6 mt-4 h-0.5 w-[70%]"
              />
            </CollapsibleContent>
          </header>
        </Collapsible>
      </div>
    </div>
  )
}

function Header() {
  return <Navbar />
}

export default Header
