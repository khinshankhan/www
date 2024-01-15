import React from "react"

const info = {
  fullname: "Khinshan Khan",
  startYear: 2017,
}

function Topbar() {
  return (
    <header className="h-[88px]">
      <nav className="h-[88px]">nav</nav>
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
