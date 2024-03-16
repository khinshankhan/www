import React from "react"
import { cn } from "@/lib/utils"

interface BlockquoteProps extends React.HTMLProps<HTMLQuoteElement> {}

export function Blockquote({ children, className = "", ...props }: BlockquoteProps) {
  return (
    <blockquote
      {...props}
      className={cn(
        "relative my-4 border-l-4 border-muted-foreground py-2 pl-4 italic text-muted-foreground",
        className
      )}
    >
      {children}
    </blockquote>
  )
}
