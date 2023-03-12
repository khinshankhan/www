export interface EmojiInfoTemplate {
  names: readonly string[]
  char?: string
  url: string
}

export class DuplicateEmojiException extends Error {
  constructor(message: string) {
    super(message)
    this.name = "DuplicateEmojiException"
  }
}

export class InvalidEmojiException extends Error {
  constructor(message: string) {
    super(message)
    this.name = "InvalidEmojiException"
  }
}

export interface EmojiInfo {
  char?: string
  url: string
  alt: string
}

export function createEmojiLookup<
  EmojiPack extends readonly EmojiInfoTemplate[],
  Key extends `:${EmojiPack[number]["names"][number]}:`
>(emojiPacks: EmojiPack[], overwrite = false) {
  const lookup = new Map<Key, EmojiInfo>()
  emojiPacks.forEach((emojiPack) => {
    emojiPack.forEach((rawEmojiInfo) => {
      rawEmojiInfo.names.forEach((name) => {
        const key = `:${name}:` as Key

        if (!overwrite && lookup.has(key)) {
          throw new DuplicateEmojiException(`Lookup already has ${key}`)
        }

        lookup.set(key, {
          char: rawEmojiInfo?.char,
          url: rawEmojiInfo.url,
          alt: key,
        })
      })
    })
  })
  return lookup
}
