"use client"

import React, { useState } from "react"
import { emojiLookup, type EmojiKey } from "@/lib/emoji"
import { cn } from "@/quicksilver/lib/classname"
import { textVariants } from "@/quicksilver/react/primitives/text.variants"
import {
  TooltipArrow,
  TooltipContent,
  TooltipRoot,
  TooltipTrigger,
} from "@/quicksilver/react/primitives/tooltip"
import { InvalidEmojiException } from "@khinshankhan/emoji-helper-core"

interface EmojiProps {
  name: EmojiKey
  className?: string
  wrapperClassName?: string
}

// TODO: add tooltip/ popover support for emoji names
export function Emoji({
  name,
  className: providedClassName = "",
  wrapperClassName = "",
}: EmojiProps) {
  const [hovering, setHovering] = useState(false)
  const [clicked, setClicked] = useState(false)

  const handleMouseEnter = () => setHovering(true)
  const handleMouseLeave = () => setHovering(false)

  const isTooltipOpen = hovering || clicked

  const emojiInfo = emojiLookup.get(name)
  if (emojiInfo === undefined) {
    throw new InvalidEmojiException(`Emoji not found ${name}`)
  }

  return (
    <span className={wrapperClassName}>
      <TooltipRoot
        open={isTooltipOpen}
        onOpenChange={(_, eventDetail) => {
          if (eventDetail.reason === "outside-press") {
            setClicked(false)
          }
        }}
      >
        <TooltipTrigger
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => setClicked((prev) => !prev)}
          render={({ className = "", ...props }) => (
            <img
              {...props}
              className={cn("inline aspect-auto size-[1em]", className, providedClassName)}
              src={emojiInfo.url}
              alt={emojiInfo.char ?? emojiInfo.alt}
              aria-label={emojiInfo.alt}
              data-type="emoji"
              draggable="false"
              height="72"
              width="72"
            />
          )}
        />
        <TooltipContent
          side="top"
          className={cn(textVariants({ variant: "xs" }), "w-full p-2")}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span className="text-surface-1">{emojiInfo.alt}</span>
          <TooltipArrow />
        </TooltipContent>
      </TooltipRoot>
    </span>
  )
}

export default Emoji
