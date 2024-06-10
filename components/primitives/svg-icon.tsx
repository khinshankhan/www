import React from "react"
import { cn } from "@/lib/utils"

// base credit: lekoarts https://github.com/LekoArts/portfolio-v2/blob/main/src/components/primitives/svg-icon.tsx
// svg sprites improves performance by reducing the number of requests to the server
export type SVGIconNames =
  | "information-circle"
  | "light-bulb"
  | "star"
  | "exclamation-triangle"
  | "shield-exclamation"
  | "chevron-down"
  | "arrow-down-tray"
  | "arrow-up-right"
  | "check"
  | "document-duplicate"

export interface ISvgIconProps extends React.SVGAttributes<SVGElement> {
  className?: string
  id: SVGIconNames
}
export function SvgIcon({ className = "", id, ...props }: ISvgIconProps) {
  return (
    <svg
      aria-hidden
      focusable="false"
      fill="none"
      strokeWidth="1.5"
      stroke="currentColor"
      className={cn("size-6", className)}
      {...props}
    >
      <use href={`/icons.svg?v=2#${id}`} />
    </svg>
  )
}
