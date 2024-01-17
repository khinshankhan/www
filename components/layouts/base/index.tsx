import React from "react"
import NextLink from "next/link"
import { NavItem } from "./nav"

const info = {
  fullname: "Khinshan Khan",
  startYear: 2017,
}

const navItems = [
  { route: "/about/", name: "About" },
  { route: "/writings/", name: "Writings" },
  { route: "/projects/", name: "Projects" },
  { route: "/connect/", name: "Connect" },
]

function Navbar() {
  return (
    <nav className="flex h-[88px] flex-row justify-between">
      <NextLink href="/">
        <div>logo</div>
      </NextLink>

      <ul className="flex flex-row space-x-4">
        {navItems.map(({ route, name }) => (
          <NavItem key={route} route={route} name={name} />
        ))}
      </ul>
    </nav>
  )
}

function Topbar() {
  return (
    <header role="navigation">
      <Navbar />
    </header>
  )
}

function Footer() {
  return (
    <footer className="mb-28 pt-10">
      <p className="text-center">
        &copy; {info.startYear}+, {info.fullname}. All rights reserved.
      </p>
    </footer>
  )
}

export function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="relative isolate flex min-h-[87vh] flex-col">
        <Topbar />
        <div className="flex grow flex-col">{children}</div>
      </div>
      <Footer />
    </>
  )
}
