"use client"

import { type ComponentProps } from "react"
import { cn } from "@/quicksilver/lib/classname"
import { Checkbox as HeadlessCheckbox } from "@base-ui-components/react/checkbox"
import {
  checkboxIndicatorVariants,
  checkboxVariants,
  type CheckboxVariantProps,
} from "./checkbox.variants"
import { Check } from "./icons"

export interface CheckboxProps
  extends Omit<ComponentProps<typeof HeadlessCheckbox.Root>, "className">, CheckboxVariantProps {
  className?: string
}

export function Checkbox({ checked, className = "", size = "default", ...props }: CheckboxProps) {
  return (
    <HeadlessCheckbox.Root
      checked={checked}
      className={cn(
        checkboxVariants({ size }),
        "cursor-pointer border-surface-4/55 bg-background-2 text-transparent data-[checked]:border-stark-contrast/75 data-[checked]:bg-stark-contrast/85 data-[checked]:text-surface-1",
        className
      )}
      {...props}
    >
      <HeadlessCheckbox.Indicator
        keepMounted
        className={cn(
          checkboxIndicatorVariants({ size }),
          "pointer-events-none opacity-0 transition-opacity data-[checked]:opacity-100"
        )}
      >
        <Check className="size-full stroke-[2.8]" />
      </HeadlessCheckbox.Indicator>
    </HeadlessCheckbox.Root>
  )
}
