import React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"

export const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "font-heading text-3xl font-semibold tracking-wider md:text-4xl lg:text-5xl",
      h2: "font-heading text-2xl font-semibold tracking-wide md:text-3xl lg:text-4xl",
      h3: "font-heading text-xl font-semibold tracking-wide md:text-2xl lg:text-3xl",
      h4: "font-heading text-lg font-semibold tracking-wide md:text-xl lg:text-2xl",
      h5: "font-heading text-base font-semibold tracking-wide md:text-lg lg:text-xl",
      h6: "font-heading text-sm font-semibold tracking-wide md:text-base lg:text-lg",
      p: "text-pretty font-body text-lg tracking-wider antialiased md:text-xl lg:text-2xl",
      small: "font-body text-sm md:text-base lg:text-xl",
      xs: "font-body text-xs md:text-sm lg:text-base",
      nav: "font-body text-lg font-medium tracking-wide md:text-xl lg:text-2xl",
    },
    weight: {
      thin: "font-thin",
      extralight: "font-extralight",
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
      black: "font-black",
    },
  },
  defaultVariants: {
    variant: "p",
    weight: null,
  },
})

// prettier-ignore
type TypographyVariants = VariantProps<typeof typographyVariants>

export function Heading({
  asChild = false,
  as: Tag = "h1",
  variant = undefined,
  className = "",
  children,
}: {
  asChild?: boolean
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  className?: string
  children: React.ReactNode
} & TypographyVariants) {
  const Comp = asChild ? Slot : Tag
  // NOTE: Tag is guaranteed to be a subset of typographyVariants
  const calculatedVariant = variant ?? Tag

  return (
    <Comp className={cn(typographyVariants({ variant: calculatedVariant, className }))}>
      {children}
    </Comp>
  )
}

export function Text({
  asChild = false,
  as: Tag = "p",
  variant = "p",
  className = "",
  children,
}: {
  asChild?: boolean
  as?: keyof HTMLElementTagNameMap
  className?: string
  children: React.ReactNode
} & TypographyVariants) {
  const Comp = asChild ? Slot : Tag

  return <Comp className={cn(typographyVariants({ variant, className }))}>{children}</Comp>
}

export function Strong({
  asChild = false,
  as: Tag = "strong",
  className = "",
  children,
}: {
  asChild?: boolean
  as?: keyof HTMLElementTagNameMap
  className?: string
  children: React.ReactNode
}) {
  const Comp = asChild ? Slot : Tag

  return <Comp className={cn("font-bold", className)}>{children}</Comp>
}
