"use client"

import React, { Fragment, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import Zoom from "react-medium-image-zoom"

import "react-medium-image-zoom/dist/styles.css"

// prettier-ignore
type ImageElementProps = React.ImgHTMLAttributes<HTMLImageElement>

export interface ImageProps extends ImageElementProps {
  // enforce alt prop for accessibility
  alt: string
  // enforce width and height for layout shift and loading state
  width: string
  height: string
  disableZoom?: boolean
}

export function Image({
  src,
  alt,
  width,
  height,
  className = "",
  disableZoom = false,
  ...props
}: ImageProps) {
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
        alt={alt}
        width={width}
        height={height}
        data-loading={loading}
        className={cn(
          // data-[loading=true] adds shimmer effect for loading images
          "mx-auto max-h-[725px] max-w-full rounded-lg backdrop-blur-none data-[loading=true]:animate-pulse data-[loading=true]:bg-background-1/60 data-[loading=true]:backdrop-blur-sm",
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
