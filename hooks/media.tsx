import { useEffect, useLayoutEffect, useState } from "react"
import { useMediaQuery } from "react-responsive"

export const isServer = typeof window === "undefined" || !window.navigator
export const isBrowser = !isServer

// https://usehooks-ts.com/react-hook/use-isomorphic-layout-effect
export const useIsomorphicEffect = isBrowser ? useLayoutEffect : useEffect

export function useMounted() {
  const [mounted, setMounted] = useState(false)
  useIsomorphicEffect(() => setMounted(true), [])

  return mounted
}

export function useBreakpoints() {
  // NOTE: this is a hacky way to get the breakpoints for controlled components
  // this needs to be kept in sync with the tailwind config
  const isXss = useMediaQuery({ query: "(min-width: 320px)" })
  const isXs = useMediaQuery({ query: "(min-width: 392px)" })
  const isSm = useMediaQuery({ query: "(min-width: 640px)" })
  const isMd = useMediaQuery({ query: "(min-width: 768px)" })
  const isLg = useMediaQuery({ query: "(min-width: 1024px)" })
  const isXl = useMediaQuery({ query: "(min-width: 1325px)" })
  const is2xl = useMediaQuery({ query: "(min-width: 1536px)" })

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" })
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" })

  return { isXss, isXs, isSm, isMd, isLg, isXl, is2xl, isMobile, isDesktop }
}
