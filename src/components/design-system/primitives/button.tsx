import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { mergeProps } from "@base-ui-components/react/merge-props"
import { useRender } from "@base-ui-components/react/use-render"

export const buttonVariants = cva(
  "ring-offset-background focus-visible:ring-ring focus-visible:outline-hidden inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:ring-1 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      accent: {
        primary: "accent-theme-surface",
        secondary: "accent-theme-default",
        info: "accent-theme-info",
        success: "accent-theme-success",
        critical: "accent-theme-critical",
        warning: "accent-theme-warning",
        danger: "accent-theme-danger",
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
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      accent: "primary",
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
  accent = "primary",
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
      { className: cn(buttonVariants({ accent, variant, size, className })) },
      props
    ),
  })
}
