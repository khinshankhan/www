// NOTE: someday this might become a library...

export interface EmojiInfoTemplate {
  names: readonly string[]
  url: string
  char?: string
  // not sure if this is useful but it might be interesting
  description?: string
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

export function createEmojiLookup<
  EmojiPack extends readonly EmojiInfoTemplate[],
  Key extends `:${EmojiPack[number]["names"][number]}:`
>(emojiPacks: EmojiPack[], overwrite = false, supressOverwriteWarnings = false) {
  const lookup = new Map<Key, { alt: Key; url: string; char?: string | undefined }>()

  emojiPacks.forEach((emojiPack) => {
    emojiPack.forEach((rawEmojiInfo) => {
      rawEmojiInfo.names.forEach((name) => {
        const key = `:${name}:` as Key

        if (lookup.has(key)) {
          if (!overwrite) {
            throw new DuplicateEmojiException(`Lookup already has ${key}`)
          }
          if (!supressOverwriteWarnings) {
            console.warn(`Lookup already has ${key}`)
          }
        }

        lookup.set(key, {
          alt: key,
          url: rawEmojiInfo.url,
          char: rawEmojiInfo?.char,
        })
      })
    })
  })

  return lookup
}
