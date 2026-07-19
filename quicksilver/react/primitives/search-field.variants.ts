import { cva, type VariantProps } from "class-variance-authority"

// The field's frame. `underline` is the default look used on the writings index: a bare 2px
// baseline that lights to accent on focus, so it reads as an input rather than a card.
export const searchFieldVariants = cva(
  "group flex items-center gap-3 transition-colors duration-300",
  {
    variants: {
      variant: {
        underline:
          "border-b-2 border-solid border-b-surface-6 pb-2 focus-within:border-b-accent-11",
        soft: "rounded-lg bg-surface-3 px-4 py-3 focus-within:bg-surface-4",
      },
    },
    defaultVariants: {
      variant: "underline",
    },
  }
)

export type SearchFieldVariantProps = VariantProps<typeof searchFieldVariants>
