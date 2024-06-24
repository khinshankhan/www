import * as React from "react"
import {
  Alert,
  AlertDescription,
  AlertHeading,
  AlertTitle,
  type AlertVariants,
} from "@/components/primitives/alert"
import { SvgIcon, SVGIconNames } from "@/components/primitives/svg-icon"

interface CalloutProps extends React.HTMLAttributes<HTMLDivElement>, AlertVariants {
  variant?: NonNullable<AlertVariants["variant"]>
  heading?: string
  children: React.ReactNode
  className?: string
}

export const calloutIcons: Record<NonNullable<CalloutProps["variant"]>, SVGIconNames> = {
  note: "information-circle",
  tip: "light-bulb",
  important: "star",
  warning: "exclamation-triangle",
  caution: "shield-exclamation",
}

export const calloutKeywords = Object.keys(calloutIcons) as NonNullable<CalloutProps["variant"]>[]

export function isCalloutKeyword(keyword: string): keyword is NonNullable<CalloutProps["variant"]> {
  //@ts-expect-error: silly object can't be indexed by string error
  return calloutKeywords.includes(keyword)
}

export function Callout({
  variant = "note",
  heading = undefined,
  className = "",
  children,
}: CalloutProps) {
  return (
    <Alert key={variant} variant={variant} className={className}>
      <AlertHeading>
        <SvgIcon id={calloutIcons[variant]} />
        {heading && <AlertTitle>{heading}</AlertTitle>}
      </AlertHeading>

      <AlertDescription>{children}</AlertDescription>
    </Alert>
  )
}
