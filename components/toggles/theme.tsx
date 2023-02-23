"use client"

import React, { useEffect, useState } from "react"
import { useTheme } from "next-themes"

import { Moon, Sun } from "components/icons"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const isLight = resolvedTheme === `light`
  const oppositeTheme = isLight ? `dark` : `light`
  const ColorIcon = isLight ? Moon : Sun

  const toggleTheme = () => setTheme(oppositeTheme)

  return (
    <button aria-label={`Switch to ${oppositeTheme} mode`} onClick={toggleTheme}>
      <ColorIcon />
    </button>
  )
}
