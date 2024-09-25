import React from "react"
import { toHtml as hastToHtml } from "hast-util-to-html"
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
import { cn } from "@/lib/utils"
import { typographyVariants } from "@/components/primitives/typography"

;[
  bash,
  conf,
  css,
  diff,
  go,
  graphql,
  ini,
  javascript,
  json,
  jsx,
  lisp,
  markdown,
  markup,
  ruby,
  tsx,
  typescript,
].forEach(refractor.register)

export interface CodeProps extends React.ComponentPropsWithoutRef<"code"> {
  children: string
  language: string
}

export async function Code({
  children,
  language = "plaintext",
  className = "",
  ...props
}: CodeProps) {
  const tree = refractor.highlight(children, language)
  // @ts-expect-error: there's a slight type mismatch between refractor tree and hast tree but it works
  const content = hastToHtml(tree)

  return (
    <code
      suppressHydrationWarning
      className={cn(
        typographyVariants({ variant: "small" }),
        "rounded-lg bg-muted px-1 py-0.5 text-content-foreground",
        className
      )}
      dangerouslySetInnerHTML={{ __html: content }}
      {...props}
    ></code>
  )
}

export interface PreProps extends React.ComponentPropsWithoutRef<"pre"> {
  showLineNumbers?: boolean
  start?: string | number
}

export async function Pre({
  children,
  showLineNumbers = false,
  start = 1,
  style = {},
  className = "",
  ...props
}: PreProps) {
  return (
    <pre
      className={cn(
        typographyVariants({ variant: "small" }),
        "size-full whitespace-pre rounded-lg bg-accent p-4 text-content-foreground [&>code]:contents",
        className
      )}
      data-lines={showLineNumbers ? "true" : "false"}
      style={{
        ...style,
        ["--start" as any]: start,
      }}
      {...props}
    >
      {children}
    </pre>
  )
}
