"use client"

import React, { forwardRef, useEffect, useState } from "react"
import { cn, copyToClipboard } from "@/lib/utils"
import { SvgIcon } from "@/components/icons"
import { Button, type ButtonProps } from "@/components/primitives/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/primitives/tooltip"

interface CopyToClipboardButtonProps extends ButtonProps {
  text: string
  className?: string
}

export const CopyToClipboardButton = forwardRef<HTMLButtonElement, CopyToClipboardButtonProps>(
  function CopyToClipboardButton({ text, className = "", ...props }, forwardedRef) {
    const [count, setCount] = useState(0)
    const [clicked, setClick] = useState(false)
    const [copied, setCopied] = useState(false)

    useEffect(() => {
      const timer = setTimeout(() => {
        setClick(false)
      }, 1000)
      return () => clearTimeout(timer)
    }, [count, clicked, setClick])

    useEffect(() => {
      const timer = setTimeout(() => {
        setCopied(false)
      }, 850)
      return () => clearTimeout(timer)
    }, [count, clicked, copied])

    const handleCopy = async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()

      const successful = await copyToClipboard(text)
      if (successful) {
        setClick(true)
        setCopied(true)
        setCount((c) => c + 1)
        return
      }
    }

    return (
      <Tooltip disableHoverableContent>
        <TooltipTrigger asChild>
          <Button
            ref={forwardedRef}
            variant="ghost-active"
            className={cn("flex items-center gap-2", className)}
            onClick={handleCopy}
            {...props}
          >
            <SvgIcon id={copied ? "check" : "document-duplicate"} />
          </Button>
        </TooltipTrigger>
        <TooltipContent
          side="left"
          onPointerDownOutside={(event) => {
            event.preventDefault()
          }}
        >
          <span>{copied ? "Copied" : "Copy"}</span>
        </TooltipContent>
      </Tooltip>
    )
  }
)
CopyToClipboardButton.displayName = "CopyToClipboardButton"
