import React from "react"
import { cn } from "@/quicksilver/lib/classname"
import { mermaidLanguage } from "@/quicksilver/lib/syntax/languages/mermaid"
import rehypeWrapLines from "@/quicksilver/lib/syntax/plugins/rehype-wrap-lines"
import { CopyButton } from "@/quicksilver/react/patterns/actions/copy-button"
import { toHtml as hastToHtml } from "hast-util-to-html"
import { all, createLowlight } from "lowlight"
import rangeParser from "parse-numeric-range"

const lowlight = createLowlight(all)

lowlight.register({ mermaid: mermaidLanguage })

export interface CodeProps extends React.ComponentPropsWithRef<"code"> {
  children: string
  isFenced?: boolean
  language?: string

  highlighted?: string
  add?: string
  remove?: string

  allowCopy?: boolean
}

export function Code({
  children,
  isFenced = false,
  className,
  language = "plaintext",

  highlighted = "",
  add = "",
  remove = "",

  allowCopy = false,
  ...props
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
      {allowCopy && isFenced && <CopyButton text={children} />}
      <code
        data-fenced={isFenced}
        data-lang={language}
        className={cn(
          "font-mono",
          isFenced
            ? "p-2 text-14 md:text-16 lg:text-18"
            : "px-1 py-0.25 text-12 md:text-14 lg:text-16",
          "relative z-1 h-full w-full max-w-full border-1 border-stark-contrast/10 bg-muted/30",
          className
        )}
        dangerouslySetInnerHTML={{ __html: content }}
        {...props}
      />
    </>
  )
}
