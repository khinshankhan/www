import { createEmojiLookup, type EmojiInfoTemplate } from "@khinshankhan/emoji-helper-core"
import githubEmoji from "@khinshankhan/emoji-helper-pack-github"

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
  {
    names: ["success_kid"],
    url: "https://cdn.discordapp.com/emojis/753870958544158800.webp?size=44&quality=lossless",
  },
  {
    names: ["anko_bleh"],
    url: "https://cdn.discordapp.com/emojis/634884904689074187.gif?amp;quality=lossless",
  },
  {
    names: ["blobsweats"],
    url: "https://cdn.discordapp.com/emojis/443156750204665878.gif?amp;quality=lossless",
  },
  {
    names: ["world-map"],
    url: "https://em-content.zobj.net/source/samsung/78/world-map_1f5fa.png",
  },
] as const satisfies readonly EmojiInfoTemplate[]

export const emojiLookup = createEmojiLookup([githubEmoji, customEmoji], true, true)
export type EmojiKey = MapKey<typeof emojiLookup>
