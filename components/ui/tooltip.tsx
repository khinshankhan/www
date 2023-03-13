"use client"

import React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cx } from "lib/utils"

const Tooltip = ({ ...props }) => <TooltipPrimitive.Root {...props} />
Tooltip.displayName = TooltipPrimitive.Tooltip.displayName

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 5, children, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cx(
      "animate-in fade-in-50 data-[side=bottom]:slide-in-from-top-1 data-[side=top]:slide-in-from-bottom-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 z-50 overflow-hidden rounded-md border border-slate-100 bg-white px-3 py-1.5 text-sm text-slate-700 shadow-md dark:border-slate-800 dark:bg-slate-800 dark:text-slate-400",
      className
    )}
    {...props}
  >
    <span>{children}</span>
    <TooltipPrimitive.Arrow className="fill-white dark:fill-slate-800" width={11} height={5} />
  </TooltipPrimitive.Content>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent }
