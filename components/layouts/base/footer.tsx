"use client"

import React from "react"
import { info } from "@/config"
import { cn } from "@/lib/utils"
import { useHeroP } from "./utils"

export function Footer() {
  const isHero = useHeroP()

  return (
    <>
      {isHero && (
        <div role="presentation" className="page-container h-0.5 w-[70%] bg-theme-stark" />
      )}
      <footer className={cn("page-container pb-10 pt-8", isHero && "mt-5")}>
        <p className="text-center">
          &copy; {info.startYear}+, {info.fullname}. All rights reserved.
        </p>
      </footer>
    </>
  )
}

export default Footer
