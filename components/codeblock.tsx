import React from "react"
import { cn } from "@/lib/utils"

export interface CodeProps extends React.ComponentPropsWithoutRef<"code"> {
  children: string
}
export const Code = React.forwardRef<HTMLElement, CodeProps>(function Code(
  { className, children, ...props },
  forwardedRef
) {
  return (
    <code
      ref={forwardedRef}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: children }}
      className={cn("rounded-lg bg-muted px-1 text-content-foreground", className)}
      {...props}
    />
  )
})
Code.displayName = "CodeBlock.Code"
