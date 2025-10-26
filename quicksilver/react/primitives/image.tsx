"use client"

import React, {
  Fragment,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ImgHTMLAttributes,
} from "react"
import { cn } from "@/quicksilver/lib/classname"
import Zoom from "react-medium-image-zoom"

import "react-medium-image-zoom/dist/styles.css"

type ImageElementProps = ImgHTMLAttributes<HTMLImageElement>

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
  style = {},
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

  const aspectRatioStyles = {
    ["--data-width"]: width,
    ["--data-height"]: height,
  } as CSSProperties

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
          "mx-auto aspect-[var(--data-width)/var(--data-height)] max-h-[725px] max-w-full rounded-lg border border-muted backdrop-blur-none",
          // data-[loading=true] adds shimmer effect for loading images
          "script:data-[loading=true]:animate-pulse script:data-[loading=true]:bg-background-1/60 script:data-[loading=true]:backdrop-blur-xs",
          className
        )}
        style={{
          ...aspectRatioStyles,
          ...style,
        }}
        onLoad={() => {
          setLoading(false)
        }}
        {...props}
      />
    </Wrapper>
  )
}
