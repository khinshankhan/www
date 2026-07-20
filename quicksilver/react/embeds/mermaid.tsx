"use client"

import React, { useEffect, useId, useMemo, useState } from "react"
import { useDocumentTheme } from "@/quicksilver/hooks/use-document-theme"
import { cn } from "@/quicksilver/lib/classname"
import {
  resolveCssColor,
  resolveEmbedShellBackground,
  type DocumentTheme,
} from "@/quicksilver/lib/color"
import { CopyButton } from "@/quicksilver/react/patterns/actions/copy-button"

export interface MermaidDiagramProps extends React.ComponentPropsWithoutRef<"div"> {
  code: string
  description: string
  title: string
}

const renderedShellClassName =
  "relative my-4 overflow-hidden rounded-md border border-stark-contrast/10 bg-background-1/60 isolate"
const mermaidViewportClassName =
  "min-h-[28rem] overflow-x-auto px-3 py-4 flex items-center justify-center"

function enhanceSvgAccessibility({
  edgeLabelMaskColor,
  description,
  descriptionId,
  svg,
  title,
  titleId,
}: {
  edgeLabelMaskColor: string
  description: string
  descriptionId: string
  svg: string
  title: string
  titleId: string
}) {
  if (typeof DOMParser === "undefined" || typeof XMLSerializer === "undefined") {
    return svg
  }

  const parsed = new DOMParser().parseFromString(svg, "image/svg+xml")
  const root = parsed.documentElement

  if (root.nodeName.toLowerCase() !== "svg") {
    return svg
  }

  root.setAttribute("role", "img")
  root.setAttribute("focusable", "false")
  root.setAttribute("aria-labelledby", titleId)
  root.setAttribute("aria-describedby", descriptionId)

  for (const node of root.querySelectorAll("title, desc")) {
    node.remove()
  }

  const titleNode = parsed.createElementNS("http://www.w3.org/2000/svg", "title")
  titleNode.setAttribute("id", titleId)
  titleNode.textContent = title
  root.insertBefore(titleNode, root.firstChild)

  const descriptionNode = parsed.createElementNS("http://www.w3.org/2000/svg", "desc")
  descriptionNode.setAttribute("id", descriptionId)
  descriptionNode.textContent = description
  root.insertBefore(descriptionNode, titleNode.nextSibling)

  for (const node of root.querySelectorAll(".edgeLabel .labelBkg, .labelBkg")) {
    const existingStyle = node.getAttribute("style") ?? ""
    node.setAttribute(
      "style",
      `${existingStyle}; background: ${edgeLabelMaskColor} !important; background-color: ${edgeLabelMaskColor} !important; border: none !important; box-shadow: none !important;`
    )
  }

  for (const node of root.querySelectorAll(
    ".edgeLabel, .edgeLabel p, .edgeLabel span, .edgeLabel foreignObject"
  )) {
    const existingStyle = node.getAttribute("style") ?? ""
    node.setAttribute(
      "style",
      `${existingStyle}; background: ${edgeLabelMaskColor} !important; background-color: ${edgeLabelMaskColor} !important; border: none !important; box-shadow: none !important;`
    )
  }

  const styleNode = parsed.createElementNS("http://www.w3.org/2000/svg", "style")
  styleNode.textContent = `
    .edgeLabel .labelBkg,
    .edgeLabel rect,
    .labelBkg {
      fill: ${edgeLabelMaskColor} !important;
      stroke: none !important;
    }

    .edgeLabel,
    .edgeLabel p,
    .edgeLabel span,
    .edgeLabel foreignObject {
      background: ${edgeLabelMaskColor} !important;
      background-color: ${edgeLabelMaskColor} !important;
    }
  `
  root.insertBefore(styleNode, descriptionNode.nextSibling)

  return new XMLSerializer().serializeToString(root)
}

