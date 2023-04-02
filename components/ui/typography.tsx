import React, { forwardRef, type DetailedHTMLProps, type HTMLAttributes } from "react"
import { VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

/* link underline (before:*) animation based off https://tobiasahlin.com/blog/css-trick-animating-link-underlines/ */
const linkStyles =
  "text-link-base before:bg-link-active hover:text-link-active relative before:absolute before:bottom-0 before:left-0 before:block before:h-px before:w-full before:scale-x-0 before:transition-transform before:duration-300 before:content-[''] hover:before:scale-x-100"

export const typographyVariants = cva("typography-transition", {
  variants: {
    variant: {
      default: "",
      h1: "font-heading text-3xl font-semibold tracking-wider sm:text-4xl 2xl:text-5xl",
      h2: "font-heading text-2xl font-semibold tracking-wider sm:text-3xl 2xl:text-4xl",
      h3: "font-heading text-xl font-semibold tracking-wide sm:text-2xl 2xl:text-3xl",
      h4: "font-heading text-lg font-semibold tracking-wide sm:text-xl 2xl:text-2xl",
      h5: "font-heading text-base font-semibold tracking-wide sm:text-lg 2xl:text-xl",
      h6: "font-heading text-sm font-semibold tracking-wide sm:text-base 2xl:text-lg",
      /* lg is avg lg and xl */
      "main-nav": "font-heading text-lg font-medium tracking-wide lg:text-[1.344rem]",
      small: "text-xs md:text-sm 2xl:text-base",
      link: linkStyles,
      "link-on": cn(
        linkStyles,
        "text-link-on before:bg-link-base hover:text-link-on hover:before:bg-link-active before:scale-x-100"
      ),
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export type TypographyVariants = VariantProps<typeof typographyVariants>

type HeadingProps = DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>

export const H1 = forwardRef<HTMLHeadingElement, HeadingProps>(({ className, ...props }, ref) => (
  <h1 className={cn(typographyVariants({ variant: "h1", className }))} ref={ref} {...props} />
))
H1.displayName = "H1"

export const H2 = forwardRef<HTMLHeadingElement, HeadingProps>(({ className, ...props }, ref) => (
  <h2 className={cn(typographyVariants({ variant: "h2", className }))} ref={ref} {...props} />
))
H2.displayName = "H2"

export const H3 = forwardRef<HTMLHeadingElement, HeadingProps>(({ className, ...props }, ref) => (
  <h3 className={cn(typographyVariants({ variant: "h3", className }))} ref={ref} {...props} />
))
H3.displayName = "H3"

export const H4 = forwardRef<HTMLHeadingElement, HeadingProps>(({ className, ...props }, ref) => (
  <h4 className={cn(typographyVariants({ variant: "h4", className }))} ref={ref} {...props} />
))
H4.displayName = "H4"

export const H5 = forwardRef<HTMLHeadingElement, HeadingProps>(({ className, ...props }, ref) => (
  <h5 className={cn(typographyVariants({ variant: "h5", className }))} ref={ref} {...props} />
))
H5.displayName = "H5"

export const H6 = forwardRef<HTMLHeadingElement, HeadingProps>(({ className, ...props }, ref) => (
  <h6 className={cn(typographyVariants({ variant: "h6", className }))} ref={ref} {...props} />
))
H6.displayName = "H6"
