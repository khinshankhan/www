"use client"

import React, { Children, useRef, useState } from "react"
import { cn, getSizeParts } from "@/lib/utils"
import { useIsomorphicEffect } from "hooks"
import { Link } from "./link"

interface VideoProps {
  height: string | number
  width: string | number
  className?: string
  [key: string]: any
}

// TODO: add in video skeleton
export function Video({ height, width, className = "", children, ...props }: VideoProps) {
  const { size: trueHeight } = getSizeParts({ size: height })
  const { size: trueWidth } = getSizeParts({ size: width })

  // calculate perfect ratio in case the video looks unruly
  const videoRef = useRef<HTMLVideoElement>(null)
  const [renderWidthMultiplier, setRenderWidthMultiplier] = useState(trueWidth)
  useIsomorphicEffect(() => {
    if (videoRef.current) {
      setRenderWidthMultiplier(videoRef.current.clientHeight / trueHeight)
    }
  }, [videoRef?.current?.clientHeight])

  const srcs = Children.map(children, (child) => {
    if (child.type !== "source") throw new Error("Video child not source!")
    if (!child.props.src) throw new Error("Source missing src!")
    if (!child.props.type) throw new Error("Source missing type!")

    return child.props.src
  })

  if (srcs.length < 1) throw new Error("Video has no source child!")

  return (
    <video
      ref={videoRef}
      controls
      className={cn("mx-auto max-h-[725px]", className)}
      height={trueHeight}
      width={trueWidth * renderWidthMultiplier}
      style={{
        aspectRatio: `auto ${trueWidth} / ${trueHeight}`,
      }}
      {...props}
    >
      {children}
      Your browser does not support the video tag. Here is a
      <Link href={srcs[0]}>link to the video</Link> instead.
    </video>
  )
}
