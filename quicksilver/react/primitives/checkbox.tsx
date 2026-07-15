"use client"

import { type ComponentProps } from "react"
import { cn } from "@/quicksilver/lib/classname"
import { Checkbox as HeadlessCheckbox } from "@base-ui/react/checkbox"
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

export function Checkbox({ checked, className, size = "default", ...props }: CheckboxProps) {
  return (
    <HeadlessCheckbox.Root
      checked={checked}
      className={cn(checkboxVariants({ size }), className)}
      {...props}
    >
      <HeadlessCheckbox.Indicator keepMounted className={checkboxIndicatorVariants({ size })}>
        <Check className="size-full stroke-[2.8]" />
      </HeadlessCheckbox.Indicator>
    </HeadlessCheckbox.Root>
  )
}
