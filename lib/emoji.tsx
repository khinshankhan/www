import { createEmojiLookup, type EmojiInfoTemplate } from "../@khinshankhan/emoji-helper/core"
import githubEmoji from "../@khinshankhan/emoji-helper/github"

type MapKey<T> = T extends Map<infer K, any> ? K : never

export const customEmoji = [
  {
    names: ["nod"],
    url: "https://cdn.discordapp.com/emojis/783794548442136666.gif?amp;quality=lossless",
  },
  {
    names: ["akko_shrug"],
    url: "https://cdn.discordapp.com/emojis/730622175211683941.webp?quality=lossless",
  },
  {
    names: ["blob_evil"],
    url: "https://cdn.discordapp.com/emojis/585580174960230400.webp?quality=lossless",
  },
] as const satisfies readonly EmojiInfoTemplate[]

export const emojiLookup = createEmojiLookup([githubEmoji, customEmoji], true, true)
export type EmojiKey = MapKey<typeof emojiLookup>
