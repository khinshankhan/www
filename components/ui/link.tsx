import React, { type ReactNode } from "react"
import NextLink, { type LinkProps as NextLinkProps } from "next/link"

interface LinkProps extends NextLinkProps {
  className?: string
  children: ReactNode
}

export function Link({ children, ...props }: LinkProps) {
  return <NextLink {...props}>{children}</NextLink>
}
