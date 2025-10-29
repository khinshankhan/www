import { cva, type VariantProps } from "class-variance-authority"

export const blockquoteVariants = cva("prose relative", {
  variants: {
    variant: {
      blockquote: "border-l-4 border-foreground-muted pl-4",
      quote: "surround-quotes my-12 text-center",
    },
  },
  defaultVariants: {
    variant: "blockquote",
  },
})

export type BlockquoteVariants = VariantProps<typeof blockquoteVariants>
