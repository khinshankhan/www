import React from "react"
import rehypeWrapLines from "@/lib/syntax/plugins/rehype-wrap-lines"
import { cn } from "@/quicksilver/lib/classname"
import { toHtml as hastToHtml } from "hast-util-to-html"
import { all, createLowlight } from "lowlight"
import rangeParser from "parse-numeric-range"
import { textVariants } from "./text.variants"

const lowlight = createLowlight(all)

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
    <code
      data-lang={language}
      className={cn(
        textVariants({
          variant: isFenced ? "small" : "xs",
        }),
        "relative z-2 rounded-md border-1 border-stark-contrast/10 bg-muted/30 px-1 py-0.25",
        "before:border-0.25 noise before:-z-1 before:rounded-md",
        className
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
