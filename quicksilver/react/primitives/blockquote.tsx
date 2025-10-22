import React, { type BlockquoteHTMLAttributes, type DetailedHTMLProps } from "react"
import { cn } from "@/quicksilver/lib/classname"
import { blockquoteVariants, type BlockquoteVariants } from "./blockquote.variants"

type BlockquoteElementProps = DetailedHTMLProps<
  BlockquoteHTMLAttributes<HTMLQuoteElement>,
  HTMLQuoteElement
>

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
