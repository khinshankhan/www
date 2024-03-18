import React, { type ReactNode } from "react"
import NextLink, { type LinkProps as NextLinkProps } from "next/link"
import { cva, VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

export const linkVariants = cva("", {
  variants: {
    variant: {
      default:
        "text-link-base transition-[color,background-size] duration-500 hover:text-link-active",
      on: "text-link-on transition-[color,background-size] duration-500 hover:text-link-active",
      disabled: "pointer-events-none text-muted-foreground",
    },
    nav: {
      /* animated nav link decorations
       *
       * initially link underline animation was based off https://tobiasahlin.com/blog/css-trick-animating-link-underlines/
       * however since (before:*) would break for multiple lines, new animation is based off the research danny did around
       * the issue https://www.dannyguo.com/blog/animated-multiline-link-underlines-with-css
       */
      false: "",
      true: "bg-gradient-to-l from-link-on to-link-on bg-link-hide bg-right-bottom bg-no-repeat transition-[color,background-size] duration-500 hover:bg-link-show hover:bg-left-bottom",
    },
    underline: {
      false: "",
      true: "animated-link",
    },
  },
  compoundVariants: [
    {
      variant: "on",
      nav: true,
      class: "bg-link-show bg-left-bottom",
    },
  ],
  defaultVariants: {
    variant: "default",
    nav: false,
    underline: true,
  },
})

export type LinkVariants = VariantProps<typeof linkVariants>

interface LinkProps extends NextLinkProps, LinkVariants {
  children: ReactNode
  className?: string
  // TODO: use these props
  // no idea why next link doesn't provide these props
  id?: string
  title?: string
  // for when you want to override the default variant but can only pass in via html props
  "data-nav"?: "true" | "false"
  "data-underline"?: "true" | "false"
}

export function Link({
  href,
  className,
  children,
  variant = "default",
  nav = false,
  underline = true,
  "data-nav": dataNav = "false",
  "data-underline": dataUnderline = "true",
  ...props
}: LinkProps) {
  const isNav = nav || dataNav === "true"
  const isUnderlined = underline && dataUnderline === "true"

  const classes = cn(linkVariants({ variant, nav: isNav, underline: isUnderlined, className }))

  // if href is a url obj it's a local link with state (probably), and / is totally local
  if (typeof href !== "string" || href.startsWith("/")) {
    return (
      <NextLink href={href} className={classes} {...props}>
        {children}
      </NextLink>
    )
  }

  if (typeof href !== "string" || href.startsWith("#")) {
    return (
      <a href={href} className={cn("anchor-link", classes)} {...props}>
        {children}
      </a>
    )
  }

  return (
    <a target="_blank" rel="noopener noreferrer" href={href} className={classes} {...props}>
      {children}
    </a>
  )
}
