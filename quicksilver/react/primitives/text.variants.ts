import { cva, type VariantProps } from "class-variance-authority"

export const textVariants = cva("", {
  variants: {
    variant: {
      h1: "font-heading text-30 font-semibold tracking-tight text-foreground-strong md:text-36 lg:text-48",
      h2: "font-heading text-24 font-semibold tracking-tight text-foreground-strong md:text-30 lg:text-36",
      h3: "font-heading text-20 font-semibold text-foreground-strong md:text-24 lg:text-30",
      h4: "font-heading text-18 font-semibold text-foreground-strong md:text-20 lg:text-24",
      h5: "font-heading text-16 font-semibold text-foreground-strong md:text-18 lg:text-20",
      h6: "font-heading text-14 font-semibold text-foreground-strong md:text-16 lg:text-18",

      body: "font-body text-16 text-pretty antialiased md:text-18 lg:text-20",
      nav: "font-body text-18 font-medium text-balance md:text-20 lg:text-22",

      small: "font-body text-14 md:text-16 lg:text-18",
      xs: "font-body text-12 md:text-14 lg:text-16",
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

export type TextVariantProps = VariantProps<typeof textVariants>
