"use client"

import React, { forwardRef, useEffect, useState } from "react"
import { highlight } from "sugar-high"
import { cn, copyToClipboardGraceful } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/primitives/button"
import { ScrollArea, ScrollBar } from "@/components/primitives/scroll-area"
import { SvgIcon } from "@/components/primitives/svg-icon"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/primitives/tooltip"

export interface CodeProps extends React.ComponentPropsWithoutRef<"code"> {
  children: string
}

export const Code = React.forwardRef<HTMLElement, CodeProps>(function Code(
  { className, children, ...props },
  forwardedRef
) {
  const shouldHighlight = className?.includes("language-")
  const codeHTML = shouldHighlight ? highlight(children) : children

  return (
    <code
      ref={forwardedRef}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: codeHTML }}
      className={cn("rounded-lg bg-muted px-1 text-content-foreground", className)}
      {...props}
    />
  )
})
Code.displayName = "CodeBlock.Code"

export interface PreProps extends React.ComponentPropsWithoutRef<"pre"> {}
export const Pre = React.forwardRef<HTMLPreElement, PreProps>(function Pre(
  { className, children, ...props },
  forwardedRef
) {
  // @ts-ignore: it's fine, this is how mdx codeblocks work
  const text = children?.props?.children ?? "Something went wrong, please contact support."

  return (
    <div className="group relative flex w-full items-start justify-center">
      <ScrollArea className="group mb-0.5 block size-full rounded-lg bg-muted" type="auto">
        <CopyToClipboardButton text={text} className="absolute right-2 top-2" />

        <pre
          ref={forwardedRef}
          className="size-full whitespace-pre rounded-lg bg-muted px-4 pb-6 pt-3 text-content-foreground [&>code]:contents"
          {...props}
        >
          {children}
        </pre>
        <ScrollBar orientation="horizontal" className="mx-1" />
      </ScrollArea>
    </div>
  )
})
Pre.displayName = "CodeBlock.Pre"

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

      const successful = await copyToClipboardGraceful(text)
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
            variant="ghost-contrast"
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
