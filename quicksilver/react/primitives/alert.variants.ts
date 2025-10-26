import { cva, type VariantProps } from "class-variance-authority"

export const alertVariants = cva(
  "w-full rounded-md border-2 border-accent-a11 bg-accent-4 p-4 text-foreground",
  {
    variants: {
      variant: {
        note: "accent-theme-info",
        tip: "accent-theme-success",
        important: "accent-theme-critical",
        warning: "accent-theme-warning",
        caution: "accent-theme-danger",
        neutral: "accent-theme-surface",
        default: "",
      },
    },
    defaultVariants: {
      variant: null,
    },
  }
)

export type AlertVariants = VariantProps<typeof alertVariants>
