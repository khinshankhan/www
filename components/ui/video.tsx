"use client"

import React from "react"

interface VideoProps {
  src: string
  type: "video/mp4" | "video/ogg" | "video/webm"
}

// TODO: add in video skeleton
export function Video({ src, type: videoType }: VideoProps) {
  return (
    <video controls className="mx-auto max-h-[600px]">
      <source src={src} type={videoType} />
      Your browser does not support the video tag.
    </video>
  )
}
