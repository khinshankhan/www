import { useEffect, useLayoutEffect, useState } from "react"

export const isServer = typeof window === "undefined" || !window.navigator
export const isBrowser = !isServer

// https://usehooks-ts.com/react-hook/use-isomorphic-layout-effect
export const useIsomorphicEffect = isBrowser ? useLayoutEffect : useEffect

export function useMounted() {
  const [mounted, setMounted] = useState(false)
  useIsomorphicEffect(() => setMounted(true), [])

  return mounted
}
