import React from "react"
import { cn } from "@/quicksilver/lib/classname"
import katex from "katex"

export interface LatexBlockProps extends React.ComponentPropsWithoutRef<"div"> {
  code: string
}

export function LatexBlock({ code, className = "", ...props }: LatexBlockProps) {
  const html = katex.renderToString(code, {
    displayMode: true,
    throwOnError: false,
  })

  return (
    <div
      className={cn(
        "my-4 overflow-x-auto rounded-md border border-stark-contrast/10 bg-background-1/60 px-4 py-5",
        className
      )}
      dangerouslySetInnerHTML={{ __html: html }}
      {...props}
    />
  )
}
