import React, { Children } from "react"
import { Video, type VideoProps } from "@/components/base/video"
import { SmartLink } from "@/components/composite/smart-link"

export function SmartVideo({ children, ...props }: VideoProps) {
  // extract `src` from `props` or any `<source>` children
  const fallbackSrc =
    props.src ||
    Children.toArray(children)
      .filter((child) => React.isValidElement(child) && child.type === "source")
      .map((child) => (child as React.ReactElement).props.src)[0]

  if (!fallbackSrc) throw new Error("Video has no source!")

  return (
    <Video {...props}>
      {children}

      {/* not sure how to check if a fallback was provided */}
      {!children && fallbackSrc && (
        <>
          Your browser does not support embedded videos. You can{" "}
          <SmartLink href={fallbackSrc}>view the video directly</SmartLink> instead.
        </>
      )}
    </Video>
  )
}
