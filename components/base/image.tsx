"use client"

import React, { Fragment, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import Zoom from "react-medium-image-zoom"

import "react-medium-image-zoom/dist/styles.css"

// prettier-ignore
export interface ImageWithSkeletonProps  extends React.ImgHTMLAttributes<HTMLImageElement> {
disableZoom?: boolean
}

export function Image({
  src,
  width,
  height,
  className = "",
  style = {},
  disableZoom = false,
  ...props
}: ImageWithSkeletonProps) {
  const imgRef = useRef<HTMLImageElement>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // handle cached images
    if (imgRef.current?.complete) {
      setLoading(false)
    }
  }, [src])

  const Wrapper = disableZoom ? Fragment : Zoom

  return (
    <Wrapper>
      <img
        ref={imgRef}
        src={src}
        width={width}
        height={height}
        className={cn(
          // general styles, haven't encountered any issues with these yet
          // can easily be overridden by passing a className prop
          "mx-auto max-h-[725px] max-w-full rounded-lg",
          // shimmer effect for loading images
          // also can be overridden by passing a className prop
          loading && "animate-pulse bg-background-1/60",
          className
        )}
        onLoad={() => {
          setLoading(false)
        }}
        {...props}
      />
    </Wrapper>
  )
}
