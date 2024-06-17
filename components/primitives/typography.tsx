import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import { Link } from "./link"

export const typographyVariants = cva("", {
  variants: {
    variant: {
      default: "",
      h1: "text-balance text-5xl font-bold",
      h2: "text-3xl font-bold",
      h3: "text-2xl font-semibold",
      h4: "text-xl font-medium",
      h5: "text-lg font-medium",
      h6: "text-base font-medium",
      body: "text-base",
      small: "text-sm",
      caption: "text-xs",
      nav: "text-2xl font-semibold tracking-wider",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export type TypographyVariants = VariantProps<typeof typographyVariants>

export interface TextProps extends React.HTMLAttributes<HTMLSpanElement>, TypographyVariants {
  asChild?: boolean
}

export const Text = React.forwardRef<HTMLSpanElement, TextProps>(
  ({ className = "", variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "span"
    return <Comp className={cn(typographyVariants({ variant, className }))} ref={ref} {...props} />
  }
)
Text.displayName = "Text"

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement>, TypographyVariants {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  asChild?: boolean
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className = "", variant, as: asProp = "h1", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : asProp
    return <Comp className={cn(typographyVariants({ variant, className }))} ref={ref} {...props} />
  }
)
Heading.displayName = "Heading"

interface AnchorHeadingProps extends HeadingProps {
  href: string
}
// TODO: implement this
export const AnchorHeading = React.forwardRef<HTMLHeadingElement, AnchorHeadingProps>(
  ({ href, className = "", children, ...props }, ref) => {
    return (
      <Heading className={cn(className)} ref={ref} {...props}>
        <Link href={href} className="anchor-link text-xl" isMonochrome>
          {children}
        </Link>
      </Heading>
    )
  }
)
AnchorHeading.displayName = "AnchorHeading"
