import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"

import { screens, type Screens } from "lib/theme"

export const isServer = typeof window === "undefined" || !window.navigator
export const isBrowser = !isServer

// https://usehooks-ts.com/react-hook/use-isomorphic-layout-effect
export const useIsomorphicEffect = isBrowser ? useLayoutEffect : useEffect

export function useMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return mounted
}

export function useMediaQuery(query: string, defaultValue: boolean = false) {
  const [matches, setMatches] = useState(() => defaultValue)

  useIsomorphicEffect(() => {
    // if it's somehow server rendered, we can't match media
    // use effect expects a cleanup fn or undefined
    if (isServer) return undefined

    const media = window?.matchMedia(query)
    if (media?.matches !== matches) {
      setMatches(media.matches)
    }

    const listener = () => setMatches(media?.matches)
    window.addEventListener("resize", listener)
    return () => window.removeEventListener("resize", listener)
  }, [isServer, matches, query])

  return matches
}

type Bp = keyof Screens
export function useBreakpoint(bp: Bp, defaultValue: boolean = false) {
  function constructMediaQuery(bp: Bp) {
    const size = screens[bp]
    if (typeof size === "object" && size?.max) {
      return `(max-width: ${size.max})`
    }
    return `(min-width: ${size})`
  }

  const mediaQuery = constructMediaQuery(bp)
  const match = useMediaQuery(mediaQuery, defaultValue)
  return match
}

// mostly for debugging purposes
export const useDimensions = () => {
  const [innerWidth, setW] = useState(typeof window !== "undefined" ? window.innerWidth : null)
  const [innerHeight, setH] = useState(typeof window !== "undefined" ? window.innerHeight : null)

  function windowResizeHandler() {
    if (typeof window !== "undefined") {
      setW(window.innerWidth)
      setH(window.innerHeight)
    }
  }

  useEffect(() => {
    if (typeof window === "undefined") return undefined

    window.addEventListener(`resize`, windowResizeHandler)
    return () => window.removeEventListener(`resize`, windowResizeHandler)
  }, [])

  return { innerWidth, innerHeight }
}

export function useHeadroom(options = { upTolerance: 0, downTolerance: 0 }) {
  const [position, setPosition] = useState<"PINNED" | "UNPINNED" | "DEFAULT">("DEFAULT")
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
