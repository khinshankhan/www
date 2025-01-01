import React from "react"
import {
  Alert,
  AlertDescription,
  AlertHeading,
  AlertTitle,
  alertVariants,
  type AlertVariants,
} from "@/components/base/alert"
import {
  Info,
  Lightbulb,
  OctagonAlert,
  Star,
  TriangleAlert,
  type IconComponent,
} from "@/components/base/icon"
import { capitalize, cn } from "@/lib/utils"

type IconLookup = Record<NonNullable<AlertVariants["variant"]>, IconComponent | null>

export const calloutIcons: IconLookup = {
  note: Info,
  tip: Lightbulb,
  important: Star,
  warning: TriangleAlert,
  caution: OctagonAlert,
  neutral: null,
  default: null, // no icon for defaults
}

export interface CalloutProps extends AlertVariants {
  title?: React.ReactNode
  icon?: IconComponent | null
  children: React.ReactNode
}

export function Callout({ variant = undefined, icon = undefined, title, children }: CalloutProps) {
  // hide icon entirely if it's explicitly set to null or else try to use icon prop if provided
  // otherwise try to use the variant to get the icon
  const Icon =
    icon === null ? null : icon !== undefined ? icon : variant ? calloutIcons[variant] : null

  return (
    <div className={cn(Icon && "pt-4")}>
      <Alert variant={variant} className="relative">
        {Icon && (
          <div
            className={cn(
              alertVariants({ variant }),
              "absolute -top-4 -left-4 w-max items-center gap-2 rounded-full p-1.5"
            )}
          >
            <Icon
              aria-hidden={
                // Hides the raw SVG from screen readers
                "true"
              }
              className="h-6 w-6 text-foreground"
            />
            {variant && <span className="sr-only">{capitalize(variant)}</span>}
          </div>
        )}

        <div className={cn(Icon && "pt-1")}>
          {title && (
            <AlertHeading className="prose-heading mt-0 pb-0">
              <AlertTitle>{title}</AlertTitle>
            </AlertHeading>
          )}

          <AlertDescription className="prose block **:last:mb-0">{children}</AlertDescription>
        </div>
      </Alert>
    </div>
  )
}
