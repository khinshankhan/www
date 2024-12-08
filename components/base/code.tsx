import React from "react"
import rehypeWrapLines from "@/lib/syntax/plugins/rehype-wrap-lines"
import { cn } from "@/lib/utils"
import { toHtml as hastToHtml } from "hast-util-to-html"
import { all, createLowlight } from "lowlight"
import rangeParser from "parse-numeric-range"

const lowlight = createLowlight(all)

// prettier-ignore
export interface CodeProps extends React.ComponentPropsWithRef<"code"> {
  children: string
  language?: string

  highlighted?: string
  add?: string
  remove?: string
}

export function Code({
  children,
  className = "",
  language = "plaintext",

  highlighted = "",
  add = "",
  remove = "",
}: CodeProps) {
  console.log({ highlighted, add, remove })

  const linesToMarkHighlighted = new Set(rangeParser(highlighted))
  const linesToMarkAdd = new Set(rangeParser(add))
  const linesToMarkRemove = new Set(rangeParser(remove))

  const tree = lowlight.highlight(language, children)
  const transformedTree = rehypeWrapLines(tree, (i) => {
    const shouldMarkHighlighted = linesToMarkHighlighted.has(i)
    const shouldMarkAdd = linesToMarkAdd.has(i)
    const shouldMarkRemove = linesToMarkRemove.has(i)

    return cn(
      "line block",
      shouldMarkHighlighted && "highlighted bg-accent-a4",
      (shouldMarkAdd || shouldMarkRemove) && "diff",
      shouldMarkAdd && "add success-theme bg-accent-a4",
      shouldMarkRemove && "remove danger-theme bg-accent-a4"
    )
  })
  const content = hastToHtml(transformedTree)

  return (
    <code
      className={cn(
        "rounded-md border border-muted bg-muted/30 px-1 py-0.25 text-sm md:text-base lg:text-xl",
        className
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
