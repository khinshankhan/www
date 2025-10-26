import React, { type HTMLAttributes, type ReactNode } from "react"
import { cn } from "@/quicksilver/lib/classname"
import { alertVariants, type AlertVariants } from "./alert.variants"

interface AlertProps extends HTMLAttributes<HTMLDivElement>, AlertVariants {
  children?: ReactNode
}

export function Alert({ className, variant = undefined, ...props }: AlertProps) {
  return <aside className={cn(alertVariants({ variant }), className)} {...props} />
}

type AlertHeadingProps = HTMLAttributes<HTMLHeadingElement>

export function AlertHeading({ className, ...props }: AlertHeadingProps) {
  return (
    <div
      className={cn("flex flex-row items-center gap-2 pb-2 font-semibold", className)}
      {...props}
    />
  )
}

type AlertTitleProps = HTMLAttributes<HTMLSpanElement>

export function AlertTitle({ className = "", style = {}, ...props }: AlertTitleProps) {
  return <span className={cn(className)} style={{ fontSize: "120%", ...style }} {...props} />
}

type AlertDescriptionProps = HTMLAttributes<HTMLParagraphElement>

export function AlertDescription({ className, ...props }: AlertDescriptionProps) {
  return <div className={cn("flex flex-col gap-4", className)} {...props} />
}
