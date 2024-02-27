import React, { type ReactNode } from "react"
import NextLink, { type LinkProps as NextLinkProps } from "next/link"
import { typographyVariants } from "./typography"

interface LinkProps extends NextLinkProps {
  children: ReactNode
  className?: string
  // styling mostly, provide default for possibly using link with other styling
  variant?: "link" | "link-on" | "default"
}

export function Link({ href, className, children, variant = "link", ...props }: LinkProps) {
  const classes = typographyVariants({ variant, className })

  // if href is a url obj it's a local link with state (probably), and / is totally local
  if (typeof href !== "string" || href.startsWith("/")) {
    return (
      <NextLink href={href} className={classes} {...props}>
        {children}
      </NextLink>
    )
  }

  return (
    <a target="_blank" rel="noopener noreferrer" href={href} className={classes} {...props}>
      {children}
    </a>
  )
}
