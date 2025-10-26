"use client"

import { useCallback, useEffect, useState } from "react"
import { useActionLock } from "./use-action-lock"

interface UseCopyButtonProps {
  /** Action to perform on copy */
  action: () => Promise<void> | void
  /** Lock duration in ms */
  durationMs?: number
}

interface UseCopyButtonResult {
  /** Whether the action was successfully performed */
  copied: boolean
  /** Any error encountered during the action */
  error: Error | null
  /** Click handler to trigger the action */
  handleClick: () => void
}

export function useCopyButton({
  action,
  durationMs = 1000,
}: UseCopyButtonProps): UseCopyButtonResult {
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const { isLocked, run } = useActionLock({ durationMs, refreshOnInvoke: true })

  const handleClick = useCallback(() => {
    if (isLocked) return
    void run(async () => {
      try {
        await action()
        setCopied(true)
        setError(null)
      } catch (err) {
        setError(err as Error)
        setCopied(false)
      }
    })
  }, [action, isLocked, run])

  useEffect(() => {
    // reset automatically when lock releases
    if (!isLocked && copied) {
      setCopied(false)
      setError(null)
    }
  }, [isLocked, copied])

  return { copied, error, handleClick }
}
