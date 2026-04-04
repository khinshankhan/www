"use client"

import React, { useEffect, useId, useState } from "react"
import { cn } from "@/quicksilver/lib/classname"
import { Code } from "./code"
import { Pre } from "./pre"

export interface MermaidDiagramProps extends React.ComponentPropsWithoutRef<"div"> {
  code: string
}

export function MermaidDiagram({ code, className = "", ...props }: MermaidDiagramProps) {
  const diagramId = useId().replace(/:/g, "-")
  const [svg, setSvg] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const state = { cancelled: false }

    void (async () => {
      try {
        const mermaid = (await import("mermaid")).default

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: "neutral",
        })

        const { svg: renderedSvg } = await mermaid.render(`mermaid-${diagramId}`, code)
        if (state.cancelled) {
          return
        }

        setSvg(renderedSvg)
        setError(null)
      } catch (renderError) {
        if (state.cancelled) {
          return
        }

        const message =
          renderError instanceof Error ? renderError.message : "Failed to render Mermaid diagram."
        setSvg(null)
        setError(message)
      }
    })()

    return () => {
      state.cancelled = true
    }
  }, [code, diagramId])

  if (error) {
    return (
      <div
        className={cn(
          "border-accent-theme-danger/20 bg-accent-theme-danger/5 text-sm mt-3 rounded-md border px-4 py-3 text-accent-11",
          className
        )}
        {...props}
      >
        {error}
      </div>
    )
  }

  if (!svg) {
    return (
      <div
        className={cn(
          "text-sm mt-3 rounded-md border border-stark-contrast/10 bg-muted/20 px-4 py-3 text-foreground-subtle",
          className
        )}
        {...props}
      >
        <div className="mb-3">Rendering diagram...</div>
        <Pre className="h-full w-full" textToCopy={code}>
          <Code allowCopy isFenced language="mermaid">
            {code}
          </Code>
        </Pre>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "mt-3 overflow-x-auto rounded-md border border-stark-contrast/10 bg-background-1/60 px-3 py-4",
        "[&_.label]:fill-foreground [&_.label]:text-foreground [&_.node_rect]:stroke-stark-contrast/20 [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full",
        className
      )}
      dangerouslySetInnerHTML={{ __html: svg }}
      {...props}
    />
  )
}
