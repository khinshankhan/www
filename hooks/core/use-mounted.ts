import { useState } from "react"
import { useIsomorphicEffect } from "./use-isomorphic-effect"

export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false)
  useIsomorphicEffect(() => setMounted(true), [])

  return mounted
}
