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
  type IconProps,
} from "@/components/base/icon"
import { cn } from "@/lib/utils"

// prettier-ignore
type IconLookup = Record<NonNullable<AlertVariants["variant"]>, (props: IconProps) => JSX.Element>

const icons: IconLookup = {
  note: Info,
  tip: Lightbulb,
  important: Star,
  warning: TriangleAlert,
  caution: OctagonAlert,
}

export interface CalloutProps extends AlertVariants {
  title?: React.ReactNode
  children: React.ReactNode
}

export function Callout({ variant = "note", title, children }: CalloutProps) {
  const Icon = variant ? icons[variant] : null

  return (
    <div className="pt-4">
      <Alert variant={variant} className="relative">
        {Icon && (
          <div
            className={cn(
              alertVariants({ variant }),
              "absolute -top-4 -left-4 w-max items-center gap-2 rounded-full p-1.5 backdrop-blur-lg"
            )}
          >
            <Icon className="h-6 w-6 text-foreground" />
          </div>
        )}

        <div className="pt-1">
          {title && (
            <AlertHeading className="prose-heading mt-0 pb-0">
              <AlertTitle>{title}</AlertTitle>
            </AlertHeading>
          )}

          <AlertDescription className="prose block [&_*]:last:mb-0">{children}</AlertDescription>
        </div>
      </Alert>
    </div>
  )
}
