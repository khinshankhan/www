import React from "react"
import { cn } from "@/lib/utils"
import { toHtml } from "hast-util-to-html"
import { all, createLowlight } from "lowlight"

const lowlight = createLowlight(all)

// prettier-ignore
export interface CodeProps extends React.ComponentPropsWithRef<"code"> {
  children: string
  language?: string
}

export function Code({ children, language = "plaintext", className = "" }: CodeProps) {
  const tree = lowlight.highlight(language, children)

  return (
    <code
      className={cn(
        "rounded-md border border-muted bg-muted/30 px-1 py-0.25 text-sm md:text-base lg:text-xl",
        className
      )}
      dangerouslySetInnerHTML={{ __html: toHtml(tree) }}
    />
  )
}
