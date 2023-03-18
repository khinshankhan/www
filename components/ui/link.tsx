import React, { type ReactNode } from "react"
import NextLink, { type LinkProps as NextLinkProps } from "next/link"

import * as url from "lib/utils/url"

import { ArrowDownTray, ArrowUpRight } from "components/icons"

function ExternalIcon() {
  return (
    <span className="align-super">
      <ArrowUpRight className="inline h-4 w-4" />
    </span>
  )
}

function FileIcon() {
  return (
    <span className="align-sub">
      <ArrowDownTray className="inline h-4 w-4" />
    </span>
  )
}

interface LinkProps extends NextLinkProps {
  isInternal?: boolean
  isExternal?: boolean
  isFile?: boolean
  className?: string
  children?: ReactNode
}

export function Link({
  href,
  isInternal: isInternalProp = undefined,
  isExternal: isExternalProp = undefined,
  isFile: isFileProp = undefined,
  children = "",
  ...props
}: LinkProps) {
  const isExternal = (isInternalProp && !isInternalProp) ?? isExternalProp ?? !url.isRelative(href)
  const isFile = isFileProp ?? url.isUrlFile(href)

  const VisualIcon = isExternal ? <ExternalIcon /> : isFile ? <FileIcon /> : null

  // if href is a url obj it's a local link with state (probably), and / is totally local
  if (typeof href !== "string" || href.startsWith("/")) {
    return (
      <NextLink href={href} {...props}>
        {children}
        {VisualIcon}
      </NextLink>
    )
  }

  // # means same page, but use normal anchor tag for smoother scroll
  // ideally the icon will be the anchor icon, however it'll have to be placed in the mdx logic to avoid adding the icon for toc
  if (href.startsWith("#")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  }

  // external link
  return (
    <a target="_blank" rel="noopener noreferrer" href={href} {...props}>
      {children}
      {VisualIcon}
    </a>
  )
}
