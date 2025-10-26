"use client"

import * as React from "react"
import { cn } from "@/quicksilver/lib/classname"
import { Tooltip } from "@base-ui-components/react/tooltip"
import { textVariants } from "./text.variants"

export const TooltipProvider = Tooltip.Provider
export const TooltipRoot = Tooltip.Root
export const TooltipTrigger = Tooltip.Trigger
export const TooltipPortal = Tooltip.Portal
export const TooltipArrow = Tooltip.Arrow
export const TooltipPositioner = Tooltip.Positioner

interface TooltipContentProps extends React.ComponentPropsWithoutRef<typeof Tooltip.Popup> {
  sideOffset?: number
}

export function TooltipContent({
  className,
  sideOffset = 8,
  children,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPortal>
      <TooltipPositioner sideOffset={sideOffset}>
        <Tooltip.Popup
          {...props}
          className={cn(
            textVariants({ variant: "small" }),
            "z-50 rounded-md bg-stark-contrast px-3 py-1.5 text-surface-1 shadow-md",
            "outline outline-1 outline-stark-contrast",
            "origin-[var(--transform-origin)] transition-[transform,opacity]",
            "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
            "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
            className
          )}
        >
          {children}
          <TooltipArrow className="fill-[canvas] data-[side=bottom]:-top-2 data-[side=left]:-right-2 data-[side=left]:rotate-90 data-[side=right]:-left-2 data-[side=right]:-rotate-90 data-[side=top]:-bottom-2">
            <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
              <path
                d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
                className="fill-[canvas]"
              />
            </svg>
          </TooltipArrow>
        </Tooltip.Popup>
      </TooltipPositioner>
    </TooltipPortal>
  )
}
