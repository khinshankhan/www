"use client"

import { useCallback, useRef, useState } from "react"
import { useStableTimeout } from "./use-stable-timeout"

export interface UseActionLockOptions {
  /** Lock duration in ms. */
  durationMs?: number
}

/** Runs an action and ignores further calls until the lock window elapses. */
export function useActionLock({ durationMs = 1000 }: UseActionLockOptions = {}) {
  const [isLocked, setIsLocked] = useState(false)
  const lockedRef = useRef(false)
  const t = useStableTimeout()

  const unlock = useCallback(() => {
    t.clear()
    lockedRef.current = false
    setIsLocked(false)
  }, [t])

  const run = useCallback(
    async (fn: () => void | Promise<void>) => {
      if (lockedRef.current) {
        return
      }

      lockedRef.current = true
      setIsLocked(true)
      t.set(unlock, durationMs)
      await fn()
    },
    [t, unlock, durationMs]
  )

  return { isLocked, run, unlock }
}
