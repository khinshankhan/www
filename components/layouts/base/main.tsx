"use client"

import React, { type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { useHeroP } from "./utils"

export default function Main({ children }: { children: ReactNode }) {
  const isHero = useHeroP()

  return <main className={cn("flex grow flex-col", !isHero && "bg-theme-content")}>{children}</main>
}