function resolveMermaidThemeVariables(theme: DocumentTheme) {
  const shellBackground = resolveEmbedShellBackground(theme)

  return {
    background: shellBackground,
    cScale0: resolveCssColor("var(--color-surface-3)", "#f2f2f2"),
    cScale1: resolveCssColor("var(--color-accent-4)", "#e7e7ff"),
    cScale2: resolveCssColor("var(--color-surface-4)", "#e9e9e9"),
    cScale3: resolveCssColor("var(--color-accent-5)", "#dddfff"),
    clusterBkg: resolveCssColor("var(--color-surface-3)", "#f2f2f2"),
    clusterBorder: resolveCssColor("var(--color-surface-7)", "#b8b8c2"),
    edgeLabelBackground: shellBackground,
    fontFamily: "inherit",
    lineColor: resolveCssColor("var(--color-surface-8)", "#8b8b96"),
    mainBkg: resolveCssColor("var(--color-surface-3)", "#f2f2f2"),
    nodeBorder: resolveCssColor("var(--color-surface-7)", "#b8b8c2"),
    nodeTextColor: resolveCssColor("var(--color-foreground-strong)", "#111111"),
    primaryBorderColor: resolveCssColor("var(--color-surface-7)", "#b8b8c2"),
    primaryColor: resolveCssColor("var(--color-accent-4)", "#e7e7ff"),
    primaryTextColor: resolveCssColor("var(--color-foreground-strong)", "#111111"),
    secondaryBorderColor: resolveCssColor("var(--color-surface-7)", "#b8b8c2"),
    secondaryColor: resolveCssColor("var(--color-surface-4)", "#e9e9e9"),
    secondaryTextColor: resolveCssColor("var(--color-foreground-strong)", "#111111"),
    tertiaryBorderColor: resolveCssColor("var(--color-surface-7)", "#b8b8c2"),
    tertiaryColor: resolveCssColor("var(--color-surface-5)", "#dddddd"),
    tertiaryTextColor: resolveCssColor("var(--color-foreground-strong)", "#111111"),
    textColor: resolveCssColor("var(--color-foreground-strong)", "#111111"),
  }
}

export function MermaidDiagram({
  code,
  className,
  description,
  title,
  ...props
}: MermaidDiagramProps) {
  const diagramId = useId().replace(/:/g, "-")
  const accessibleTitleId = `${diagramId}-title`
  const accessibleDescriptionId = `${diagramId}-description`
  const [svg, setSvg] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const theme = useDocumentTheme()

  const edgeLabelMaskColor = useMemo(() => resolveEmbedShellBackground(theme), [theme])
  const themeVariables = useMemo(() => resolveMermaidThemeVariables(theme), [theme])

  useEffect(() => {
    const state = { cancelled: false }

    void (async () => {
      try {
        const mermaid = (await import("mermaid")).default

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: "base",
          themeVariables,
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
  }, [code, diagramId, themeVariables])
  const accessibleSvg = useMemo(() => {
    if (!svg) {
      return null
    }

    return enhanceSvgAccessibility({
      edgeLabelMaskColor,
      description,
      descriptionId: accessibleDescriptionId,
      svg,
      title,
      titleId: accessibleTitleId,
    })
  }, [accessibleDescriptionId, accessibleTitleId, description, edgeLabelMaskColor, svg, title])

  if (error) {
    return (
      <div
        className={cn(
          "border-accent-theme-danger/20 bg-accent-theme-danger/5 mt-3 rounded-md border px-4 py-3 text-14 text-accent-11",
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
      <div className={cn(renderedShellClassName, className)} {...props}>
        <div className="pointer-events-none absolute inset-0 z-2">
          <CopyButton className="pointer-events-auto" text={code} />
        </div>
        <div
          className={cn(
            mermaidViewportClassName,
            "flex items-center justify-center text-14 text-foreground-subtle"
          )}
        >
          Rendering diagram...
        </div>
      </div>
    )
  }

  return (
    <div className={cn(renderedShellClassName, className)} {...props}>
      <div className="pointer-events-none absolute inset-0 z-2">
        <CopyButton className="pointer-events-auto" text={code} />
      </div>
      <div className={mermaidViewportClassName}>
        <div
          className="mermaid-diagram relative z-0 flex justify-center [&_.label]:fill-foreground [&_.label]:text-foreground [&_.node_rect]:stroke-stark-contrast/20 [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full"
          dangerouslySetInnerHTML={{ __html: accessibleSvg ?? "" }}
        />
      </div>
    </div>
  )
}
