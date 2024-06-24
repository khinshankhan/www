"use client"

import React, { useState } from "react"
import { InvalidEmojiException } from "@khinshankhan/emoji-helper-core"
import { emojiLookup, type EmojiKey } from "@/lib/emoji"
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from "@/components/primitives/popover"
import { typographyVariants } from "@/components/primitives/typography"

interface EmojiProps {
  name: EmojiKey
  className?: string
  wrapperClassName?: string
}
export function Emoji({ name, className = "", wrapperClassName = "" }: EmojiProps) {
  const [hovering, setHovering] = useState(false)
  const [clicked, setClicked] = useState(false)

  const emojiInfo = emojiLookup.get(name)
  if (emojiInfo === undefined) {
    throw new InvalidEmojiException(`Emoji not found ${name}`)
  }

  const handleMouseEnter = () => setHovering(true)
  const handleMouseLeave = () => setHovering(false)

  const isPopoverOpen = hovering || clicked

  return (
    <span className={wrapperClassName}>
      <Popover open={isPopoverOpen}>
        <PopoverTrigger
          asChild
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => setClicked((prev) => !prev)}
        >
          {/* eslint-disable @next/next/no-img-element */}
          <img
            className={cn("inline aspect-auto size-[1em]", className)}
            src={emojiInfo.url}
            alt={emojiInfo.char || emojiInfo.alt}
            aria-label={emojiInfo.alt}
            data-type="emoji"
            draggable="false"
            height="72px"
            width="72px"
          />
        </PopoverTrigger>
        <PopoverContent
          side="top"
          className={cn(typographyVariants({ variant: "small" }), "w-full p-2")}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onPointerDownOutside={() => setClicked(false)}
        >
          <span>{emojiInfo.alt}</span>
          <PopoverArrow className="fill-knockout" width={11} height={5} />
        </PopoverContent>
      </Popover>
    </span>
  )
}

export default Emoji
