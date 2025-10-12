import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { mergeProps } from "@base-ui-components/react/merge-props"
import { useRender } from "@base-ui-components/react/use-render"

export const buttonVariants = cva(
  "ring-offset-background focus-visible:ring-ring focus-visible:outline-hidden inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      theme: {
        primary: "theme-surface",
        secondary: "theme-default",
        info: "theme-info",
        success: "theme-success",
        critical: "theme-critical",
        warning: "theme-warning",
        danger: "theme-danger",
      },
      variant: {
        default: "bg-accent-4 hover:bg-accent-3",
        ghost: "hover:bg-accent-6/40 bg-transparent",
        phantom: "bg-accent-4/40 hover:bg-accent-6/40",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "size-10",
      },
    },
    defaultVariants: {
      theme: "primary",
      variant: "default",
      size: "default",
    },
  }
)

export type ButtonVariantProps = VariantProps<typeof buttonVariants>

interface ButtonProps extends useRender.ComponentProps<"button">, ButtonVariantProps {
  className?: string
}

export function Button({
  theme = "primary",
  variant = "default",
  size = "default",
  className = "",
  render,
  ...props
}: ButtonProps) {
  return useRender({
    defaultTagName: "button",
    render,
    props: mergeProps<"button">(
      { className: cn(buttonVariants({ variant, size, className })) },
      props
    ),
  })
}
