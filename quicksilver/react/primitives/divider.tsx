import React, { type HTMLAttributes, type ReactNode } from "react"
import { cn } from "@/quicksilver/lib/classname"
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

export const line = cva("relative bg-surface-7", {
  variants: {
    orientation: {
      horizontal: "h-(--thickness) w-full bg-gradient-to-r",
      vertical: "h-full w-(--thickness) bg-gradient-to-t",
    },
    thickness: {
      hairline: "[--thickness:0.25px]",
      extralight: "[--thickness:0.5px]",
      light: "[--thickness:0.75px]",
      normal: "[--thickness:1px]",
      medium: "[--thickness:1.5px]",
      semibold: "[--thickness:2px]",
      bold: "[--thickness:3px]",
      extrabold: "[--thickness:4px]",
      black: "[--thickness:6px]",
    },
    intensity: {
      none: "[--intensity-1:0%] [--intensity-2:0%] [--intensity-3:0%]",
      soft: "[--intensity-1:40%] [--intensity-2:20%] [--intensity-3:0%]",
      strong: "[--intensity-1:60%] [--intensity-2:30%] [--intensity-3:0%]",
      solid: "[--intensity-1:100%] [--intensity-2:100%] [--intensity-3:100%]",
    },
    align: {
      center:
        "from-surface-7/(--intensity-3) via-surface-7/(--intensity-1) to-surface-7/(--intensity-3)",
      left: "from-surface-7/(--intensity-1) via-surface-7/(--intensity-2) to-surface-7/(--intensity-3)",
      right:
        "from-surface-7/(--intensity-3) via-surface-7/(--intensity-2) to-surface-7/(--intensity-1)",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    thickness: "normal",
    intensity: "strong",
    align: "center",
  },
})

type LineVariantProps = VariantProps<typeof line>

export const labelWrapperVariants = cva("absolute", {
  variants: {
    orientation: {
      horizontal: "-bottom-2.5 w-full",
      vertical: "",
    },
    align: {
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
      align: "left",
      class: "text-left",
    },
    {
      orientation: "horizontal",
      align: "center",
      class: "text-center",
    },
    {
      orientation: "horizontal",
      align: "right",
      class: "text-right",
    },

    // vertical alignment
    // TODO: figure out a smart way to handle vertical alignment
    // probably unusable for now
    {
      orientation: "vertical",
      align: "left",
      class: "absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-0.5 transform",
    },
    {
      orientation: "vertical",
      align: "center",
      class: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform",
    },
    {
      orientation: "vertical",
      align: "right",
      class: "absolute top-0 left-1/2 -translate-x-1/2 translate-y-1/2 transform",
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
    align: {
      left: "pr-2",
      center: "px-2",
      right: "pl-2",
    },
  },
})

type LabelVariantProps = VariantProps<typeof labelVariants>

interface DividerProps
  extends HTMLAttributes<HTMLDivElement>,
    RailVariantProps,
    LineVariantProps,
    LabelWrapperVariantProps,
    LabelVariantProps {
  label?: ReactNode
  /** Background behind label chip to "cut" the line (make it same as the surface to get the "bleed" effect) */
  labelBgClass?: string

  orientation?: "horizontal" | "vertical"

  railClassName?: string
  lineClassName?: string
  labelWrapperClassName?: string
  labelClassName?: string
}

export function Divider({
  orientation = "horizontal",
  inset = "none",
  thickness,
  intensity,
  align: alignProp = "center",
  label,
  side: sideProp = undefined,
  labelBgClass = "bg-background-2",
  railClassName,
  lineClassName,
  labelWrapperClassName,
  labelClassName,
  className,
  ...rest
}: DividerProps) {
  const isHorizontal = orientation === "horizontal"

  const align = alignProp ?? "center"
  const side = sideProp ?? (isHorizontal ? "top" : "left")

  return (
    <div
      role="separator"
      aria-orientation={isHorizontal ? "horizontal" : "vertical"}
      className={cn(rail({ orientation, inset }), railClassName, className)}
      {...rest}
    >
      <div
        role="presentation"
        data-vertical={!isHorizontal || undefined}
        data-align={align}
        className={cn(line({ orientation, thickness, intensity, align }), lineClassName)}
      />

      {label && (
        <div
          data-align={align}
          className={cn(labelWrapperVariants({ orientation, align, side }), labelWrapperClassName)}
        >
          <span className={cn(labelVariants({ orientation, align }), labelBgClass, labelClassName)}>
            {label}
          </span>
        </div>
      )}
    </div>
  )
}
