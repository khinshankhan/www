import React from "react"

import { InvalidEmojiException, emojiLookup, type EmojiKey } from "lib/emoji"

export function Emoji({ name }: { name: EmojiKey }) {
  const emojiInfo = emojiLookup.get(name)
  if (emojiInfo === undefined) {
    throw new InvalidEmojiException(`Emoji not found ${name}`)
  }

  return (
    <span>
      <img
        className="inline aspect-auto w-[1em]"
        alt={emojiInfo.char || emojiInfo.alt}
        src={emojiInfo.url}
      />
    </span>
  )
}

export default Emoji
