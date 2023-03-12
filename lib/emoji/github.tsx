import { type EmojiInfoTemplate } from "./lib"

export const githubEmoji = [
  {
    names: ["+1"] as const,
    char: "👍",
    url: "https://github.githubassets.com/images/icons/emoji/unicode/1f44d.png?v8",
  },
  {
    names: ["point_down"] as const,
    char: "👇",
    url: "https://github.githubassets.com/images/icons/emoji/unicode/1f447.png?v8",
  },
  // TODO: fill in chars
  {
    names: ["point_left"] as const,
    url: "https://github.githubassets.com/images/icons/emoji/unicode/1f448.png?v8",
  },
  {
    names: ["point_right"] as const,
    url: "https://github.githubassets.com/images/icons/emoji/unicode/1f449.png?v8",
  },
  {
    names: ["point_up"] as const,
    url: "https://github.githubassets.com/images/icons/emoji/unicode/261d.png?v8",
  },
  {
    names: ["point_up_2"] as const,
    url: "https://github.githubassets.com/images/icons/emoji/unicode/1f446.png?v8",
  },
] as const satisfies readonly EmojiInfoTemplate[]
