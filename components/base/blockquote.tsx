import React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

// prettier-ignore
type BlockquoteElementProps = React.DetailedHTMLProps<React.BlockquoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>

export const blockquoteVariants = cva("relative", {
  variants: {
    variant: {
      blockquote: "border-l-4 border-muted-foreground pl-4",
      quote: "quotes my-12 text-center before:text-muted-foreground after:text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "blockquote",
  },
})

// prettier-ignore
export type BlockquoteVariants = VariantProps<typeof blockquoteVariants>;

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
