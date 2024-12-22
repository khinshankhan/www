import React from "react"
import { Figcaption } from "@/components/base/figure"
import { SmartLink } from "@/components/composite/smart-link"
import { cn } from "@/lib/utils"

type IframeProps = React.IframeHTMLAttributes<HTMLIFrameElement>

interface YouTubeEmbedProps extends IframeProps {
  src: string
  height: number | string
  width: number | string
  title?: string
  className?: string
  fallbackSrc?: string
}
export function YouTubeEmbed({
  src,
  height,
  width,
  title = "YouTube Video Embed",
  fallbackSrc = undefined,
  className = "",
  style = {},
  ...props
}: YouTubeEmbedProps) {
  const aspectStyles = {
    ["--aspect-width"]: width,
    ["--aspect-height"]: height,
  } as React.CSSProperties

  // TODO: add in video skeleton
  return (
    <figure>
      <iframe
        src={src}
        title={title}
        height={height}
        width={width}
        style={{
          ...aspectStyles,
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

      {fallbackSrc && (
        <Figcaption>
          Because I {`don't`} trust third parties,{" "}
          <SmartLink href={fallbackSrc}>{`here's`} the fallback source</SmartLink>.
        </Figcaption>
      )}
    </figure>
  )
}

interface SpotifyEmbedProps extends IframeProps {
  src: string
  height: number | string
  width: number | string
  title?: string
  className?: string
  fallbackSrc?: string
}
export function SpotifyEmbed({
  src,
  height,
  width,
  title = "Spotify Embed",
  fallbackSrc = undefined,
  className = "",
  style = {},
  ...props
}: SpotifyEmbedProps) {
  const aspectStyles = {
    ["--aspect-width"]: width,
    ["--aspect-height"]: height,
  } as React.CSSProperties

  // TODO: add in video skeleton
  return (
    <figure>
      <iframe
        src={src}
        title={title}
        height={height}
        width={width}
        style={{
          ...aspectStyles,
          ...style,
        }}
        className={cn("rounded-[14px] border-none", className)}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen
        loading="lazy"
        {...props}
      />

      {fallbackSrc && (
        <Figcaption>
          Because I {`don't`} trust third parties,{" "}
          <SmartLink href={fallbackSrc}>{`here's`} the fallback source</SmartLink>.
        </Figcaption>
      )}
    </figure>
  )
}
