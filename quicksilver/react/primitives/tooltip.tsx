"use client"

import * as React from "react"
import { cn } from "@/quicksilver/lib/classname"
import { Tooltip as HeadlessTooltip } from "@base-ui/react/tooltip"
import { tooltipArrowVariants, tooltipPopupVariants } from "./tooltip.variants"

export const TooltipProvider = HeadlessTooltip.Provider
export const TooltipRoot = HeadlessTooltip.Root
export const TooltipTrigger = HeadlessTooltip.Trigger
export const TooltipPortal = HeadlessTooltip.Portal
export const TooltipArrow = HeadlessTooltip.Arrow
export const TooltipPositioner = HeadlessTooltip.Positioner
export const TooltipPopup = HeadlessTooltip.Popup

type TooltipPositionerProps = React.ComponentPropsWithoutRef<typeof HeadlessTooltip.Positioner>

interface TooltipContentProps extends React.ComponentPropsWithoutRef<typeof HeadlessTooltip.Popup> {
  side?: TooltipPositionerProps["side"]
  sideOffset?: TooltipPositionerProps["sideOffset"]
}

export function TooltipContent({
  className,
  side = "top",
  sideOffset = 10,
  children,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPortal>
      <TooltipPositioner side={side} sideOffset={sideOffset}>
        <TooltipPopup {...props} className={cn(tooltipPopupVariants(), className)}>
          {children}
          <TooltipArrow className={tooltipArrowVariants()}>
            <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
              <path
                d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
                className="fill-stark-contrast"
              />
            </svg>
          </TooltipArrow>
        </TooltipPopup>
      </TooltipPositioner>
    </TooltipPortal>
  )
}

export const Tooltip = {
  Provider: TooltipProvider,
  Root: TooltipRoot,
  Trigger: TooltipTrigger,
  Portal: TooltipPortal,
  Arrow: TooltipArrow,
  Positioner: TooltipPositioner,
  Popup: TooltipPopup,
  Content: TooltipContent,
}
