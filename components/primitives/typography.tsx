import { cva, VariantProps } from "class-variance-authority"

export const typographyVariants = cva("typography-transition", {
  variants: {
    variant: {
      default: "font-body -text-1 sm:text-0",
      h1: "",
      h2: "",
      h3: "",
      h4: "",
      h5: "",
      h6: "",
      nav: "",
      small: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export type TypographyVariants = VariantProps<typeof typographyVariants>
