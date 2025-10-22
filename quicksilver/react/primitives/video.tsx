"use client"

import React, { type ComponentPropsWithRef, type ReactNode } from "react"
import { cn } from "@/quicksilver/lib/classname"

// TODO: we'll circle back to "jsx-a11y/media-has-caption", it's currently a bit complicated to handle in this HoC

type VideoElementProps = ComponentPropsWithRef<"video">

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
