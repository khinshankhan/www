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

// NOTE: this needs to be kept in sync with the tailwind config
const breakpoints = {
  xss: "(min-width: 320px)",
  xs: "(min-width: 392px)",
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1325px)",
  "2xl": "(min-width: 1536px)",
  isMobile: "(max-width: 767px)",
  isDesktop: "(min-width: 768px)",
}

// NOTE: this is a 'hacky way' to get the breakpoints for controlled components, rely on css as much a spossible
export function useBreakpoint({ breakpoint }: { breakpoint: keyof typeof breakpoints }) {
  const query = breakpoints[breakpoint]
  return useMediaQuery({ query })
}
