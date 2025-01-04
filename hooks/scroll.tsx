"use client"

import { useEffect, useRef, useState } from "react"
import { useMounted } from "./media"

// based off https://github.com/chakra-ui/chakra-ui-docs/blob/main/src/hooks/use-scrollspy.ts
export function useScrollSpy({
  selectors,
  options = {},
  retain = true,
  attribute = "id",
  delimiter = " ",
}: {
  selectors: string[]
  options?: IntersectionObserverInit
  retain?: boolean
  attribute?: string
  delimiter?: string
}) {
  const mounted = useMounted()

  const [activeIds, setActiveIds] = useState("")

  const observer = useRef<IntersectionObserver | null>(null)
  useEffect(() => {
    if (!mounted) return undefined

    const elements = selectors.map((selector) => document.querySelector(selector))

    observer.current?.disconnect()
    observer.current = new IntersectionObserver((entries) => {
      const newActiveIds: string[] = []
      entries.forEach((entry) => {
        if (entry?.isIntersecting) {
          newActiveIds.push(entry.target.getAttribute(attribute) ?? "")
        }
      })

      const newActiveIdsString = newActiveIds.join(delimiter)
      if (!retain) {
        // if not retain, just set the new active ids
        setActiveIds(newActiveIdsString)
      } else if (newActiveIds.length > 0) {
        // if retain and new active ids are not empty, set the new active ids
        // otherwise we keep ('retain') the previously active ids
        setActiveIds(newActiveIdsString)
      }
    }, options)

    elements.forEach((el) => {
      if (el) observer.current?.observe(el)
    })

    return () => observer.current?.disconnect()

    // we shouldn't rely on selectors nor options changing due to them not being primitives
    // which would cause the effect to run indefinitely
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted])

  return activeIds
}
