import React from "react"
import { cn } from "@/lib/utils"

interface BlockquoteProps
  extends React.DetailedHTMLProps<
    React.BlockquoteHTMLAttributes<HTMLQuoteElement>,
    HTMLQuoteElement
  > {
  className?: string
  variant?: string
}

export function Blockquote({
  children,
  className = "",
  variant = "blockquote",
  ...props
}: BlockquoteProps) {
  if (variant === "quote") {
    return (
      <blockquote
        {...props}
        className={cn("relative text-muted-foreground [&>:is(span,p)]:italic", className)}
      >
        {children}
      </blockquote>
    )
  }

  return (
    <blockquote
      {...props}
      className={cn(
        "my-4 border-l-4 border-muted-foreground py-2 pl-4 text-muted-foreground [&>:is(span,p)]:italic",
        className
      )}
    >
      {children}
    </blockquote>
  )
}
