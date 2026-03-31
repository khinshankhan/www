import { cva, type VariantProps } from "class-variance-authority"

export const buttonVariants = cva(
  "ring-offset-background focus-visible:ring-ring text-sm inline-flex cursor-pointer items-center justify-center rounded-md font-medium whitespace-nowrap transition-colors focus-visible:ring-1 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
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
        ghost: "bg-transparent hover:bg-accent-6/40",
        phantom: "bg-accent-4/40 hover:bg-accent-6/40",
        panel:
          "border border-accent-7/20 bg-accent-4/55 text-foreground-strong shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_1px_2px_rgba(0,0,0,0.12)] transition-[color,background-color,border-color,box-shadow,transform] hover:border-accent-7/35 hover:bg-accent-5 hover:text-foreground hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_10px_18px_-14px_rgba(0,0,0,0.45)] active:translate-y-px active:border-accent-8/30 active:bg-accent-6/80 active:shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] disabled:border-surface-3/50 disabled:bg-surface-a1 disabled:text-foreground-subtle/45 disabled:shadow-none",
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
