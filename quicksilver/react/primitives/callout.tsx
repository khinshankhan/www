import React from "react"
import { cn } from "@/quicksilver/lib/classname"
import { capitalize } from "@/quicksilver/lib/string"
import { Alert, AlertDescription, AlertHeading, AlertTitle } from "./alert"
import { alertVariants, type AlertVariants } from "./alert.variants"
import { Info, Lightbulb, OctagonAlert, Star, TriangleAlert, type IconComponent } from "./icons"

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

/**
 * Returns the appropriate icon component for a callout based on the provided icon and variant.
 * Hides the icon entirely if it's explicitly set to null. If an icon is provided, it uses that icon.
 * Otherwise, it attempts to retrieve the icon based on the variant. If no icon is found, it returns null.
 */
export function getCalloutIcon({
  icon,
  variant,
}: {
  icon: IconComponent | null | undefined
  variant: AlertVariants["variant"]
}): IconComponent | null {
  if (icon === null) {
    return null
  }

  if (icon) {
    return icon
  }

  if (variant && variant in calloutIcons) {
    return calloutIcons[variant]
  }

  return null
}

export interface CalloutProps extends AlertVariants {
  title?: React.ReactNode
  icon?: IconComponent | null
  children: React.ReactNode
}

export function Callout({ variant = undefined, icon = undefined, title, children }: CalloutProps) {
  const Icon = getCalloutIcon({ icon, variant })

  return (
    <div className={cn(Icon && "pt-4")}>
      <Alert variant={variant} className="relative">
        {Icon && (
          <div
            className={cn(
              alertVariants({ variant }),
              "absolute -top-4 -left-4 w-max items-center gap-2 rounded-tl-xl rounded-tr-sm rounded-br-xl rounded-bl-sm p-1.5"
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
