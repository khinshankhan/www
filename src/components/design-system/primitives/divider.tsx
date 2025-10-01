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

export const labelWrapperVariants = cva("absolute", {
  variants: {
    orientation: {
      horizontal: "-bottom-2.5 w-full",
      vertical: "",
    },
    alignment: {
      left: "",
      center: "",
      right: "",
    },
    side: {
      top: "rotate-0",
      bottom: "rotate-180",
      left: "-rotate-90",
      right: "rotate-90",
    },
  },
  compoundVariants: [
    // horizontal alignment
    {
      orientation: "horizontal",
      alignment: "left",
      class: "text-left",
    },
    {
      orientation: "horizontal",
      alignment: "center",
      class: "text-center",
    },
    {
      orientation: "horizontal",
      alignment: "right",
      class: "text-right",
    },

    // vertical alignment
    // TODO: figure out a smart way to handle vertical alignment
    {
      orientation: "vertical",
      alignment: "left",
      class: "-right-4.5 bottom-0",
    },
    {
      orientation: "vertical",
      alignment: "center",
      class: "-right-8 top-1/2",
    },
    {
      orientation: "vertical",
      alignment: "right",
      class: "-right-4.5 top-0",
    },
  ],
})

type LabelWrapperVariantProps = VariantProps<typeof labelWrapperVariants>

export const labelVariants = cva("", {
  variants: {
    orientation: {
      horizontal: "-bottom-2.5 w-full",
      vertical: "",
    },
    alignment: {
      left: "",
      center: "",
      right: "",
    },
  },
  compoundVariants: [
    // horizontal alignment
    {
      orientation: "horizontal",
      alignment: "left",
      class: "pr-2",
    },
    {
      orientation: "horizontal",
      alignment: "center",
      class: "px-2",
    },
    {
      orientation: "horizontal",
      alignment: "right",
      class: "pl-2",
    },

    // vertical alignment
    {
      orientation: "vertical",
      alignment: "left",
      class: "pr-2",
    },
    {
      orientation: "vertical",
      alignment: "center",
      class: "px-2",
    },
    {
      orientation: "vertical",
      alignment: "right",
      class: "pl-2",
    },
  ],
})

type LabelVariantProps = VariantProps<typeof labelVariants>

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
    RailVariantProps,
    LineVariantProps,
    LabelWrapperVariantProps,
    LabelVariantProps {
  label?: React.ReactNode
  /** Background behind label chip to "cut" the line (make it same as the surface to get the "bleed" effect) */
  labelBgClass?: string

  railClassName?: string
  lineClassName?: string
  labelWrapperClassName?: string
  labelClassName?: string
}

export function Divider({
  orientation = "horizontal",
  inset = "none",
  weight,
  intensity,
  labelAlign = "center",
  label,
  side = undefined,
  labelBgClass = "bg-background-2",
  railClassName,
  lineClassName,
  labelWrapperClassName,
  labelClassName,
  className,
  ...rest
}: Props) {
  // default to horizontal if null orientation is passed
  const lineOrientation = orientation ?? "horizontal"
  const horizontal = lineOrientation === "horizontal"

  const labelAlignment = labelAlign ?? "center"
  const labelSide = side ?? (horizontal ? "top" : "left")

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
            labelWrapperVariants({ orientation, alignment: labelAlign, side: labelSide }),
            labelWrapperClassName
          )}
        >
          <span
            className={cn(
              labelVariants({ orientation, alignment: labelAlign }),
              labelBgClass,
              labelClassName
            )}
          >
            {label}
          </span>
        </div>
      )}
    </div>
  )
}
