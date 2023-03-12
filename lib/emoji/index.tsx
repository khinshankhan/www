import { type MapKey } from "lib/utils"

import { githubEmoji } from "./github"
import { createEmojiLookup, type EmojiInfoTemplate } from "./lib"

export * from "./lib"
export * from "./github"

export const tphEmoji = [
  {
    names: ["blaze"] as const,
    url: "https://cdn.discordapp.com/emojis/350426514262720514.webp?size=44&quality=lossless",
  },
] as const satisfies readonly EmojiInfoTemplate[]

export const emojiLookup = createEmojiLookup([githubEmoji, tphEmoji])
export type EmojiKey = MapKey<typeof emojiLookup>
