import { type EmojiInfoTemplate } from "./lib"

export const githubEmoji = [
  {
    names: ["+1"] as const,
    char: "👍",
    url: "https://github.githubassets.com/images/icons/emoji/unicode/1f44d.png?v8",
  },
] as const satisfies readonly EmojiInfoTemplate[]
