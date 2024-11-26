"use client"

import React from "react"
import { emojiLookup, type EmojiKey } from "@/lib/emoji"
import { cn } from "@/lib/utils"
import { InvalidEmojiException } from "@khinshankhan/emoji-helper-core"

interface EmojiProps {
  name: EmojiKey
  className?: string
  wrapperClassName?: string
}
export function Emoji({ name, className = "", wrapperClassName = "" }: EmojiProps) {
  const emojiInfo = emojiLookup.get(name)
  if (emojiInfo === undefined) {
    throw new InvalidEmojiException(`Emoji not found ${name}`)
  }

  return (
    <span className={wrapperClassName}>
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
    </span>
  )
}

export default Emoji
