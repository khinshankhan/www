"use client"

import { useCallback, useEffect, useState } from "react"
import { useActionLock } from "./use-action-lock"

interface UseCopyButtonProps {
  /** Action to run when copying. */
  action: () => Promise<void> | void
  /** Copied-state duration in ms. */
  durationMs?: number
}

interface UseCopyButtonResult {
  /** Whether the action completed successfully. */
  copied: boolean
  /** Error from the most recent action attempt. */
  error: Error | null
  /** Triggers the copy action. */
  handleClick: () => void
}

export function useCopyButton({
  action,
  durationMs = 1000,
}: UseCopyButtonProps): UseCopyButtonResult {
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const { isLocked, run } = useActionLock({ durationMs })

  const handleClick = useCallback(() => {
    // no lock check needed: run() ignores calls while locked
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
  }, [action, run])

  useEffect(() => {
    if (!isLocked && copied) {
      setCopied(false)
      setError(null)
    }
  }, [isLocked, copied])

  return { copied, error, handleClick }
}
