"use client"

import React, { useCallback } from "react"
import { Button, type ButtonProps } from "@/components/base/button"
import { Check, Copy } from "@/components/base/icon"
import { cn, copyToClipboardGraceful } from "@/lib/utils"
import { useCopyButton } from "hooks/navigator"

export interface CopyButtonProps extends ButtonProps {
  text: string
  onCopy?: () => void
}

// TODO: add tooltip
export function CopyButton({ text, onCopy, ...props }: CopyButtonProps) {
  const copyCallback = useCallback(async () => {
    await copyToClipboardGraceful(text)
    onCopy?.()
  }, [text])

  const [checked, onClick] = useCopyButton(copyCallback)

  return (
    <Button
      aria-label="Copy text to clipboard"
      variant="phantom"
      className={cn("bg-opacity-20 flex items-center gap-2 transition-all", props.className)}
      onClick={onClick}
      {...props}
    >
      {checked ? (
        <Check className="success-theme h-5 stroke-accent-11" />
      ) : (
        <Copy className="h-5" />
      )}
    </Button>
  )
}
