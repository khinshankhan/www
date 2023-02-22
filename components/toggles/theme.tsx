"use client"

import React, { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const isLight = resolvedTheme === `light`
  const oppositeTheme = isLight ? `dark` : `light`

  const toggleTheme = () => setTheme(oppositeTheme)

  return <button onClick={toggleTheme}>{`Switch to ${oppositeTheme} mode`}</button>
}
