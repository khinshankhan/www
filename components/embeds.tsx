import React from "react"
import { cn } from "@/lib/utils"
import { Link } from "@/components/primitives/link"

interface YouTubeEmbedProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  src: string
  height: number | string
  width: number | string
  title?: string
  className?: string
}
export function YouTubeEmbed({
  src,
  height,
  width,
  title = "YouTube Video",
  className = "",
  style = {},
  ...props
}: YouTubeEmbedProps) {
  // TODO: add in video skeleton
  return (
    <figure>
      <iframe
        src={src}
        title={title}
        height={height}
        width={width}
        style={{
          ["--aspect-width" as any]: width,
          ["--aspect-height" as any]: height,
          ...style,
        }}
        className={cn(
          "!aspect-[var(--aspect-width)/var(--aspect-height)] h-auto w-full",
          className
        )}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        {...props}
      />

      <figcaption>
        Because I don't trust third parties, <Link href={src}>direct link to video on YouTube</Link>
      </figcaption>
    </figure>
  )
}
