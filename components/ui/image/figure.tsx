"use client"

import React, { type ReactNode } from "react"
import { default as NextImage, type ImageProps } from "next/image"
import { cn, getSizeParts } from "@/lib/utils"

export function getImageAlt({ src, alt, title }: { src: string; alt?: string; title?: string }) {
  return alt || title || `This is an image from ${src}`
}

export interface FigureWithCaptionProps {
  alt?: string
  title?: string
  showCaption?: boolean
  children: ReactNode
}
export function FigureWithCaption({
  alt,
  title,
  showCaption = true,
  children,
}: FigureWithCaptionProps) {
  return (
    <figure className="relative flex w-full flex-col items-center justify-center">
      {children}

      {showCaption && (title || alt) && (
        <figcaption className="mt-4 text-center text-theme-muted">{title || alt}</figcaption>
      )}
    </figure>
  )
}

export type FigureProps = Omit<ImageProps, "title" | "alt" | "height" | "width"> & {
  title?: string
  alt?: string
  height?: string | number
  width?: string | number
  showCaption?: boolean
}
export function Figure({
  src,
  alt,
  title,
  height,
  width,
  className = "",
  showCaption = true,
  ...props
}: FigureProps) {
  const { size: trueHeight } = getSizeParts({ size: height })
  const { size: trueWidth } = getSizeParts({ size: width })

  const imageAlt = getImageAlt({ src: typeof src === "string" ? src : "local", alt, title })

  return (
    <FigureWithCaption alt={imageAlt} title={title} showCaption={showCaption}>
      <NextImage
        src={src}
        alt={imageAlt}
        title={title || ""}
        height={trueHeight}
        width={trueWidth}
        {...props}
        className={cn("h-auto w-auto max-w-full rounded-lg", className)}
      />
    </FigureWithCaption>
  )
}
