import React, { type ReactNode } from "react"
import NextLink, { type LinkProps as NextLinkProps } from "next/link"
import { cva, VariantProps } from "class-variance-authority"
import { cn, isRelative } from "@/lib/utils"

export const linkVariants = cva("transition-[color] duration-500", {
  variants: {
    variant: {
      default:
        "bg-gradient-to-r from-[hsl(var(--link-border))] to-[hsl(var(--link-border))] bg-subtle-underline bg-underline bg-no-repeat hover:from-[hsl(var(--link-border-active))] hover:to-[hsl(var(--link-border-active))] hover:bg-stark-underline",
      nav: "bg-gradient-to-r from-[hsl(var(--link-border))] to-[hsl(var(--link-border))] bg-link-hide bg-right-bottom bg-no-repeat transition-[color,background-size] hover:bg-link-show hover:bg-left-bottom data-[active=true]:bg-link-show data-[active=true]:bg-left-bottom",
      toc: "data-[active=true]:text-[hsl(var(--link-border))]",
      none: "",
    },
    isMonochrome: {
      false: "hover:text-[hsl(var(--link-border))]",
      true: "",
    },
  },
  defaultVariants: {
    variant: "default",
    isMonochrome: false,
  },
})

export type LinkVariants = VariantProps<typeof linkVariants>

interface LinkProps extends NextLinkProps, LinkVariants {
  className?: string
  children: ReactNode
  // custom options to optimize or else calculated on the fly
  isInternal?: boolean
  isExternal?: boolean
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      href = "",
      variant = "default",
      isMonochrome = false,
      className = "",
      children,
      isInternal: isInternalProp = undefined,
      isExternal: isExternalProp = undefined,
      ...props
    },
    ref
  ) => {
    const classes = cn(linkVariants({ variant, isMonochrome, className }))

    const isExternal = (isInternalProp && !isInternalProp) ?? isExternalProp ?? !isRelative(href)

    // if href is a url obj it's a local link with state (probably), and / is totally local
    if (typeof href !== "string" || href.startsWith("/")) {
      return (
        <NextLink ref={ref} href={href} className={classes} {...props}>
          {children}
        </NextLink>
      )
    }

    if (!isExternal) {
      return (
        <a ref={ref} href={href} className={classes} {...props}>
          {children}
        </a>
      )
    }

    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    )
  }
)
Link.displayName = "Link"
