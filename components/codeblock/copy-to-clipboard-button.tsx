"use client"

import { forwardRef, useCallback, useState } from "react"
import { copyToClipboardGraceful, useCopyButton } from "hooks/copy"
import { cn } from "@/lib/utils"
import { Button, ButtonProps } from "@/components/primitives/button"
import { SvgIcon } from "@/components/primitives/svg-icon"
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@/components/primitives/tooltip"

export interface CopyButtonProps extends ButtonProps {
  text: string
}

export const CopyButton = forwardRef<HTMLButtonElement, CopyButtonProps>(
  ({ className = "", text, ...props }, ref) => {
    const [hovering, setHovering] = useState(false)
    const handleMouseEnter = () => setHovering(true)
    const handleMouseLeave = () => setHovering(false)

    const onCopy = useCallback(() => {
      void copyToClipboardGraceful(text)
    }, [text])

    const [checked, onClick] = useCopyButton(onCopy)

    return (
      <Tooltip disableHoverableContent open={hovering}>
        <TooltipTrigger asChild onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Button
            aria-label="Copy text to clipboard"
            ref={ref}
            variant="ghost-contrast"
            className={cn("transition-all", className)}
            onClick={onClick}
            {...props}
          >
            <SvgIcon id={checked ? "check" : "document-duplicate"} className={"size-5"} />
          </Button>
        </TooltipTrigger>
        <TooltipContent
          side="left"
          onPointerDownOutside={(event) => {
            event.preventDefault()
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span>{checked ? "Copied" : "Copy"}</span>
          <TooltipArrow className="fill-knockout" width={11} height={5} />
        </TooltipContent>
      </Tooltip>
    )
  }
)
CopyButton.displayName = "CopyButton"
