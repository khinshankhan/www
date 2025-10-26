"use client"

import React, { useCallback } from "react"
import rehypeWrapLines from "@/lib/syntax/plugins/rehype-wrap-lines"
import { useCopyButton } from "@/quicksilver/hooks/use-copy-button"
import { cn } from "@/quicksilver/lib/classname"
import { copyToClipboardGraceful } from "@/quicksilver/lib/clipboard"
import { toHtml as hastToHtml } from "hast-util-to-html"
import { all, createLowlight } from "lowlight"
import rangeParser from "parse-numeric-range"
import { Button } from "./button"
import { Check, Copy } from "./icons"
import { textVariants } from "./text.variants"

const lowlight = createLowlight(all)

interface CopyButtonProps {
  text: string
  onCopy?: () => void
}
function CopyButton({ text, onCopy }: CopyButtonProps) {
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
      aria-label="Copy text to clipboard"
      variant="phantom"
      size="icon-sm"
      className="absolute top-2 right-2 z-2 opacity-70 transition-opacity hover:opacity-100"
      onClick={handleClick}
    >
      {copied ? (
        <Check className="accent-theme-success h-4 stroke-accent-11" />
      ) : (
        <Copy className="h-4" />
      )}
    </Button>
  )
}

export interface CodeProps extends React.ComponentPropsWithRef<"code"> {
  children: string
  isFenced?: boolean
  language?: string

  highlighted?: string
  add?: string
  remove?: string
}

export function Code({
  children,
  isFenced = false,
  className = "",
  language = "plaintext",

  highlighted = "",
  add = "",
  remove = "",
}: CodeProps) {
  const linesToMarkHighlighted = new Set(rangeParser(highlighted))
  const linesToMarkAdd = new Set(rangeParser(add))
  const linesToMarkRemove = new Set(rangeParser(remove))

  const tree = lowlight.highlight(language, children)
  const transformedTree = rehypeWrapLines(tree, (i) => {
    const shouldMarkHighlighted = linesToMarkHighlighted.has(i)
    const shouldMarkAdd = linesToMarkAdd.has(i)
    const shouldMarkRemove = linesToMarkRemove.has(i)

    return cn(
      "line",
      shouldMarkHighlighted && "highlighted bg-accent-a4",
      (shouldMarkAdd || shouldMarkRemove) && "diff",
      shouldMarkAdd && "add accent-theme-success bg-accent-a4",
      shouldMarkRemove && "remove accent-theme-danger bg-accent-a4"
    )
  })
  const content = hastToHtml(transformedTree)

  return (
    <>
      {isFenced && <CopyButton text={children} />}
      <code
        data-lang={language}
        className={cn(
          textVariants({
            variant: isFenced ? "small" : "xs",
          }),
          isFenced ? "p-2" : "px-1 py-0.25",
          "relative z-1 h-full w-full max-w-full border-1 border-stark-contrast/10 bg-muted/30",
          className
        )}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </>
  )
}
