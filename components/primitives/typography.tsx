import { cva, VariantProps } from "class-variance-authority"

export const typographyVariants = cva("", {
  variants: {
    variant: {
      default: "font-body text-base tracking-wider antialiased md:text-lg lg:text-xl",
      h1: "font-heading text-3xl font-semibold tracking-wider md:text-4xl lg:text-5xl",
      h2: "font-heading text-2xl font-semibold tracking-wide md:text-3xl lg:text-4xl",
      h3: "font-heading text-xl font-semibold tracking-wide md:text-2xl lg:text-3xl",
      h4: "font-heading text-lg font-semibold tracking-wide md:text-xl lg:text-2xl",
      h5: "font-heading text-base font-semibold tracking-wide md:text-lg lg:text-xl",
      h6: "font-heading text-sm font-semibold tracking-wide md:text-base lg:text-lg",
      nav: "font-body text-sm font-medium tracking-wide md:text-base lg:text-lg",
      small: "font-body text-xs md:text-sm lg:text-base",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export type TypographyVariants = VariantProps<typeof typographyVariants>
