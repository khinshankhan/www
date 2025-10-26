"use client"

import { useCallback, useEffect, useRef } from "react"

export function useStableTimeout() {
  const idRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clear = useCallback(() => {
    if (idRef.current !== null) {
      clearTimeout(idRef.current)
      idRef.current = null
    }
  }, [])

  const set = useCallback(
    (cb: () => void, ms: number) => {
      clear()
      idRef.current = setTimeout(cb, ms)
    },
    [clear]
  )

  useEffect(() => clear, [clear])

  return { set, clear, isActive: () => idRef.current !== null }
}
