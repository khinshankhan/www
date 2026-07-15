import { type ComponentProps } from "react"
import { cn } from "@/quicksilver/lib/classname"
import { alertVariants, type AlertVariants } from "./alert.variants"

export interface AlertProps extends ComponentProps<"aside">, AlertVariants {}

export function AlertRoot({ variant, className, ...props }: AlertProps) {
  return <aside className={cn(alertVariants({ variant }), className)} {...props} />
}

export type AlertHeadingProps = ComponentProps<"div">

export function AlertHeading({ className, ...props }: AlertHeadingProps) {
  return (
    <div
      className={cn("flex flex-row items-center gap-2 pb-2 font-semibold", className)}
      {...props}
    />
  )
}

export type AlertTitleProps = ComponentProps<"span">

export function AlertTitle({ className, ...props }: AlertTitleProps) {
  return <span className={cn("text-[1.2em]", className)} {...props} />
}

export type AlertDescriptionProps = ComponentProps<"div">

export function AlertDescription({ className, ...props }: AlertDescriptionProps) {
  return <div className={cn("flex flex-col gap-4", className)} {...props} />
}

// callable as <Alert> for compatibility; parts hang off it like the other compound namespaces
export const Alert = Object.assign(AlertRoot, {
  Root: AlertRoot,
  Heading: AlertHeading,
  Title: AlertTitle,
  Description: AlertDescription,
})
