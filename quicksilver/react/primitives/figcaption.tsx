import React, { type ComponentPropsWithRef, type ReactNode } from "react"
import { cn } from "@/quicksilver/lib/classname"
import { textVariants } from "./text.variants"

export interface FigcaptionProps extends ComponentPropsWithRef<"figcaption"> {
  children: ReactNode
}

export function Figcaption({ children, className = "", ...props }: FigcaptionProps) {
  return (
    <figcaption
      className={cn(
        textVariants({ variant: "small" }),
        "mt-4 text-center text-balance text-foreground-muted",
        className
      )}
      {...props}
    >
      {children}
    </figcaption>
  )
}
