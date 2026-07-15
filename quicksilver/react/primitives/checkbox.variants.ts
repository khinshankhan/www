import { cva, type VariantProps } from "class-variance-authority"
import { focusRing } from "./focus.variants"

export const checkboxVariants = cva(
  [
    focusRing,
    "inline-flex shrink-0 items-center justify-center rounded-[0.4rem] border transition-colors disabled:cursor-not-allowed disabled:opacity-50",
    "cursor-pointer border-surface-4/55 bg-background-2 text-transparent transition-[background-color,border-color,color,transform,box-shadow] duration-200 ease-out hover:border-surface-5/70 hover:bg-surface-3 active:scale-[0.97] data-[checked]:border-stark-contrast/75 data-[checked]:bg-stark-contrast/85 data-[checked]:text-surface-1 data-[checked]:shadow-[0_8px_20px_-14px_rgba(255,255,255,0.45)]",
  ],
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

export const checkboxIndicatorVariants = cva(
  [
    "inline-flex items-center justify-center",
    "pointer-events-none scale-75 opacity-0 transition-[opacity,transform] duration-150 ease-out data-[checked]:scale-100 data-[checked]:opacity-100 data-[ending-style]:scale-75 data-[starting-style]:scale-75",
  ],
  {
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
  }
)

export type CheckboxVariantProps = VariantProps<typeof checkboxVariants>
