"use client"

import React, { Fragment, type CSSProperties } from "react"
import { default as NextImage, type ImageProps as NextImageProps } from "next/image"
import Zoom from "react-medium-image-zoom"
import { cn, getSizeParts } from "@/lib/utils"
import { shouldShowFallbackImage, useImage } from "./use-image"

import "react-medium-image-zoom/dist/styles.css"

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
          "flex h-auto max-w-full items-center justify-center rounded-lg bg-muted-foreground",
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
          className="size-24 max-h-full max-w-full"
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
function getImageAlt({ src, alt, title }: GetImageAltProps) {
  return alt || title || `This is an image from ${src}`
}

type ImageProps = Omit<NextImageProps, "title" | "alt" | "height" | "width"> & {
  src: string
  alt?: string
  title?: string
  height: string | number
  width: string | number

  className?: string
  style?: CSSProperties

  showFallbackImage?: boolean
  zoomable?: boolean
}
export function Image({
  src,
  alt,
  title,
  height,
  width,
  className = "",
  style = {},
  showFallbackImage = false,
  zoomable = false,
}: ImageProps) {
  const { size: trueHeight } = getSizeParts({ size: height })
  const { size: trueWidth } = getSizeParts({ size: width })

  const imageAlt = getImageAlt({ src: typeof src === "string" ? src : "local", alt, title })

  const Component = showFallbackImage ? SkeletonImage : NextImage
  const Wrapper = zoomable && !showFallbackImage ? Zoom : Fragment

  return (
    <Wrapper>
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
    </Wrapper>
  )
}

export function SmartImage({
  src,
  className = "",
  alt = "",
  zoomable = true,
  ...props
}: ImageProps) {
  const { status } = useImage({
    src: typeof src === "string" ? src : "/fallback.png",
    ...props,
    crossOrigin: props.crossOrigin,
    ignoreFallback: false,
  })
  const showFallbackImage = shouldShowFallbackImage(status, "beforeLoadOrError")

  return (
    <>
      <Image
        alt={alt}
        src={src}
        className={cn(
          "hide-no-js mx-auto size-auto max-h-[725px] max-w-full rounded-lg",
          className,
          !className.includes("aspect-") && "!aspect-[var(--aspect-width)/var(--aspect-height)]"
        )}
        showFallbackImage={showFallbackImage}
        zoomable={zoomable}
        {...props}
      />

      <noscript>
        <img
          alt={alt}
          src={src}
          className={cn(
            "show-no-js mx-auto hidden size-auto max-h-[725px] max-w-full rounded-lg",
            className,
            !className.includes("aspect-") && "!aspect-[var(--aspect-width)/var(--aspect-height)]"
          )}
          {...props}
          style={{
            ["--aspect-width" as any]: props.width,
            ["--aspect-height" as any]: props.height,
            ...(props?.style ?? {}),
          }}
        />
      </noscript>
    </>
  )
}
