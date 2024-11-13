import React from "react"
import { cn } from "@/lib/utils"

// prettier-ignore
export interface CodeProps extends React.ComponentPropsWithRef<"code"> {
  children: string
}

export function Code({ children, className = "" }: CodeProps) {
  return (
    <code
      className={cn(
        "rounded-md border border-muted bg-muted/30 py-0.25 px-1 text-sm md:text-base lg:text-xl",
        className
      )}
    >
      {children}
    </code>
  )
}
