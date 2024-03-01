import React, { type ReactNode } from "react"
import NextLink, { type LinkProps as NextLinkProps } from "next/link"
import { cva, VariantProps } from "class-variance-authority"

export const linkVariants = cva("", {
  variants: {
    variant: {
      /* animated link decorations
       *
       * initially link underline animation was based off https://tobiasahlin.com/blog/css-trick-animating-link-underlines/
       * however since (before:*) would break for multiple lines, new animation is based off the research danny did around
       * the issue https://www.dannyguo.com/blog/animated-multiline-link-underlines-with-css
       */
      default:
        "bg-gradient-to-l from-link-on to-link-on bg-link-hide bg-right-bottom bg-no-repeat text-link-base transition-[color,background-size] duration-500 hover:bg-link-show hover:bg-left-bottom hover:text-link-active",
      on: "bg-gradient-to-r from-link-base to-link-base bg-link-show bg-[0%_100%] bg-no-repeat text-link-on transition-[color,background-size] duration-500 hover:text-link-active",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export type LinkVariants = VariantProps<typeof linkVariants>

interface LinkProps extends NextLinkProps, LinkVariants {
  children: ReactNode
  className?: string
}

export function Link({ href, className, children, variant = "default", ...props }: LinkProps) {
  const classes = linkVariants({ variant, className })

  // if href is a url obj it's a local link with state (probably), and / is totally local
  if (typeof href !== "string" || href.startsWith("/")) {
    return (
      <NextLink href={href} className={classes} {...props}>
        {children}
      </NextLink>
    )
  }

  return (
    <a target="_blank" rel="noopener noreferrer" href={href} className={classes} {...props}>
      {children}
    </a>
  )
}
