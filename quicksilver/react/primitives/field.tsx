"use client"

import { type ComponentProps } from "react"
import { cn } from "@/quicksilver/lib/classname"
import { Field as BaseField } from "@base-ui/react/field"

// Styled wrappers over Base UI's Field, which handles the label/description/error wiring.

function FieldRoot({ className, ...props }: ComponentProps<typeof BaseField.Root>) {
  return <BaseField.Root className={cn("flex flex-col gap-1.5", className)} {...props} />
}

function FieldLabel({ className, ...props }: ComponentProps<typeof BaseField.Label>) {
  return (
    <BaseField.Label className={cn("text-sm font-medium text-foreground", className)} {...props} />
  )
}

function FieldDescription({ className, ...props }: ComponentProps<typeof BaseField.Description>) {
  return (
    <BaseField.Description className={cn("text-sm text-foreground-muted", className)} {...props} />
  )
}

function FieldError({ className, ...props }: ComponentProps<typeof BaseField.Error>) {
  return <BaseField.Error className={cn("text-sm text-accent-11", className)} {...props} />
}

export const Field = {
  Root: FieldRoot,
  Label: FieldLabel,
  Control: BaseField.Control,
  Description: FieldDescription,
  Error: FieldError,
  Validity: BaseField.Validity,
}
