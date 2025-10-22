"use client"

import { cn } from "@/quicksilver/lib/classname"
import { mergeProps } from "@base-ui-components/react/merge-props"
import { useRender } from "@base-ui-components/react/use-render"
import { buttonVariants, type ButtonVariantProps } from "./button.variants"

interface ButtonProps extends useRender.ComponentProps<"button">, ButtonVariantProps {
  className?: string
}

export function Button({
  accent = "primary",
  variant = "default",
  size = "default",
  className = "",
  // default sane type for button is "button" unless otherwise specified
  type = "button",
  render,
  ...props
}: ButtonProps) {
  return useRender({
    defaultTagName: "button",
    render,
    props: mergeProps<"button">(
      { className: cn(buttonVariants({ accent, variant, size, className })), type },
      props
    ),
  })
}
