"use client"

import { useState } from "react"
import { Image } from "@/quicksilver/react/primitives/image"
import { info } from "@/settings"

export function ProfileImage() {
  const [isActive, setIsActive] = useState(false)

  return (
    <button
      type="button"
      aria-label="Toggle profile image appearance"
      aria-pressed={isActive}
      data-active={isActive}
      className="group relative isolate cursor-pointer appearance-none rounded-[128px] border-0 bg-transparent p-0 md:ml-8"
      style={{
        minWidth: "256px",
        minHeight: "256px",
      }}
      onClick={() => setIsActive((prev) => !prev)}
    >
      <Image
        alt="Profile Image"
        width="256"
        height="256"
        src={info.avatarUrl}
        data-active={isActive}
        className="z-0 rotate-180 rounded-[128px] border-8 border-foreground-muted mix-blend-multiply saturate-0 transition-all duration-300 ease-in-out select-none group-hover:rotate-0 group-hover:border-0 group-hover:saturate-200 data-[active=true]:rotate-0 data-[active=true]:border-0 data-[active=true]:saturate-200"
        style={{
          aspectRatio: "256/256",
          objectFit: "cover",
        }}
        draggable="false"
        disableZoom
      />
      {/* span, not div: <button> only permits phrasing content */}
      <span
        data-active={isActive}
        className="noise block before:z-1 before:rounded-[128px] before:opacity-100 group-hover:before:-z-1 group-hover:before:rounded-none group-hover:before:opacity-0 data-[active=true]:before:-z-1 data-[active=true]:before:rounded-none data-[active=true]:before:opacity-0"
      />
    </button>
  )
}
