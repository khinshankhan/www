import React from "react"
import { Download, SquareArrowOutUpRight } from "@/components/base/icon"
import { Link, type LinkProps } from "@/components/base/link"
import { cn, isFileLink, isInternalLink } from "@/lib/utils"

export interface SmartLinkProps extends LinkProps {
  hideIcon?: boolean
}

export function SmartLink({
  href = "",
  className = "",
  hideIcon = false,
  ...props
}: SmartLinkProps) {
  const isExternal = !isInternalLink(href)
  const isFile = isFileLink(href)

  if (!hideIcon && isExternal) {
    return (
      <Link
        href={href}
        className={cn(className, "relative pr-3")}
        icon={<SquareArrowOutUpRight className="absolute top-1 inline size-3" />}
        {...props}
      />
    )
  }

  if (!hideIcon && isFile) {
    return (
      <Link
        href={href}
        className={cn(className, "relative pr-3")}
        icon={<Download className="absolute bottom-1 inline size-3" />}
        {...props}
      />
    )
  }

  return <Link href={href} className={className} {...props} />
}
