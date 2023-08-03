"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { Figure, FigureWithCaption, getImageAlt, type FigureProps } from "./figure"
import { images } from "./lookup"
import { shouldShowFallbackImage, useImage } from "./use-image"

interface SkeletonImageProps {
  height: string | number
  width: string | number
  className?: string
  alt?: string
  title?: string
}
// credits https://flowbite.com/docs/components/skeleton/
export function SkeletonImage({ height, width, className = "", alt, title }: SkeletonImageProps) {
  return (
    <FigureWithCaption alt={getImageAlt({ src: "Skeletal loading image", alt, title })}>
      <div role="status" className="flex w-full animate-pulse flex-col items-center justify-center">
        <div
          className={cn(
            "flex h-auto max-w-full items-center justify-center rounded-lg bg-gray-11",
            className,
            className.includes("aspect-") && "!h-auto"
          )}
          style={{
            height: height,
            width: width,
          }}
        >
          <svg
            className="h-10 w-10 text-gray-12"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    </FigureWithCaption>
  )
}

export function FullImage({ src, alt, height, width, title, ...props }: FigureProps) {
  const h = height ?? 400 // good default
  const w = width ?? 9999

  const { status, naturalHeight, naturalWidth } = useImage({
    src: typeof src === "string" ? src : "/fallback.png",
    ...props,
    crossOrigin: props.crossOrigin,
    ignoreFallback: false,
  })
  const showFallbackImage = shouldShowFallbackImage(status, "beforeLoadOrError")

  if (showFallbackImage) {
    return (
      <SkeletonImage
        height={h}
        width={w === 9999 ? "100%" : w}
        alt={alt}
        title={title}
        className={props?.className}
      />
    )
  }

  return (
    <Figure
      src={src}
      alt={alt}
      title={title}
      height={height ?? naturalHeight}
      width={width ?? naturalWidth}
      {...props}
    />
  )
}

export function SmartImage({ src, height, width, ...props }: FigureProps) {
  // @ts-ignore
  const lookupInfo = images?.[src]

  return (
    <FullImage
      src={lookupInfo?.src ?? src}
      height={lookupInfo?.height ?? height}
      width={lookupInfo?.width ?? width}
      {...props}
    />
  )
}
