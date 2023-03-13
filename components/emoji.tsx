import React from "react"

import { InvalidEmojiException, emojiLookup, type EmojiKey } from "lib/emoji"

import { Tooltip, TooltipContent, TooltipTrigger } from "components/ui/tooltip"

export function Emoji({ name }: { name: EmojiKey }) {
  const emojiInfo = emojiLookup.get(name)
  if (emojiInfo === undefined) {
    throw new InvalidEmojiException(`Emoji not found ${name}`)
  }

  return (
    <span>
      <Tooltip>
        <TooltipTrigger>
          <img
            className="inline aspect-auto w-[1em]"
            src={emojiInfo.url}
            alt={emojiInfo.char || emojiInfo.alt}
            aria-label={emojiInfo.alt}
            data-type="emoji"
            draggable="false"
          />
        </TooltipTrigger>
        <TooltipContent>{emojiInfo.alt}</TooltipContent>
      </Tooltip>
    </span>
  )
}

export default Emoji
