import { cva, type VariantProps } from "class-variance-authority"

// `outlined`: self-contained bordered field. `bare`: no frame, for composing inside another
// (e.g. SearchField's underline).
export const inputVariants = cva(
  "w-full min-w-0 bg-transparent text-foreground caret-accent-11 outline-none placeholder:text-foreground-muted disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        outlined:
          "rounded-lg border border-solid border-surface-6 bg-background-2 px-3 py-2 transition-colors focus-visible:border-accent-11",
        bare: "border-0 bg-transparent p-0",
      },
      inputSize: {
        default: "text-16",
        sm: "text-14",
        lg: "text-18",
      },
    },
    defaultVariants: {
      variant: "outlined",
      inputSize: "default",
    },
  }
)

export type InputVariantProps = VariantProps<typeof inputVariants>
