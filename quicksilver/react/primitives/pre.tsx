import React, { type ComponentProps } from "react"
import { cn } from "@/quicksilver/lib/classname"

export interface PreProps extends ComponentProps<"pre"> {
  className?: string
}

export function Pre({ className = "", ...props }: PreProps) {
  return <pre className={cn("relative", className)} {...props} />
}
