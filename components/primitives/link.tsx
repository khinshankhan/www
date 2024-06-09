import React, { type ReactNode } from "react"
import NextLink, { type LinkProps as NextLinkProps } from "next/link"
import { cva, VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

export const linkVariants = cva("", {
  variants: {
    variant: {
      default:
        "bg-gradient-to-r from-[hsl(var(--link-underline-off))] to-[hsl(var(--link-underline-off))] bg-subtle-underline bg-underline bg-no-repeat hover:from-[hsl(var(--link-underline))] hover:to-[hsl(var(--link-underline))] hover:bg-stark-underline",
      nav: "bg-gradient-to-r from-[hsl(var(--link-underline-off))] to-[hsl(var(--link-underline-off))] bg-link-hide bg-right-bottom bg-no-repeat transition-[color,background-size] duration-500 hover:bg-link-show hover:bg-left-bottom",
      none: "",
    },
    monochrome: {
      false: "text-[hsl(var(--link-underline))] hover:text-[hsl(var(--link-underline-off))]",
      true: "",
    },
  },
  defaultVariants: {
    variant: "default",
    monochrome: false,
  },
})

export type LinkVariants = VariantProps<typeof linkVariants>

interface LinkProps extends NextLinkProps, LinkVariants {
  className: string
  children: ReactNode
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    { href = "", variant = "default", monochrome = false, className = "", children, ...props },
    ref
  ) => {
    const classes = cn(linkVariants({ variant, monochrome, className }))
    // if href is a url obj it's a local link with state (probably), and / is totally local
    if (typeof href !== "string" || href.startsWith("/")) {
      return (
        <NextLink ref={ref} href={href} className={classes} {...props}>
          {children}
        </NextLink>
      )
    }

    // internal vs external link
    return (
      <a ref={ref} href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }
)
Link.displayName = "Link"
