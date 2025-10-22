"use client"

import React from "react"
import { emojiLookup, type EmojiKey } from "@/lib/emoji"
import { cn } from "@/quicksilver/lib/classname"
import { InvalidEmojiException } from "@khinshankhan/emoji-helper-core"

interface EmojiProps {
  name: EmojiKey
  className?: string
  wrapperClassName?: string
}

// TODO: add tooltip/ popover support for emoji names
export function Emoji({ name, className = "", wrapperClassName = "" }: EmojiProps) {
  const emojiInfo = emojiLookup.get(name)
  if (emojiInfo === undefined) {
    throw new InvalidEmojiException(`Emoji not found ${name}`)
  }

  return (
    <span className={wrapperClassName}>
      <img
        className={cn("inline aspect-auto size-[1em]", className)}
        src={emojiInfo.url}
        alt={emojiInfo.char ?? emojiInfo.alt}
        aria-label={emojiInfo.alt}
        data-type="emoji"
        draggable="false"
        height="72"
        width="72"
      />
    </span>
  )
}

export default Emoji
