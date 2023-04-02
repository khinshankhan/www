import React, { type ReactNode } from "react"
import NextLink, { type LinkProps as NextLinkProps } from "next/link"
import { isRelative, isUrlFile } from "@/lib/utils"
import { ArrowDownTray, ArrowUpRight } from "@/components/icons"
import { typographyVariants } from "./typography"

function ExternalIcon() {
  return (
    <span className="inline-flex items-center">
      <ArrowUpRight className="inline h-4 w-4 pb-1" />
    </span>
  )
}

function FileIcon() {
  return (
    <span className="inline-flex items-center">
      <ArrowDownTray className="inline h-4 w-4 pt-1" />
    </span>
  )
}

interface LinkProps extends NextLinkProps {
  isInternal?: boolean
  isExternal?: boolean
  isFile?: boolean
  className?: string
  variant?: "link" | "link-on"
  children?: ReactNode
}

export function Link({
  href,
  isInternal: isInternalProp = undefined,
  isExternal: isExternalProp = undefined,
  isFile: isFileProp = undefined,
  className,
  children = "",
  variant = "link",
  ...props
}: LinkProps) {
  const isExternal = (isInternalProp && !isInternalProp) ?? isExternalProp ?? !isRelative(href)
  const isFile = isFileProp ?? isUrlFile(href)

  const VisualIcon = isExternal ? <ExternalIcon /> : isFile ? <FileIcon /> : null

  const classes = typographyVariants({ variant, className })

  // if href is a url obj it's a local link with state (probably), and / is totally local
  if (typeof href !== "string" || href.startsWith("/")) {
    return (
      <NextLink href={href} className={classes} {...props}>
        {children}
        {VisualIcon}
      </NextLink>
    )
  }

  // # means same page, but use normal anchor tag for smoother scroll
  // ideally the icon will be the anchor icon, however it'll have to be placed in the mdx logic to avoid adding the icon for toc
  if (href.startsWith("#")) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  // external link
  return (
    <a target="_blank" rel="noopener noreferrer" href={href} className={classes} {...props}>
      {children}
      {VisualIcon}
    </a>
  )
}
