import React, { type ReactNode } from "react"
import { VariantProps, cva } from "class-variance-authority"
import { Icon } from "@/components/ui"
import {
  CheckCircle,
  ExclamationTriangle,
  InformationCircle,
  XCircle,
  type RawIconProps,
} from "@/components/icons"

export const calloutVariants = cva("border-l-4 p-4 w-full", {
  variants: {
    variant: {
      info: "border-info-7 bg-info-12 stroke-info-8",
      error: "border-error-7 bg-error-12 stroke-error-8",
      warn: "border-warn-7 bg-warn-12 stroke-warn-8",
      success: "border-success-7 bg-success-12 stroke-success-8",
      accent: "border-theme-accent py-0",
    },
  },
  defaultVariants: {
    variant: "info",
  },
})

export type CalloutVariants = VariantProps<typeof calloutVariants>

export type CalloutProps = {
  className?: string
  icon?: ReactNode
  heading?: ReactNode
  children: ReactNode
} & CalloutVariants

type SvgFn = (_props: RawIconProps) => React.JSX.Element
const calloutIcons: Record<NonNullable<CalloutVariants["variant"]>, SvgFn> = {
  info: InformationCircle,
  error: XCircle,
  warn: ExclamationTriangle,
  success: CheckCircle,
  accent: InformationCircle, // won't be displayed but annoying types
}

export function Callout({
  variant = "info",
  icon = null,
  heading = null,
  className = "",
  children,
}: CalloutProps) {
  const DisplayIcon = variant && variant !== "accent" && calloutIcons[variant]
  const displayIcon =
    icon ??
    (DisplayIcon && (
      <Icon>
        <DisplayIcon className="inline-block stroke-inherit" />
      </Icon>
    ))

  return (
    <div className={calloutVariants({ variant, className })}>
      <div>
        {(displayIcon || heading) && (
          <div className="pb-2 font-semibold">
            {displayIcon} {heading}
          </div>
        )}

        {children}
      </div>
    </div>
  )
}

export default Callout
