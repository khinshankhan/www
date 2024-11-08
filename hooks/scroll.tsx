"use client"

import { useEffect, useRef, useState } from "react"
import { useMounted } from "./media"

// based off https://github.com/chakra-ui/chakra-ui-docs/blob/main/src/hooks/use-scrollspy.ts
export function useScrollSpy(
  selectors: string[],
  options?: IntersectionObserverInit,
  retain = true
) {
  const mounted = useMounted()

  const [activeIds, setActiveIds] = useState<string[]>([])

  const observer = useRef<IntersectionObserver | null>(null)
  useEffect(() => {
    if (!mounted) return undefined

    const elements = selectors.map((selector) => document.querySelector(selector))

    observer.current?.disconnect()
    observer.current = new IntersectionObserver((entries) => {
      const newActiveIds: string[] = []
      entries.forEach((entry) => {
        if (entry?.isIntersecting) {
          newActiveIds.push(entry.target.getAttribute("id") ?? "")
        }
      })

      if (!retain) {
        setActiveIds(newActiveIds)
      } else if (newActiveIds.length > 0) {
        setActiveIds(newActiveIds)
      }
    }, options)

    elements.forEach((el) => {
      if (el) observer.current?.observe(el)
    })

    return () => observer.current?.disconnect()
  }, [selectors, options, mounted])

  return activeIds
}
