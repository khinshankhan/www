import React from "react"
import { cn } from "@/quicksilver/lib/classname"
import katex from "katex"
import { CopyButton } from "./code"

export interface LatexBlockProps extends React.ComponentPropsWithoutRef<"div"> {
  code: string
}

const renderedShellClassName =
  "relative my-4 overflow-hidden rounded-md border border-stark-contrast/10 bg-background-1/60 isolate"

export function LatexBlock({ code, className = "", ...props }: LatexBlockProps) {
  const html = katex.renderToString(code, {
    displayMode: true,
    throwOnError: false,
  })

  return (
    <div
      className={cn(renderedShellClassName, className)}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 z-2">
        <CopyButton className="pointer-events-auto" text={code} />
      </div>
      <div className="overflow-x-auto px-3 py-4">
        <div className="relative z-0" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  )
}
