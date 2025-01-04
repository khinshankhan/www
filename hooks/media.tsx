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
  xss: "(min-width: 20rem)",
  xs: "(min-width: 24.5rem)",
  sm: "(min-width: 40rem)",
  md: "(min-width: 48rem)",
  lg: "(min-width: 64rem)",
  xl: "(min-width: 82.8125rem)",
  "2xl": "(min-width: 96rem)",
}

// NOTE: this is a 'hacky way' to get the breakpoints for controlled components
// we should rely on css as much as possible, which should help with CLS and SSR
export function useBreakpoint(breakpoint: keyof typeof breakpoints) {
  const query = breakpoints[breakpoint]
  return useMediaQuery({ query })
}
