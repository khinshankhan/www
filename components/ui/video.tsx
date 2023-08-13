"use client"

import React, { Children } from "react"
import { cn } from "@/lib/utils"
import { Link } from "./link"

interface VideoProps {
  className?: string
  [key: string]: any
}

// TODO: add in video skeleton
export function Video({ children, className = "", ...props }: VideoProps) {
  const srcs = Children.map(children, (child) => {
    if (child.type !== "source") throw new Error("Video child not source!")
    if (!child.props.src) throw new Error("Source missing src!")
    if (!child.props.type) throw new Error("Source missing type!")

    return child.props.src
  })

  if (srcs.length < 1) throw new Error("Video has no source child!")

  console.log({ srcs })

  return (
    <video controls className={cn("mx-auto max-h-[725px]", className)} {...props}>
      {children}
      Your browser does not support the video tag. Here is a
      <Link href={srcs[0]}>link to the video</Link> instead.
    </video>
  )
}
