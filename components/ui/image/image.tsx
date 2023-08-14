"use client"

import React, { type CSSProperties } from "react"
import { default as NextImage, type ImageProps } from "next/image"
import { cn, getSizeParts } from "@/lib/utils"
import { shouldShowFallbackImage, useImage } from "./use-image"

interface SkeletonImageProps {
  height: string | number
  width: string | number
  className?: string
  style: CSSProperties
}

// credits https://flowbite.com/docs/components/skeleton/
export function SkeletonImage({ height, width, className = "", style = {} }: SkeletonImageProps) {
  return (
    <div role="status" className="flex w-full animate-pulse flex-col items-center justify-center">
      <div
        className={cn(
          "flex h-auto max-w-full items-center justify-center rounded-lg bg-gray-11",
          className,
          className.includes("aspect-") && "!h-auto"
        )}
        style={{
          height: `${height}px`,
          width: `${width}px`,
          ...style,
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
  )
}

interface GetImageAltProps {
  src: string
  alt?: string
  title?: string
}
export function getImageAlt({ src, alt, title }: GetImageAltProps) {
  return alt || title || `This is an image from ${src}`
}

type FigureProps = Omit<ImageProps, "title" | "alt" | "height" | "width"> & {
  src: string
  alt?: string
  title?: string
  height: string | number
  width: string | number

  showCaption?: boolean
  loaded?: boolean
  className?: string
  style?: CSSProperties
}
export function Figure({
  src,
  alt,
  title,
  height,
  width,
  showCaption = false,
  loaded = false,
  className = "",
  style = {},
}: FigureProps) {
  const { size: trueHeight } = getSizeParts({ size: height })
  const { size: trueWidth } = getSizeParts({ size: width })

  const imageAlt = getImageAlt({ src: typeof src === "string" ? src : "local", alt, title })

  const Component = loaded ? SkeletonImage : NextImage

  return (
    <figure>
      <Component
        src={src}
        alt={imageAlt}
        title={title || ""}
        height={trueHeight}
        width={trueWidth}
        style={{
          ["--aspect-width" as any]: trueWidth,
          ["--aspect-height" as any]: trueHeight,
          ...style,
        }}
        className={className}
      />

      {showCaption && (title || imageAlt) && (
        <figcaption className="mt-4 text-center text-theme-muted">{title || imageAlt}</figcaption>
      )}
    </figure>
  )
}

export function SmartImage({ src, className = "", ...props }: FigureProps) {
  const { status } = useImage({
    src: typeof src === "string" ? src : "/fallback.png",
    ...props,
    crossOrigin: props.crossOrigin,
    ignoreFallback: false,
  })
  const showFallbackImage = shouldShowFallbackImage(status, "beforeLoadOrError")

  return (
    <Figure
      {...props}
      src={src}
      className={cn(
        "mx-auto h-auto max-h-[725px] w-auto max-w-full max-w-full rounded-lg",
        className,
        !className.includes("aspect-") && "!aspect-[var(--aspect-width)/var(--aspect-height)]"
      )}
      loaded={showFallbackImage}
    />
  )
}
