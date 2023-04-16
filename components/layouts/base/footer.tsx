import React from "react"
import { info } from "@/config"
import { cn } from "@/lib/utils"

export function Footer({ isHero }: { isHero: boolean }) {
  return (
    <>
      {isHero && (
        <div role="presentation" className="page-container bg-theme-placeholder h-0.5 w-[70%]" />
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
