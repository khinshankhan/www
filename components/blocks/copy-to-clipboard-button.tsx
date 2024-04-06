"use client"

import React, { forwardRef } from "react"
import { cn, copyToClipboard } from "@/lib/utils"
import { SvgIcon } from "@/components/icons"
import { Button, type ButtonProps } from "@/components/primitives/button"
import { toast } from "@/components/primitives/toaster"

interface CopyToClipboardButtonProps extends ButtonProps {
  text: string
  className?: string
}

export const CopyToClipboardButton = forwardRef<HTMLButtonElement, CopyToClipboardButtonProps>(
  function CopyToClipboardButton({ text, className = "", ...props }, forwardedRef) {
    const handleCopy = async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()

      const promise = async () => copyToClipboard(text)
      toast.promise(promise, {
        loading: "Loading...",
        success: "Copied to clipboard!",
        error: "Failed to copy to clipboard!",
      })
    }

    return (
      <Button
        ref={forwardedRef}
        variant="ghost-active"
        className={cn("flex items-center gap-2", className)}
        onClick={handleCopy}
        {...props}
      >
        <SvgIcon id="document-duplicate" />
      </Button>
    )
  }
)
CopyToClipboardButton.displayName = "CopyToClipboardButton"
