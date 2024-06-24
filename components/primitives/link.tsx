import React, { type ReactNode } from "react"
import NextLink, { type LinkProps as NextLinkProps } from "next/link"
import { cva, VariantProps } from "class-variance-authority"
import { cn, isRelative, isUrlFile } from "@/lib/utils"
import { SvgIcon } from "@/components/primitives/svg-icon"

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

function VisualIcon({ isExternal, isFile }: { isExternal: boolean; isFile: boolean }) {
  if (isExternal) {
    return (
      <span className="inline-flex items-center">
        <SvgIcon id="arrow-up-right" className="inline size-4 pb-1" />
      </span>
    )
  }
  if (isFile) {
    return (
      <span className="inline-flex items-center">
        <SvgIcon id="arrow-down-tray" className="inline size-4 pt-1" />
      </span>
    )
  }

  return null
}

interface LinkProps extends NextLinkProps, LinkVariants {
  className?: string
  children: ReactNode
  // custom options to optimize or else calculated on the fly
  isInternal?: boolean
  isExternal?: boolean
  isFile?: boolean
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
      isFile: isFileProp = undefined,
      ...props
    },
    ref
  ) => {
    const classes = cn(linkVariants({ variant, isMonochrome, className }))

    const isExternal = (isInternalProp && !isInternalProp) ?? isExternalProp ?? !isRelative(href)
    const isFile = isFileProp ?? isUrlFile(href)

    // if href is a url obj it's a local link with state (probably), and / is totally local
    if (typeof href !== "string" || href.startsWith("/")) {
      return (
        <NextLink ref={ref} href={href} className={classes} {...props}>
          {children}
          <VisualIcon isExternal={false} isFile={isFile} />
        </NextLink>
      )
    }

    if (!isExternal) {
      return (
        <a ref={ref} href={href} className={classes} {...props}>
          {children}
          <VisualIcon isExternal={false} isFile={isFile} />
        </a>
      )
    }

    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
        <VisualIcon isExternal={true} isFile={isFile} />
      </a>
    )
  }
)
Link.displayName = "Link"
