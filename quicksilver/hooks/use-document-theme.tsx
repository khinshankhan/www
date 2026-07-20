"use client"

import { useEffect, useState } from "react"
import { getDocumentTheme, type DocumentTheme } from "@/quicksilver/lib/color"

/** Tracks the document's light/dark theme from the root class list. */
export function useDocumentTheme(): DocumentTheme {
  const [theme, setTheme] = useState<DocumentTheme>(() => getDocumentTheme())

  useEffect(() => {
    const sync = () => {
      setTheme(getDocumentTheme())
    }

    sync()

    const observer = new MutationObserver(sync)
    observer.observe(document.documentElement, {
      attributeFilter: ["class"],
      attributes: true,
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return theme
}
