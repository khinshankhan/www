import React, { type CSSProperties, type IframeHTMLAttributes } from "react"
import { cn } from "@/quicksilver/lib/classname"
import { Figcaption } from "@/quicksilver/react/primitives/figcaption"
import { Link } from "@/quicksilver/react/primitives/link"

export interface SpotifyEmbedProps extends IframeHTMLAttributes<HTMLIFrameElement> {
  src: string
  width: number | string
  height: number | string
  title?: string
  fallbackSrc?: string
  className?: string
}

export function SpotifyEmbed({
  src,
  width,
  height,
  title = "Spotify Embed",
  fallbackSrc,
  className = "",
  style = {},
  allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",
  loading = "lazy",
  referrerPolicy = "strict-origin-when-cross-origin",
  ...props
}: SpotifyEmbedProps) {
  const aspectStyles = {
    ["--aspect-width"]: width,
    ["--aspect-height"]: height,
  } as CSSProperties

  return (
    <figure>
      <div
        className="overflow-hidden border border-muted"
        style={{
          borderRadius: "14px",
        }}
      >
        <iframe
          src={src}
          title={title}
          width={width}
          height={height}
          className={cn("border-none", className)}
          style={{
            ...aspectStyles,
            borderRadius: "14px",
            ...style,
          }}
          loading={loading}
          referrerPolicy={referrerPolicy}
          allow={allow}
          allowFullScreen
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
