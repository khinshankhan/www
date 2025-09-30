"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

export const rail = cva("relative", {
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "h-full w-px",
    },
    inset: { none: "", start: "ps-4", end: "pe-4", both: "px-4" },
  },
  defaultVariants: { orientation: "horizontal", inset: "none" },
})

type RailVariantProps = VariantProps<typeof rail>

export const line = cva("bg-border relative", {
  variants: {
    orientation: {
      horizontal: "h-(--weight) w-full bg-gradient-to-r",
      vertical: "w-(--weight) h-full bg-gradient-to-t",
    },
    weight: {
      hairline: "[--weight:1px]",
      thin: "[--weight:1.5px]",
      regular: "[--weight:2px]",
      thick: "[--weight:4px]",
    },
    intensity: {
      none: "[--intensity-1:0%] [--intensity-2:0%] [--intensity-3:0%]",
      soft: "[--intensity-1:40%] [--intensity-2:20%] [--intensity-3:0%]",
      strong: "[--intensity-1:60%] [--intensity-2:30%] [--intensity-3:0%]",
      solid: "[--intensity-1:100%] [--intensity-2:100%] [--intensity-3:100%]",
    },
    labelAlign: {
      center: "from-border/(--intensity-3) via-border/(--intensity-1) to-border/(--intensity-3)",
      left: "from-border/(--intensity-1) via-border/(--intensity-2) to-border/(--intensity-3)",
      right: "from-border/(--intensity-3) via-border/(--intensity-2) to-border/(--intensity-1)",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    weight: "hairline",
    intensity: "strong",
    labelAlign: "center",
  },
})

type LineVariantProps = VariantProps<typeof line>

interface Props extends React.HTMLAttributes<HTMLDivElement>, RailVariantProps, LineVariantProps {
  /** Center label (horizontal) or side label (vertical) */
  label?: React.ReactNode
  /** Background behind label chip to "cut" the line (make it same as the surface to get the "bleed" effect) */
  labelBgClass?: string

  railClassName?: string
  lineClassName?: string
  labelWrapperClassName?: string
  labelClassName?: string
}

type LabelAlign = NonNullable<Required<LineVariantProps>["labelAlign"]>

const horizLabelAlignments: Record<LabelAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
} as const

// NOTE: these are just hacked together, probably could be improved
const vertLabelAlignments: Record<LabelAlign, string> = {
  left: "-bottom-1 -translate-y-1/2 -right-1.5",
  center: "top-1/2 -translate-y-1/2 -right-4",
  right: "-top-1 -translate-y-1/2 -right-3",
} as const

export function Divider({
  orientation = "horizontal",
  inset = "none",
  weight,
  intensity,
  labelAlign = "center",
  label,
  labelBgClass = "bg-background-2",
  railClassName,
  lineClassName,
  labelWrapperClassName,
  labelClassName,
  className,
  ...rest
}: Props) {
  // default to horizontal if null orientation is passed
  const lineOrientation = orientation || "horizontal"
  const horizontal = lineOrientation === "horizontal"
  const labelAlignment = labelAlign || "center"

  return (
    <div
      role="separator"
      aria-orientation={horizontal ? "horizontal" : "vertical"}
      className={cn(rail({ orientation: lineOrientation, inset }), railClassName, className)}
      {...rest}
    >
      <div
        role="presentation"
        data-vertical={!horizontal || undefined}
        data-align={labelAlignment}
        className={cn(
          line({ orientation: lineOrientation, weight, intensity, labelAlign: labelAlignment }),
          lineClassName
        )}
      />

      {label && (
        <div
          aria-hidden
          className={cn(
            horizontal ? "absolute -bottom-2.5 w-full" : "absolute -rotate-90",
            horizontal ? horizLabelAlignments[labelAlignment] : vertLabelAlignments[labelAlignment],
            labelWrapperClassName
          )}
        >
          <span className={cn("px-2", labelBgClass, labelClassName)}>{label}</span>
        </div>
      )}
    </div>
  )
}
