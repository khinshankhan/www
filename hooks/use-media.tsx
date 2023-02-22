import { useEffect, useLayoutEffect, useState } from "react"

export const isServer = typeof window === "undefined" || !window.navigator
export const isBrowser = !isServer

// https://usehooks-ts.com/react-hook/use-isomorphic-layout-effect
export const useIsomorphicEffect = isBrowser ? useLayoutEffect : useEffect

export function useMediaQuery(query: string, defaultValue: boolean = false) {
  const [matches, setMatches] = useState(() => defaultValue)

  useIsomorphicEffect(() => {
    // if it's somehow server rendered, we can't match media
    // use effect expects a cleanup fn or undefined
    if (isServer) return undefined

    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    const listener = () => setMatches(media.matches)
    window.addEventListener("resize", listener)
    return () => window.removeEventListener("resize", listener)
  }, [isServer, matches, query])

  return matches
}
