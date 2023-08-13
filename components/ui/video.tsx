"use client"

import React, { Children, type ReactNode } from "react"
import { cn, getSizeParts } from "@/lib/utils"
import { Link } from "./link"

interface VideoProps {
  height: string | number
  width: string | number
  className?: string
  children: ReactNode
  [key: string]: any
}

export function Video({ height, width, className = "", children, ...props }: VideoProps) {
  const { size: trueHeight } = getSizeParts({ size: height })
  const { size: trueWidth } = getSizeParts({ size: width })

  const srcs = Children.map(children, (child) => {
    // @ts-expect-error
    if (child!.type !== "source") throw new Error("Video child not source!")
    // @ts-expect-error
    if (!child!.props.src) throw new Error("Source missing src!")
    // @ts-expect-error
    if (!child!.props.type) throw new Error("Source missing type!")
    // @ts-expect-error
    return child.props.src as string
  })

  if ((srcs ?? []).length < 1) throw new Error("Video has no source child!")
  if (!srcs) return null

  return (
    <video
      controls
      className={cn(
        "mx-auto !aspect-[var(--aspect-width)/var(--aspect-height)] h-auto max-h-[725px] w-auto max-w-full",
        className
      )}
      height={trueHeight}
      width={trueWidth}
      style={{
        ["--aspect-width" as any]: trueWidth,
        ["--aspect-height" as any]: trueHeight,
      }}
      {...props}
    >
      {children}
      Your browser does not support the video tag. Here is a
      <Link href={srcs[0]}>link to the video</Link> instead.
    </video>
  )
}
