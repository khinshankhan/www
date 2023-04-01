"use client"

import React from "react"
import { useTheme } from "next-themes"
import { useMounted } from "hooks"

export function ThemeToggle({ className = "" }: { className?: string }) {
  const mounted = useMounted()
  const { setTheme, resolvedTheme } = useTheme()

  if (!mounted) return null

  const isLight = resolvedTheme === `light`
  const oppositeTheme = isLight ? `dark` : `light`
  const text = `Switch to ${oppositeTheme} mode`

  const toggleTheme = () => setTheme(oppositeTheme)
  return (
    <button onClick={toggleTheme} aria-label={text} className={className}>
      {text}
    </button>
  )
}
