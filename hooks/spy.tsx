import { useCallback, useEffect, useRef, useState } from "react"
import { isServer, useIsomorphicEffect } from "./media"

export const HeadroomPositions = {
  PINNED: "PINNED",
  UNPINNED: "UNPINNED",
  DEFAULT: "DEFAULT",
}

export function useHeadroom(options = { upTolerance: 0, downTolerance: 0 }) {
  const [position, setPosition] = useState<keyof typeof HeadroomPositions>("DEFAULT")
  const startY = useRef<number>(0)

  function getScrollY() {
    if (window.pageYOffset) {
      return window.pageYOffset
    }

    return (document.documentElement || document.body.parentNode || document.body).scrollTop
  }

  const handleScroll = () => {
    const newY = getScrollY()
    const difference = newY - startY.current

    if (difference > 0 && difference > options.upTolerance) {
      startY.current = newY
      setPosition(() => "UNPINNED")
    }

    if (difference < 0 && difference < options.upTolerance) {
      startY.current = newY
      setPosition(() => (newY <= options.downTolerance ? "DEFAULT" : "PINNED"))
    }
  }

  const onScroll = useCallback(() => {
    requestAnimationFrame(() => handleScroll())
  }, [handleScroll])

  useIsomorphicEffect(() => {
    if (isServer) return undefined

    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [isServer])

  return { position }
}

// based off https://github.com/chakra-ui/chakra-ui-docs/blob/main/src/hooks/use-scrollspy.ts
export function useScrollSpy(
  selectors: string[],
  options?: IntersectionObserverInit,
  retain = true
) {
  const [activeIds, setActiveIds] = useState<string[]>([])

  const observer = useRef<IntersectionObserver | null>(null)
  useEffect(() => {
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
  }, [selectors, options])

  return activeIds
}
