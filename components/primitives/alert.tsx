import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const alertVariants = cva(
  "w-full rounded-md border-2 border-border bg-background/60 p-4 text-foreground",
  {
    variants: {
      variant: {
        note: "info-theme",
        tip: "success-theme",
        important: "critical-theme",
        warning: "warning-theme",
        caution: "danger-theme",
      },
    },
    defaultVariants: {
      variant: "note",
    },
  }
)

export type AlertVariants = VariantProps<typeof alertVariants>

interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, AlertVariants {
  heading?: React.ReactNode
  children?: React.ReactNode
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "note", heading, children, ...props }, ref) => {
    return (
      <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props}>
        {heading && (
          <h5 className="flex flex-row items-center gap-2 pb-2 font-semibold">
            <span style={{ fontSize: "120%" }}>{heading}</span>
          </h5>
        )}

        {children}
      </div>
    )
  }
)
Alert.displayName = "Alert"

export { Alert }
