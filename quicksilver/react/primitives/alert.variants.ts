import { cva, type VariantProps } from "class-variance-authority"

export const alertVariants = cva(
  "w-full rounded-md border-2 border-accent-a11 bg-accent-4 p-4 text-foreground",
  {
    variants: {
      variant: {
        note: "info-theme",
        tip: "success-theme",
        important: "critical-theme",
        warning: "warning-theme",
        caution: "danger-theme",
        neutral: "gray-theme",
        default: "",
      },
    },
    defaultVariants: {
      variant: null,
    },
  }
)

export type AlertVariants = VariantProps<typeof alertVariants>
