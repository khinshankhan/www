import React, { Fragment } from "react"
import { jsx, jsxs } from "react/jsx-runtime"
import { toJsxRuntime } from "hast-util-to-jsx-runtime"
import { createHighlighter } from "shiki"
import { createCssVariablesTheme } from "shiki/core"
import { cn } from "@/lib/utils"
import { typographyVariants } from "@/components/primitives/typography"

const myTheme = createCssVariablesTheme({
  name: "css-variables",
  variablePrefix: "--shiki-",
  variableDefaults: {},
  fontStyle: true,
})

const highlighter = createHighlighter({
  // perhaps autogenerate this list of langs?
  langs: [
    "js",
    "ts",
    "jsx",
    "tsx",
    "css",
    "html",
    "json",
    "yaml",
    "markdown",
    "ini",
    "shell",
    "bash",
    "plaintext",
    "go",
  ],
  // register the theme
  themes: [myTheme],
})

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
  const highlighterInstance = await highlighter
  const out = highlighterInstance.codeToHast(children.trim(), {
    lang: language,
    theme: "css-variables",
  })

  return (
    <code
      suppressHydrationWarning
      className={cn(
        typographyVariants({ variant: "small" }),
        "rounded-lg bg-muted px-1 py-0.5 text-content-foreground",
        className
      )}
      {...props}
    >
      {toJsxRuntime(out, {
        Fragment,
        // @ts-expect-error: trust https://shiki.style/packages/next#custom-components
        jsx: jsx,
        // @ts-expect-error: trust https://shiki.style/packages/next#custom-components
        jsxs: jsxs,
        components: {
          // @ts-expect-error: trust https://shiki.style/packages/next#custom-components
          pre: (props) => props.children,
          // @ts-expect-error: trust https://shiki.style/packages/next#custom-components
          code: (props) => props.children,
        },
      })}
    </code>
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
  ...props
}: PreProps) {
  return (
    <pre
      className={cn(
        typographyVariants({ variant: "small" }),
        "size-full whitespace-pre rounded-lg bg-accent p-4 text-content-foreground [&>code]:contents"
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
