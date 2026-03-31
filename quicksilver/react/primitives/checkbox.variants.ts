import { cva, type VariantProps } from "class-variance-authority"

export const checkboxVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-[0.4rem] border transition-colors focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        default: "size-6",
        sm: "size-5",
        lg: "size-7",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export const checkboxIndicatorVariants = cva("inline-flex items-center justify-center", {
  variants: {
    size: {
      default: "size-3.5",
      sm: "size-3",
      lg: "size-4",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

export type CheckboxVariantProps = VariantProps<typeof checkboxVariants>
