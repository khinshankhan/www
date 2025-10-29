import React from "react"
import { cn } from "@/quicksilver/lib/classname"
import { Figcaption } from "@/quicksilver/react/primitives/figcaption"
import { Link } from "@/quicksilver/react/primitives/link"
import { EmbedIframe, type EmbedIframeProps } from "./iframe"

export interface YouTubeEmbedProps extends EmbedIframeProps {
  src: string
  title?: string
  fallbackSrc?: string
}

export function YouTubeEmbed({
  src,
  title = "YouTube Video Embed",
  className,
  fallbackSrc,
  width,
  height,
  allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
  ...props
}: YouTubeEmbedProps) {
  return (
    <figure>
      <EmbedIframe
        src={src}
        title={title}
        width={width}
        height={height}
        allow={allow}
        className={cn("max-h-[725px] rounded-lg border border-muted", className)}
        {...props}
      />

      {fallbackSrc && (
        <Figcaption>
          {`Because I don't trust third parties, `}
          <Link href={fallbackSrc}>{`here's the fallback source`}</Link>.
        </Figcaption>
      )}
    </figure>
  )
}
