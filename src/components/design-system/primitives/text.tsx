import { cva } from "class-variance-authority"

export const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "text-foreground-strong font-heading text-30 md:text-36 lg:text-48 font-semibold tracking-tight",
      h2: "text-foreground-strong font-heading text-24 md:text-30 lg:text-36 font-semibold tracking-tight",
      h3: "text-foreground-strong font-heading text-20 md:text-24 lg:text-30 font-semibold",
      h4: "text-foreground-strong font-heading text-18 md:text-20 lg:text-24 font-semibold",
      h5: "text-foreground-strong font-heading text-16 md:text-18 lg:text-20 font-semibold",
      h6: "text-foreground-strong font-heading text-14 md:text-16 lg:text-18 font-semibold",

      body: "font-body text-16 md:text-18 lg:text-20 text-pretty antialiased",
      nav: "font-body text-18 md:text-20 lg:text-22 text-balance font-medium",

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
