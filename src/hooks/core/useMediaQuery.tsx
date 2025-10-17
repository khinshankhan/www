import { useCallback, useSyncExternalStore } from "react"

export function useMediaQuery(query: string) {
  // SSR-safe subscribe using useSyncExternalStore
  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia(query).matches
  }, [query])

  const subscribe = useCallback(
    (callback: () => void) => {
      if (typeof window === "undefined") return () => {}
      const mql = window.matchMedia(query)
      // modern 'change' event
      mql.addEventListener("change", callback)
      return () => mql.removeEventListener("change", callback)
    },
    [query]
  )

  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}
