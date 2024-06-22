import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import { Link } from "./link"

export const typographyVariants = cva("", {
  variants: {
    variant: {
      default: "",
      nav: "font-body text-lg font-medium tracking-wide md:text-xl lg:text-2xl",
      h1: "font-heading text-3xl font-semibold tracking-wider md:text-4xl lg:text-5xl",
      h2: "font-heading text-2xl font-semibold tracking-wide md:text-3xl lg:text-4xl",
      h3: "font-heading text-xl font-semibold tracking-wide md:text-2xl lg:text-3xl",
      h4: "font-heading text-lg font-semibold tracking-wide md:text-xl lg:text-2xl",
      h5: "font-heading text-base font-semibold tracking-wide md:text-lg lg:text-xl",
      h6: "font-heading text-sm font-semibold tracking-wide md:text-base lg:text-lg",
      body: "text-pretty font-body text-base tracking-wider antialiased md:text-lg lg:text-xl",
      small: "font-body text-xs md:text-sm lg:text-base",
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
  id: string
}
// TODO: implement this
export const AnchorHeading = React.forwardRef<HTMLHeadingElement, AnchorHeadingProps>(
  ({ as: asProp, id, className = "", children, ...props }, ref) => {
    return (
      <Heading as={asProp} id={id} variant={asProp} className={cn(className)} ref={ref} {...props}>
        <Link href={`#${id}`} className="anchor-link" isMonochrome>
          {children}
        </Link>
      </Heading>
    )
  }
)
AnchorHeading.displayName = "AnchorHeading"
