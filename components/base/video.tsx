"use client"

import React, { type ReactNode } from "react"
import { cn } from "@/lib/utils"

// prettier-ignore
type VideoElementProps = React.ComponentPropsWithoutRef<"video">

export interface VideoProps extends VideoElementProps {
  children?: ReactNode // possibly fallback content
}

// TODO: add in video skeleton, possibly leverage the image shimmer effect
export function Video({ children, className = "", ...props }: VideoProps) {
  return (
    <video controls className={cn("mx-auto max-h-[725px] rounded-lg", className)} {...props}>
      {children}
    </video>
  )
}
