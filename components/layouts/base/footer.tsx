"use client"

import React from "react"
import { info } from "@/config"
import { cn } from "@/lib/utils"

export function Footer() {
  return (
    <>
      <div role="presentation" className="page-container h-0.5 w-[70%] bg-theme-stark" />
      <footer className={cn("page-container mt-5 pb-10 pt-8")}>
        <p className="text-center">
          &copy; {info.startYear}+, {info.fullname}. All rights reserved.
        </p>
      </footer>
    </>
  )
}

export default Footer
