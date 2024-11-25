import React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

export const alertVariants = cva(
  "w-full rounded-md border-2 border-accent-a11 bg-accent-a4 p-4 text-foreground",
  {
    variants: {
      variant: {
        note: "info-theme",
        tip: "success-theme",
        important: "critical-theme",
        warning: "warning-theme",
        caution: "danger-theme",
        default: "",
      },
    },
    defaultVariants: {
      variant: null,
    },
  }
)

// prettier-ignore
export type AlertVariants = VariantProps<typeof alertVariants>;

// prettier-ignore
interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, AlertVariants {
  children?: React.ReactNode;
}

export function Alert({ className, variant = undefined, ...props }: AlertProps) {
  return <aside className={cn(alertVariants({ variant }), className)} {...props} />
}

// prettier-ignore
type AlertHeadingProps = React.HTMLAttributes<HTMLHeadingElement>;

export function AlertHeading({ className, ...props }: AlertHeadingProps) {
  return (
    <div
      className={cn("flex flex-row items-center gap-2 pb-2 font-semibold", className)}
      {...props}
    />
  )
}

// prettier-ignore
type AlertTitleProps = React.HTMLAttributes<HTMLSpanElement>;

export function AlertTitle({ className = "", style = {}, ...props }: AlertTitleProps) {
  return <span className={cn(className)} style={{ fontSize: "120%", ...style }} {...props} />
}

// prettier-ignore
type AlertDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

export function AlertDescription({ className, ...props }: AlertDescriptionProps) {
  return <div className={cn("flex flex-col gap-4", className)} {...props} />
}
