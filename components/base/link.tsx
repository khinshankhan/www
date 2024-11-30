import React, { type ReactNode } from "react"
import NextLink, { type LinkProps as NextLinkProps } from "next/link"
import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"

export const linkVariants = cva("transition-[color] duration-500", {
  variants: {
    variant: {
      default:
        "bg-linear-to-r from-accent-11 to-accent-11 subtle-underline show-underline bg-no-repeat hover:from-accent-8 hover:to-accent-8 hover:drastic-underline",
      nav: "bg-linear-to-r from-accent-11 to-accent-11 link-hide bg-right-bottom bg-no-repeat transition-[color,background-size] hover:link-show hover:bg-left-bottom data-[active=true]:link-show data-[active=true]:bg-left-bottom",
      toc: "data-[active=true]:text-accent-11",
      none: "",
    },
    isMonochrome: {
      false: "hover:text-accent-11",
      true: "",
    },
  },
  defaultVariants: {
    variant: "default",
    isMonochrome: false,
  },
})

// prettier-ignore
export type LinkVariants = VariantProps<typeof linkVariants>

export interface LinkProps extends NextLinkProps, LinkVariants {
  className?: string
  children: ReactNode
  style?: React.CSSProperties
  icon?: ReactNode
}

export function Link({
  href = "",
  variant = "default",
  isMonochrome = false,
  className = "",
  children,
  icon = null,
  ...props
}: LinkProps) {
  const classes = cn(linkVariants({ variant, isMonochrome }), className)

  // if href is a url obj it's a local link with state (probably), and / is totally local
  if (typeof href !== "string" || href.startsWith("/")) {
    return (
      <NextLink href={href} className={classes} {...props}>
        {children}
        {icon}
      </NextLink>
    )
  }

  // # means same page so still relative but use a tag for browser based scrolling
  if (href.startsWith("#")) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
        {icon}
      </a>
    )
  }

  // exhaustively, we're left with only an external link
  return (
    <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
      {icon}
    </a>
  )
}
