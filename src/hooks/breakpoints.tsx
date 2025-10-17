import { useMediaQuery } from "./core/useMediaQuery"

// NOTE: this needs to be kept in sync with the tailwind config
const breakpoints = {
  xss: "20rem",
  xs: "24.5rem",
  sm: "40rem",
  md: "48rem",
  lg: "64rem",
  xl: "82.8125rem",
  "2xl": "96rem",
}

type Breakpoint = keyof typeof breakpoints

// NOTE: this is a 'hacky way' to get the breakpoints for controlled components
// we should rely on css as much as possible, which should help with CLS and SSR
export function useBreakpoint(breakpoint: Breakpoint) {
  const query = `(min-width: ${breakpoints[breakpoint]})`
  return useMediaQuery(query)
}
