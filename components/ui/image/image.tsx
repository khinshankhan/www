"use client"

import React, { useState } from "react"
import { default as NextImage, type ImageProps, type StaticImageData } from "next/image"
import { cn } from "@/lib/utils"
import { shouldShowFallbackImage, useImage } from "./use-image"

export function Figure({ src, alt, title, className = "", ...props }: ImageProps) {
  const imageAlt = alt !== "" ? alt : title ?? `This is an image from ${src}`

  return (
    <figure className="relative flex w-full flex-col items-center justify-center">
      <NextImage
        src={src}
        alt={imageAlt}
        title={title || ""}
        {...props}
        className={cn("h-auto w-auto max-w-full rounded-lg", className)}
      />

      {(title || alt) && (
        <figcaption className="mt-4 text-center text-theme-muted">{title || alt}</figcaption>
      )}
    </figure>
  )
}

export function FullImage({ src, alt, height, width, ...props }: ImageProps) {
  const [h, setH] = useState(height ?? 120)
  const [w, setW] = useState(width ?? 9999)

  const status = useImage({
    src: typeof src === "string" ? src : "/fallback.png",
    ...props,
    crossOrigin: props.crossOrigin,
    ignoreFallback: false,
  })
  const showFallbackImage = shouldShowFallbackImage(status, "beforeLoadOrError")

  if (showFallbackImage) {
    // credits https://flowbite.com/docs/components/skeleton/
    return (
      <div role="status" className="flex w-full animate-pulse flex-col items-center justify-center">
        <div
          className="flex max-w-full items-center justify-center rounded-lg bg-gray-11"
          style={{
            height: `${h}px`,
            width: w === 9999 ? `100%` : `${w}px`,
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

  return (
    <Figure
      src={src}
      alt={alt}
      height={h}
      width={w}
      onLoad={({ target, ...rest }) => {
        const { naturalHeight, naturalWidth } = target as HTMLImageElement
        if (!height) setH(naturalHeight)
        if (!width) setW(naturalWidth)

        if (props?.onLoad) {
          props.onLoad({ target, ...rest })
        }
      }}
    />
  )
}

export function LocalImage({ src, alt }: { src: StaticImageData; alt: string }) {
  return <NextImage src={src} alt={alt} />
}
