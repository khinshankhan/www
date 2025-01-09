import { useCallback, useEffect, useRef, useState, type MouseEventHandler } from "react"
import { UAParser, type IResult as UAParserResult } from "ua-parser-js"

// inspired by https://github.com/fuma-nama/fumadocs/blob/2a82e9d14a5d169bf0a22297b2e50849a129af7a/packages/ui/src/utils/use-copy-button.ts
export function useCopyButton(onCopy: () => void): [boolean, MouseEventHandler] {
  const [checked, setChecked] = useState(false)
  const timeoutRef = useRef<number | null>(null)

  const handleClick: MouseEventHandler = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    timeoutRef.current = window.setTimeout(() => {
      setChecked(false)
    }, 1000)

    onCopy()
    setChecked(true)
  }, [onCopy])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return [checked, handleClick]
}

export function useUserAgent() {
  const [userAgent, setUserAgent] = useState<UAParserResult | null>(null)

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase()

    const parsed = UAParser(ua)
    setUserAgent(parsed)
  }, [])

  return userAgent
}
