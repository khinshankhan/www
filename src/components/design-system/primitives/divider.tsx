"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

export const rail = cva("relative", {
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      // TODO: enable vertical in the future when there's a usecase
      /*       vertical: "h-full", */
    },
    inset: { none: "", start: "ps-4", end: "pe-4", both: "px-4" },
  },
  defaultVariants: { orientation: "horizontal", inset: "none" },
})

type RailVariantProps = VariantProps<typeof rail>

export const line = cva("bg-border relative", {
  variants: {
    orientation: {
      horizontal: "w-full",
      // TODO: enable vertical in the future when there's a usecase
      /*       vertical: "h-full w-px", */
    },
    thickness: { hairline: "h-px", sm: "h-[1.5px]", md: "h-[2px]" },
    gradient: {
      none: "", // classes injected via compoundVariants below
      soft: "", // classes injected via compoundVariants below
      strong: "", // classes injected via compoundVariants below
    },
    labelAlign: {
      center: "", // classes injected via compoundVariants below
      left: "", // classes injected via compoundVariants below
      right: "", // classes injected via compoundVariants below
    },
  },
  compoundVariants: [
    // CENTER alignment: fade in from transparent, solid in middle, fade out to transparent
    {
      orientation: "horizontal",
      gradient: "soft",
      labelAlign: "center",
      class: "from-border/0 via-border/40 to-border/0 bg-gradient-to-r",
    },
    {
      orientation: "horizontal",
      gradient: "strong",
      labelAlign: "center",
      class: "from-border/0 via-border/60 to-border/0 bg-gradient-to-r",
    },

    // LEFT alignment: solid on the left, fade to transparent on the right
    {
      orientation: "horizontal",
      gradient: "soft",
      labelAlign: "left",
      class: "from-border/100 via-border/40 to-border/0 bg-gradient-to-r",
    },
    {
      orientation: "horizontal",
      gradient: "strong",
      labelAlign: "left",
      class: "from-border/100 via-border/60 to-border/0 bg-gradient-to-r",
    },

    // RIGHT alignment: transparent on the left, solid on the right
    {
      orientation: "horizontal",
      gradient: "soft",
      labelAlign: "right",
      class: "from-border/0 via-border/40 to-border/100 bg-gradient-to-r",
    },
    {
      orientation: "horizontal",
      gradient: "strong",
      labelAlign: "right",
      class: "from-border/0 via-border/60 to-border/100 bg-gradient-to-r",
    },
  ],
  defaultVariants: {
    orientation: "horizontal",
    thickness: "hairline",
    gradient: "strong",
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

export function Divider({
  orientation = "horizontal",
  inset = "none",
  thickness,
  gradient,
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
          line({ orientation: lineOrientation, thickness, gradient, labelAlign: labelAlignment }),
          lineClassName
        )}
      />

      {label && (
        <div
          aria-hidden
          className={cn(
            horizontal ? "absolute -bottom-2.5 w-full" : "absolute inset-y-0 -end-2.5 flex",
            horizLabelAlignments[labelAlignment],
            labelWrapperClassName
          )}
        >
          <span className={cn("px-2", labelBgClass, labelClassName)}>{label}</span>
        </div>
      )}
    </div>
  )
}
