"use client"

import { type ComponentProps } from "react"
import { cn } from "@/quicksilver/lib/classname"
import { Field } from "@base-ui/react/field"
import { inputVariants, type InputVariantProps } from "./input.variants"

export interface InputProps
  extends Omit<ComponentProps<typeof Field.Control>, "className">, InputVariantProps {
  className?: string
}

// Built on Base UI's Field.Control, so label/value/validity wiring works standalone or inside a Field.
export function Input({ variant, inputSize, className, ...props }: InputProps) {
  return (
    <Field.Control className={cn(inputVariants({ variant, inputSize }), className)} {...props} />
  )
}
