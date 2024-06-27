"use client"

import React, { forwardRef, useEffect, useRef, useState } from "react"
import { highlight } from "sugar-high"
import { cn, copyToClipboardGraceful } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/primitives/button"
import { ScrollArea, ScrollBar } from "@/components/primitives/scroll-area"
import { SvgIcon } from "@/components/primitives/svg-icon"
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@/components/primitives/tooltip"
import { typographyVariants } from "@/components/primitives/typography"

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
      className={cn(
        !shouldHighlight && typographyVariants({ variant: "small" }),
        "rounded-lg bg-muted px-1 py-0.5 text-content-foreground",
        className
      )}
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
  // ref for scrollbar
  const ref = useRef<HTMLDivElement>(null)
  const visible = ref.current?.getAttribute("data-state") === "visible"

  // @ts-ignore: it's fine, this is how mdx codeblocks work
  const text = children?.props?.children ?? "Something went wrong, please contact support."

  return (
    <div className="group relative flex w-full items-start justify-center">
      <ScrollArea
        className="group mb-0.5 block size-full rounded-lg border border-muted-foreground bg-muted"
        type="auto"
      >
        <CopyToClipboardButton text={text} className="absolute right-2 top-2" />

        <pre
          ref={forwardedRef}
          className={cn(
            typographyVariants({ variant: "small" }),
            "size-full whitespace-pre rounded-lg bg-accent px-4 pt-3 text-content-foreground [&>code]:contents",
            visible ? "pb-4" : "pb-3"
          )}
          {...props}
        >
          {children}
        </pre>
        <ScrollBar ref={ref} orientation="horizontal" className="mx-1 mb-0.5" />
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
    const [hovering, setHovering] = useState(false)
    const [clicked, setClicked] = useState(false)
    const [count, setCount] = useState(0)
    const [copied, setCopied] = useState(false)

    useEffect(() => {
      const timer = setTimeout(() => {
        setClicked(false)
      }, 1000)
      return () => clearTimeout(timer)
    }, [count, clicked, setClicked])

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
        setClicked(true)
        setCopied(true)
        setCount((c) => c + 1)
        return
      }
    }

    const handleMouseEnter = () => setHovering(true)
    const handleMouseLeave = () => setHovering(false)

    return (
      <Tooltip disableHoverableContent open={hovering}>
        <TooltipTrigger asChild onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span>{copied ? "Copied" : "Copy"}</span>
          <TooltipArrow className="fill-knockout" width={11} height={5} />
        </TooltipContent>
      </Tooltip>
    )
  }
)
CopyToClipboardButton.displayName = "CopyToClipboardButton"
