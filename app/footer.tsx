"use client"

import React from "react"
import { usePathname } from "next/navigation"
import { info } from "@/config"
import { cn } from "@/lib/utils"

function Footer() {
  const pathname = usePathname()
  const isHero = pathname === "/"

  return (
    <div className="bg-theme">
      {isHero && (
        <div role="presentation" className="page-container bg-theme-placeholder h-0.5 w-[70%]" />
      )}
      <footer className={cn("page-container pb-10 pt-8", isHero && "mt-5")}>
        <p className="text-center">
          &copy; {info.startYear}+, {info.fullname}. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

export default Footer
