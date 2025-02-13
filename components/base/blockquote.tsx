import React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

type BlockquoteElementProps = React.DetailedHTMLProps<
  React.BlockquoteHTMLAttributes<HTMLQuoteElement>,
  HTMLQuoteElement
>

export const blockquoteVariants = cva("relative", {
  variants: {
    variant: {
      blockquote: "border-l-4 border-muted-foreground pl-4",
      quote: "surround-quotes my-12 text-center",
    },
  },
  defaultVariants: {
    variant: "blockquote",
  },
})

export type BlockquoteVariants = VariantProps<typeof blockquoteVariants>

export interface BlockquoteProps extends BlockquoteElementProps, BlockquoteVariants {
  className?: string
}

export function Blockquote({
  className = "",
  variant = "blockquote",
  children,
  ...props
}: BlockquoteProps) {
  return (
    <blockquote className={cn(blockquoteVariants({ variant }), className)} {...props}>
      {children}
    </blockquote>
  )
}
