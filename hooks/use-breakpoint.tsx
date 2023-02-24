import { screens, type Screens } from "lib/theme"

import { useMediaQuery } from "./use-media"

type Bp = keyof Screens
export function useBreakpoint(bp: Bp, defaultValue: boolean = false) {
  function constructMediaQuery(bp: keyof typeof screens) {
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
