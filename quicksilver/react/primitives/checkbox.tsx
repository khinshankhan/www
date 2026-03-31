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

export function Checkbox({ checked, className = "", size = "default", ...props }: CheckboxProps) {
  return (
    <HeadlessCheckbox.Root
      checked={checked}
      className={cn(
        checkboxVariants({ size }),
        "hover:bg-background-3 cursor-pointer border-surface-4/55 bg-background-2 text-transparent transition-[background-color,border-color,color,transform,box-shadow] duration-200 ease-out hover:border-surface-5/70 active:scale-[0.97] data-[checked]:border-stark-contrast/75 data-[checked]:bg-stark-contrast/85 data-[checked]:text-surface-1 data-[checked]:shadow-[0_8px_20px_-14px_rgba(255,255,255,0.45)]",
        className
      )}
      {...props}
    >
      <HeadlessCheckbox.Indicator
        keepMounted
        className={cn(
          checkboxIndicatorVariants({ size }),
          "pointer-events-none scale-75 opacity-0 transition-[opacity,transform] duration-150 ease-out data-[checked]:scale-100 data-[checked]:opacity-100 data-[ending-style]:scale-75 data-[starting-style]:scale-75"
        )}
      >
        <Check className="size-full stroke-[2.8]" />
      </HeadlessCheckbox.Indicator>
    </HeadlessCheckbox.Root>
  )
}
