"use client"

import { useCallback, useRef, useState } from "react"
import { useStableTimeout } from "./use-stable-timeout"

export interface UseActionLockOptions {
  /** Lock duration in ms */
  durationMs?: number
  /** If true, a call during the lock queues one trailing call */
  trailing?: boolean
  /** If true, each accepted call refreshes the lock window */
  refreshOnInvoke?: boolean
  /** If true, consecutive accepted calls extend the lock timer */
  extendOnInvoke?: boolean
}

export function useActionLock({
  durationMs = 1000,
  trailing = false,
  refreshOnInvoke = true,
  extendOnInvoke = false,
}: UseActionLockOptions = {}) {
  const [isLocked, setIsLocked] = useState(false)
  const trailingRef = useRef<(() => void | Promise<void>) | null>(null)
  const t = useStableTimeout()

  const unlock = useCallback(() => {
    setIsLocked(false)
    t.clear()

    const next = trailingRef.current
    trailingRef.current = null
    if (next) {
      // run queued call and re-lock
      void run(next)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const arm = useCallback(() => {
    t.set(unlock, durationMs)
    setIsLocked(true)
  }, [t, unlock, durationMs])

  async function run(fn: () => void | Promise<void>) {
    if (isLocked) {
      if (extendOnInvoke) {
        // refresh/extend the lock duration
        t.clear()
        t.set(unlock, durationMs)
      } else if (trailing) {
        trailingRef.current = fn
      }
      return
    }

    if (refreshOnInvoke) {
      arm()
    }
    await fn()
  }

  return { isLocked, run, unlock }
}
