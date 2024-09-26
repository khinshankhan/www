import React from "react"
import { toHtml as hastToHtml } from "hast-util-to-html"
import rangeParser from "parse-numeric-range"
import bash from "refractor/lang/bash"
import diff from "refractor/lang/diff"
import go from "refractor/lang/go"
import graphql from "refractor/lang/graphql"
import ini from "refractor/lang/ini"
import javascript from "refractor/lang/javascript"
import json from "refractor/lang/json"
import jsx from "refractor/lang/jsx"
import lisp from "refractor/lang/lisp"
import markdown from "refractor/lang/markdown"
import markup from "refractor/lang/markup"
import ruby from "refractor/lang/ruby"
import tsx from "refractor/lang/tsx"
import typescript from "refractor/lang/typescript"
import { refractor } from "refractor/lib/core"
import conf from "@/lib/syntax/lang/conf"
import css from "@/lib/syntax/lang/css"
import rehypeWrapLines from "@/lib/syntax/plugins/rehype-wrap-lines"
import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import { typographyVariants } from "@/components/primitives/typography"

refractor.register(markup)
refractor.register(css)
refractor.register(javascript)
refractor.register(bash)
refractor.register(markdown)
refractor.register(ruby)
refractor.register(diff)
refractor.register(go)
refractor.register(graphql)
refractor.register(json)
refractor.register(ini)
refractor.register(conf)
refractor.register(typescript)
refractor.register(lisp)
refractor.register(jsx)
refractor.register(tsx)

export interface CodeProps extends React.ComponentPropsWithoutRef<"code"> {
  children: string
  language: string

  highlighted?: string
  add?: string
  remove?: string
}

export async function Code({
  children,
  className = "",
  language = "plaintext",

  highlighted = "",
  add = "",
  remove = "",

  ...props
}: CodeProps) {
  const linesToMarkHighlighted = new Set(rangeParser(highlighted))
  const linesToMarkAdd = new Set(rangeParser(add))
  const linesToMarkRemove = new Set(rangeParser(remove))

  const tree = refractor.highlight(children, language)
  const transformedTree = rehypeWrapLines(
    // @ts-expect-error: there's a slight type mismatch between refractor tree and hast tree but it works
    tree,
    (i) => {
      const shouldMarkHighlighted = linesToMarkHighlighted.has(i)
      const shouldMarkAdd = linesToMarkAdd.has(i)
      const shouldMarkRemove = linesToMarkRemove.has(i)

      return cn(
        "line",
        shouldMarkHighlighted && "highlighted",
        (shouldMarkAdd || shouldMarkRemove) && "diff",
        shouldMarkAdd && "add",
        shouldMarkRemove && "remove"
      )
    }
  )
  const content = hastToHtml(transformedTree)

  return (
    <code
      suppressHydrationWarning
      className={cn(typographyVariants({ variant: "small" }), "font-mono", className)}
      dangerouslySetInnerHTML={{ __html: content }}
      {...props}
    ></code>
  )
}

export interface PreProps extends React.ComponentPropsWithoutRef<"pre"> {
  showLineNumbers?: boolean
  start?: string | number

  highlighted?: string
  add?: string
  remove?: string
}

export async function Pre({
  children,
  showLineNumbers = false,
  start = 1,
  style = {},
  className = "",

  highlighted = "",
  add = "",
  remove = "",

  ...props
}: PreProps) {
  return (
    <pre
      className={className}
      data-show-lines={showLineNumbers ? "true" : "false"}
      style={{
        ...style,
        ["--start" as any]: start,
      }}
      {...props}
    >
      {/* @ts-expect-error: total hack to pass props down */}
      <Slot highlighted={highlighted} add={add} remove={remove}>
        {children}
      </Slot>
    </pre>
  )
}
