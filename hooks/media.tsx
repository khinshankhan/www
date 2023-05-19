import { useEffect, useLayoutEffect, useState } from "react"
import { screens, type Screens } from "@/lib/theme"

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
