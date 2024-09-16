import { useCallback, useEffect, useRef, useState, type MouseEventHandler } from "react"

// based on https://stackoverflow.com/a/65996386
export async function copyToClipboardGraceful(text: string): Promise<boolean> {
  // Navigator clipboard api needs a secure context (https)
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  // Use the 'out of viewport hidden text area' trick
  const textArea = document.createElement("textarea")
  textArea.value = text

  // Move textarea out of the viewport so it's not visible
  textArea.style.position = "absolute"
  textArea.style.left = "-999999px"

  document.body.prepend(textArea)
  textArea.select()

  try {
    // NOTE: deprecated how it's literally for old browsers lol
    document?.execCommand("copy")
    return true
  } catch (error) {
    console.error(error)
    return false
  } finally {
    textArea.remove()
  }
}

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
