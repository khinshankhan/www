"use client"

import React, { type ReactNode } from "react"
import { cn } from "@/lib/utils"

// TODO: we'll circle back to this, it's currently a bit complicated to handle in this HoC
/* eslint-disable jsx-a11y/media-has-caption */

type VideoElementProps = React.ComponentPropsWithoutRef<"video">

export interface VideoProps extends VideoElementProps {
  children?: ReactNode // possibly fallback content
}

// TODO: add in video skeleton, possibly leverage the image shimmer effect
export function Video({ children, className = "", ...props }: VideoProps) {
  return (
    <video
      controls
      className={cn("mx-auto max-h-[725px] rounded-lg border border-muted", className)}
      {...props}
    >
      {children}
    </video>
  )
}
