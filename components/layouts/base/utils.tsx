"use client"

import { usePathname } from "next/navigation"
import { heroRoutes } from "@/config"

export function useHeroP() {
  const pathname = usePathname()
  return heroRoutes.includes(pathname)
}
