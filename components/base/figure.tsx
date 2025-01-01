import React from "react"
import { cn } from "@/lib/utils"

export interface FigcaptionProps extends React.ComponentPropsWithRef<"figcaption"> {
  children: React.ReactNode
}

export function Figcaption({ children, className = "", ...props }: FigcaptionProps) {
  return (
    <figcaption
      className={cn("mt-4 text-center text-balance text-muted-foreground", className)}
      {...props}
    >
      {children}
    </figcaption>
  )
}
