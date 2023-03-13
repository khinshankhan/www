import { type MapKey } from "lib/utils"

import { githubEmoji } from "./github"
import { createEmojiLookup, type EmojiInfoTemplate } from "./lib"

export * from "./lib"
export * from "./github"

export const customEmoji = [
  {
    names: ["blaze"] as const,
    url: "https://cdn.discordapp.com/emojis/350426514262720514.webp?size=44&quality=lossless",
  },
  {
    names: ["nod"] as const,
    url: "https://cdn.discordapp.com/emojis/783794548442136666.gif?size=44&amp;quality=lossless",
  },
  {
    names: ["akkoShrug"] as const,
    url: "https://cdn.discordapp.com/emojis/730622175211683941.webp?size=44&quality=lossless",
  },
  {
    names: ["blobEvil"] as const,
    url: "https://cdn.discordapp.com/emojis/585580174960230400.webp?size=44&quality=lossless",
  },
] as const satisfies readonly EmojiInfoTemplate[]

export const emojiLookup = createEmojiLookup([githubEmoji, customEmoji])
export type EmojiKey = MapKey<typeof emojiLookup>
