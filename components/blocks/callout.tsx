import React, { type ReactNode } from "react"
import { cva, VariantProps } from "class-variance-authority"
import { capitalize, cn } from "@/lib/utils"
import { SvgIcon, SVGIconNames } from "@/components/icons"

export const calloutVariants = cva("w-full rounded-md border-2 px-4 py-2", {
  variants: {
    variant: {
      note: "border-info-border bg-info/60 text-info-foreground",
      tip: "border-success-border bg-success/60 text-success-foreground",
      important: "border-critical-border bg-critical/60 text-critical-foreground",
      warning: "border-warning-border bg-warning/60 text-warning-foreground",
      caution: "border-danger-border bg-danger/60 text-danger-foreground",
    },
  },
  defaultVariants: {
    variant: "note",
  },
})

export type CalloutVariants = VariantProps<typeof calloutVariants>

interface CalloutProps extends React.HTMLAttributes<HTMLDivElement>, CalloutVariants {
  variant?: NonNullable<CalloutVariants["variant"]>
  heading?: string
  children: ReactNode
  className?: string
}

const calloutIcons: Record<NonNullable<CalloutProps["variant"]>, SVGIconNames> = {
  note: "information-circle",
  tip: "light-bulb",
  important: "star",
  warning: "exclamation-triangle",
  caution: "shield-exclamation",
}

export function Callout({
  variant = "note",
  heading = undefined,
  className = "",
  children,
}: CalloutProps) {
  const calloutHeading = heading ?? capitalize(variant)

  return (
    <div className={cn(calloutVariants({ variant, className }))}>
      <p className="flex flex-row items-center gap-2 pb-2 font-semibold">
        <SvgIcon id={calloutIcons[variant]} />
        <span style={{ fontSize: "120%" }}>{calloutHeading}</span>
      </p>
      {children}
    </div>
  )
}
