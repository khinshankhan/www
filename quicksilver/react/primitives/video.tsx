"use client"

import React, { Children, Fragment, type ComponentPropsWithRef, type ReactNode } from "react"
import { cn } from "@/quicksilver/lib/classname"
import { Link } from "./link"

// TODO: we'll circle back to "jsx-a11y/media-has-caption", it's currently a bit complicated to handle in this HoC

type VideoElementProps = ComponentPropsWithRef<"video">

export interface VideoProps extends VideoElementProps {
  children?: ReactNode // possibly fallback content
}

// TODO: add in video skeleton, possibly leverage the image shimmer effect
export function Video({ children, className = "", ...props }: VideoProps) {
  return (
    <video
      controls
      className={cn("mx-auto max-h-[725px] rounded-lg border border-muted", className)}
      {...props}
    >
      {children}
    </video>
  )
}

export function SmartVideo({ children, ...props }: VideoProps) {
  // extract `src` from `props` or any `<source>` children
  const fallbackSrc =
    props.src ??
    Children.toArray(children)
      .filter((child) => React.isValidElement(child) && child.type === "source")
      // @ts-expect-error hacky but works
      .map((child) => (child as unknown as React.ReactElement).props.src as unknown as string)[0]

  if (!fallbackSrc) throw new Error("Video has no source!")

  return (
    <Video {...props}>
      {children}

      {/* not sure how to check if a fallback was provided */}
      {!children &&
        fallbackSrc &&
        (typeof fallbackSrc === "string" ? (
          <Fragment>
            Your browser does not support embedded videos. You can{" "}
            <Link href={fallbackSrc}>view the video directly</Link> instead.
          </Fragment>
        ) : (
          <Fragment>Your browser does not support embedded videos.</Fragment>
        ))}
    </Video>
  )
}
