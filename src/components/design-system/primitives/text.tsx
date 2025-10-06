"use client"

import React from "react"
import {
  TypographyVariantProps,
  typographyVariants,
} from "@/components/design-system/primitives/typography"
import { cn } from "@/lib/utils"
import { mergeProps } from "@base-ui-components/react/merge-props"
import { useRender } from "@base-ui-components/react/use-render"

interface TextProps extends useRender.ComponentProps<"p">, Omit<TypographyVariantProps, "variant"> {
  variant?: TypographyVariantProps["variant"]
  className?: string
}

const tagName = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",

  body: "p",
  nav: "p",

  small: "small",
  xs: "small",
} as const satisfies Record<NonNullable<TextProps["variant"]>, keyof React.JSX.IntrinsicElements>

export function Text({
  variant = "body",
  weight = undefined,
  className = "",
  render,
  ...props
}: TextProps) {
  const TagName = tagName[variant || "body"]

  return useRender({
    defaultTagName: TagName,
    render,
    props: mergeProps<typeof TagName>(
      { className: cn(typographyVariants({ variant, weight }), className) },
      props
    ),
  })
}

export function H1({ variant = "h1", render, ...props }: TextProps) {
  return <Text {...props} variant={variant} render={render || ((props) => <h1 {...props} />)} />
}

export function H2({ variant = "h2", render, ...props }: TextProps) {
  return <Text {...props} variant={variant} render={render || ((props) => <h2 {...props} />)} />
}

export function H3({ variant = "h3", render, ...props }: TextProps) {
  return <Text {...props} variant={variant} render={render || ((props) => <h3 {...props} />)} />
}

export function H4({ variant = "h4", render, ...props }: TextProps) {
  return <Text {...props} variant={variant} render={render || ((props) => <h4 {...props} />)} />
}

export function H5({ variant = "h5", render, ...props }: TextProps) {
  return <Text {...props} variant={variant} render={render || ((props) => <h5 {...props} />)} />
}

export function H6({ variant = "h6", render, ...props }: TextProps) {
  return <Text {...props} variant={variant} render={render || ((props) => <h6 {...props} />)} />
}

export function Paragraph({ variant = null, render, ...props }: TextProps) {
  return <Text {...props} variant={variant} render={render || ((props) => <p {...props} />)} />
}

export function Small({ variant = "small", render, ...props }: TextProps) {
  return <Text {...props} variant={variant} render={render || ((props) => <small {...props} />)} />
}
