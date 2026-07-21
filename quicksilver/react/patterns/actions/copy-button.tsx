"use client"

import React, { useCallback } from "react"
import { useCopyButton } from "@/quicksilver/hooks/use-copy-button"
import { cn } from "@/quicksilver/lib/classname"
import { copyToClipboardGraceful } from "@/quicksilver/lib/clipboard"
import { Button, type ButtonProps } from "@/quicksilver/react/primitives/button"
import { Check, Copy } from "@/quicksilver/react/primitives/icons"

export interface CopyButtonProps extends ButtonProps {
  text: string
  onCopy?: () => void
}

export function CopyButton({ text, onCopy, onClick, className, ...props }: CopyButtonProps) {
  const copyCallback = useCallback(async () => {
    await copyToClipboardGraceful(text)
    onCopy?.()
  }, [text, onCopy])

  const { copied, handleClick } = useCopyButton({
    action: copyCallback,
    durationMs: 1000,
  })

  return (
    <Button
      // keep the name static and let the live region below announce "Copied"; a changing name
      // would re-announce on some screen readers and double up with the live region
      aria-label="Copy text to clipboard"
      variant="phantom"
      size="icon-sm"
      className={cn(
        "pointer-events-auto absolute top-1 right-2 z-2 opacity-70 transition-opacity hover:opacity-100 md:top-1.5 lg:top-2",
        className
      )}
      {...props}
      onClick={(event) => {
        onClick?.(event)
        handleClick()
      }}
    >
      {copied ? (
        <Check className="accent-theme-success h-4 stroke-accent-11" />
      ) : (
        <Copy className="h-4" />
      )}
      {/* the icon swap is visual-only; announce the outcome to screen readers */}
      <span aria-live="polite" className="sr-only">
        {copied ? "Copied" : ""}
      </span>
    </Button>
  )
}
