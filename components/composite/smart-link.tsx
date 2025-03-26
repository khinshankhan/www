import React from "react"
import { Download, SquareArrowOutUpRight } from "@/components/base/icon"
import { Link, type LinkProps } from "@/components/base/link"
import { isFileLink, isInternalLink } from "@/lib/utils"

export interface SmartLinkProps extends LinkProps {
  hideIcon?: boolean
}

export function SmartLink({ href = "", hideIcon = false, ...props }: SmartLinkProps) {
  const isExternal = !isInternalLink(href)
  const isFile = isFileLink(href)

  if (!hideIcon && isExternal) {
    return (
      <Link
        href={href}
        icon={<SquareArrowOutUpRight className="inline size-3 align-top" />}
        {...props}
      />
    )
  }

  if (!hideIcon && isFile) {
    return (
      <Link href={href} icon={<Download className="inline size-3 align-middle" />} {...props} />
    )
  }

  return <Link href={href} {...props} />
}
