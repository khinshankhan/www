"use client"

import * as React from "react"
import { cn } from "@/quicksilver/lib/classname"
import { Tooltip as HeadlessTooltip } from "@base-ui/react/tooltip"
import { textVariants } from "./text.variants"

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
        <TooltipPopup
          {...props}
          className={cn(
            textVariants({ variant: "small" }),
            "z-50 rounded-md bg-stark-contrast px-3 py-1.5 text-surface-1 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.8)]",
            "outline outline-1 outline-stark-contrast",
            "origin-[var(--transform-origin)] transition-[transform,opacity] duration-180 ease-[cubic-bezier(0.22,1,0.36,1)]",
            "data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[starting-style]:data-[side=bottom]:-translate-y-1 data-[starting-style]:data-[side=left]:translate-x-1 data-[starting-style]:data-[side=right]:-translate-x-1 data-[starting-style]:data-[side=top]:translate-y-1",
            "data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[ending-style]:data-[side=bottom]:-translate-y-0.5 data-[ending-style]:data-[side=left]:translate-x-0.5 data-[ending-style]:data-[side=right]:-translate-x-0.5 data-[ending-style]:data-[side=top]:translate-y-0.5",
            className
          )}
        >
          {children}
          <TooltipArrow className="pointer-events-none data-[side=bottom]:-top-2 data-[side=left]:-right-[14px] data-[side=left]:rotate-90 data-[side=right]:-left-[14px] data-[side=right]:-rotate-90 data-[side=top]:-bottom-2 data-[side=top]:rotate-180">
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
