import React, { type CSSProperties, type IframeHTMLAttributes } from "react"
import { cn } from "@/quicksilver/lib/classname"
import { Figcaption } from "@/quicksilver/react/primitives/figcaption"
import { Link } from "@/quicksilver/react/primitives/link"

export interface YouTubeEmbedProps extends IframeHTMLAttributes<HTMLIFrameElement> {
  src: string
  width: number | string
  height: number | string
  title?: string
  fallbackSrc?: string
  className?: string
}

export function YouTubeEmbed({
  src,
  title = "YouTube Video Embed",
  className,
  fallbackSrc,
  width,
  height,
  loading = "lazy",
  allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
  referrerPolicy = "strict-origin-when-cross-origin",
  style = {},
  ...props
}: YouTubeEmbedProps) {
  const aspectStyles = {
    ["--aspect-width"]: width,
    ["--aspect-height"]: height,
  } as CSSProperties

  return (
    <figure>
      <div
        className="relative !aspect-[var(--aspect-width)/var(--aspect-height)] w-full"
        style={{
          ...aspectStyles,
          ...style,
        }}
      >
        <iframe
          src={src}
          title={title}
          className={cn("absolute inset-0 h-full w-full rounded-lg", className)}
          loading={loading}
          referrerPolicy={referrerPolicy}
          allow={allow}
          {...props}
        />
      </div>

      {fallbackSrc && (
        <Figcaption>
          {`Because I don't trust third parties, `}
          <Link href={fallbackSrc}>{`here's the fallback source`}</Link>.
        </Figcaption>
      )}
    </figure>
  )
}
