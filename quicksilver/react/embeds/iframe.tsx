import React, { type CSSProperties, type IframeHTMLAttributes } from "react"
import { cn } from "@/quicksilver/lib/classname"

export interface EmbedIframeProps extends IframeHTMLAttributes<HTMLIFrameElement> {
  width: number | string
  height: number | string
  className?: string
}

export function EmbedIframe({
  height,
  width,
  className,
  loading = "lazy",
  referrerPolicy = "strict-origin-when-cross-origin",
  allow,
  style = {},
  ...props
}: EmbedIframeProps) {
  const aspectStyles = {
    ["--aspect-width"]: width,
    ["--aspect-height"]: height,
  } as CSSProperties

  return (
    <div
      className="relative !aspect-[var(--aspect-width)/var(--aspect-height)] w-full"
      style={{
        ...aspectStyles,
        ...style,
      }}
    >
      <iframe
        loading={loading}
        referrerPolicy={referrerPolicy}
        allow={allow}
        className={cn("absolute inset-0 h-full w-full rounded-lg", className)}
        {...props}
      />
    </div>
  )
}
