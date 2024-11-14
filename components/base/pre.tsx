import React from "react"
import { cn } from "@/lib/utils"

// prettier-ignore
export interface PreProps extends React.ComponentPropsWithoutRef<"pre"> {
}

export function Pre({ className = "", ...props }: PreProps) {
  console.log({ props })

  return (
    <pre
      className={cn(
        "rounded-md border border-muted bg-muted/30 p-2 text-sm md:text-base lg:text-xl [&>code]:contents",
        className
      )}
      {...props}
    />
  )
}
