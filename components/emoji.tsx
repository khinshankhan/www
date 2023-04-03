import React from "react"
import { InvalidEmojiException } from "@/dead-simple-emoji"
import { emojiLookup, type EmojiKey } from "@/lib/emoji"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui"

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
      <Tooltip>
        <TooltipTrigger asChild>
          {/* eslint-disable @next/next/no-img-element */}
          <img
            className={cn("inline aspect-auto h-[1em]", className)}
            src={emojiInfo.url}
            alt={emojiInfo.char || emojiInfo.alt}
            aria-label={emojiInfo.alt}
            data-type="emoji"
            draggable="false"
          />
        </TooltipTrigger>
        <TooltipContent>
          <span>{emojiInfo.alt}</span>
        </TooltipContent>
      </Tooltip>
    </span>
  )
}

export default Emoji
