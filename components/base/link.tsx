import React, { type ReactNode } from "react"
import NextLink, { type LinkProps as NextLinkProps } from "next/link"
import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"

export const linkVariants = cva("transition-[color] duration-500", {
  variants: {
    variant: {
      default:
        "link-drastic-underline-on-hover bg-gradient-to-r from-[var(--link-border)] to-[var(--link-border)] bg-no-repeat hover:from-[var(--link-border-active)] hover:to-[var(--link-border-active)]",
      nav: "link-reveal-on-hover data-[active=true]:bg-link-show bg-gradient-to-r from-[var(--link-border)] to-[var(--link-border)] bg-right-bottom bg-no-repeat transition-[color,background-size] hover:bg-left-bottom data-[active=true]:bg-left-bottom",
      toc: "data-[active=true]:text-[var(--link-border)]",
      none: "",
    },
    isMonochrome: {
      false: "hover:text-[var(--link-border)]",
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
  style = {},
  icon = null,
  ...props
}: LinkProps) {
  const classes = cn(linkVariants({ variant, isMonochrome }), className)
  const styles = {
    "--link-border": "var(--color-accent-link)",
    "--link-border-active": "var(--color-accent-8)",
    ...style,
  } as React.CSSProperties

  // if href is a url obj it's a local link with state (probably), and / is totally local
  if (typeof href !== "string" || href.startsWith("/")) {
    return (
      <NextLink href={href} className={classes} style={styles} {...props}>
        {children}
        {icon}
      </NextLink>
    )
  }

  // # means same page so still relative but use a tag for browser based scrolling
  if (href.startsWith("#")) {
    return (
      <a href={href} className={classes} style={styles} {...props}>
        {children}
        {icon}
      </a>
    )
  }

  // exhaustively, we're left with only an external link
  return (
    <a
      href={href}
      className={classes}
      style={styles}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
      {icon}
    </a>
  )
}
