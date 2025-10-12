import { useState } from "react"
import { useIsomorphicEffect } from "./useIsomorphicEffect"

export function useMounted() {
  const [mounted, setMounted] = useState(false)
  useIsomorphicEffect(() => setMounted(true), [])

  return mounted
}
