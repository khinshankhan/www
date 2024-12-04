import React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"

export const typographyVariants = cva("", {
  variants: {
    variant: {
      body: "font-body text-lg tracking-wider text-pretty antialiased md:text-xl lg:text-2xl",
      h1: "font-heading text-3xl font-semibold tracking-wider md:text-4xl lg:text-5xl",
      h2: "font-heading text-2xl font-semibold tracking-wide md:text-3xl lg:text-4xl",
      h3: "font-heading text-xl font-semibold tracking-wide md:text-2xl lg:text-3xl",
      h4: "font-heading text-lg font-semibold tracking-wide md:text-xl lg:text-2xl",
      h5: "font-heading text-base font-semibold tracking-wide md:text-lg lg:text-xl",
      h6: "font-heading text-sm font-semibold tracking-wide md:text-base lg:text-lg",
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
    variant: null,
    weight: null,
  },
})

type TypographyVariants = VariantProps<typeof typographyVariants>

type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  asChild?: boolean
  className?: string
  children: React.ReactNode
} & TypographyVariants &
  // prettier-ignore
  React.HTMLAttributes<HTMLHeadingElement>

export function Heading({
  as: Tag,
  asChild = false,
  variant = undefined,
  weight = null,
  className = "",
  children,
  ...props
}: HeadingProps) {
  const Comp = asChild ? Slot : (Tag ?? "h1")

  // NOTE: Tag is guaranteed to be a subset of typographyVariants so we can use it if variant is undefined
  // variant null should be null as it needs to be explicitly set
  const calculatedVariant = variant === undefined ? Tag : variant

  return (
    <Comp
      className={cn(typographyVariants({ variant: calculatedVariant, weight }), className)}
      {...props}
    >
      {children}
    </Comp>
  )
}

type TextProps<T extends React.ElementType = "p"> = {
  as?: T
  asChild?: boolean
  className?: string
  children: React.ReactNode
} & TypographyVariants &
  React.ComponentPropsWithoutRef<T>

export function Text<T extends React.ElementType = "p">({
  as: Tag,
  asChild = false,
  variant = null,
  weight = null,
  className = "",
  children,
  ...props
}: TextProps<T>) {
  const Comp = asChild ? Slot : (Tag ?? "p")

  return (
    <Comp className={cn(typographyVariants({ variant, weight }), className)} {...props}>
      {children}
    </Comp>
  )
}

type StrongProps<T extends React.ElementType = "strong"> = {
  as?: T
  asChild?: boolean
  className?: string
  children: React.ReactNode
} & React.ComponentPropsWithoutRef<T>

export function Strong<T extends React.ElementType = "strong">({
  as: Tag,
  asChild = false,
  className = "",
  children,
  ...props
}: StrongProps<T>) {
  const Comp = asChild ? Slot : (Tag ?? "strong")

  return (
    <Comp className={cn("font-bold", className)} {...props}>
      {children}
    </Comp>
  )
}

type EmProps<T extends React.ElementType = "em"> = {
  as?: T
  asChild?: boolean
  className?: string
  children: React.ReactNode
} & React.ComponentPropsWithoutRef<T>

export function Em<T extends React.ElementType = "em">({
  as: Tag,
  asChild = false,
  className = "",
  children,
  ...props
}: EmProps<T>) {
  const Comp = asChild ? Slot : (Tag ?? "em")

  return (
    <Comp className={cn("italic", className)} {...props}>
      {children}
    </Comp>
  )
}
