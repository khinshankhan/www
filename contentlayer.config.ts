import { makeSource } from "contentlayer/source-files"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeSlug from "rehype-slug"
import { remarkSimpleEmoji } from "./@khinshankhan/emoji-helper/remark"
import { Page } from "./lib/contentlayer/documents"
import { rehypeMarkExcerpt } from "./lib/contentlayer/plugins"
import { EmojiKey, emojiLookup } from "./lib/emoji"

export default makeSource({
  contentDirPath: "data",
  documentTypes: [Page],
  mdx: {
    esbuildOptions(options) {
      options.target = "esnext"
      return options
    },
    remarkPlugins: [
      [
        remarkSimpleEmoji,
        {
          validate: (name: string) => !!emojiLookup.get(name as EmojiKey),
          lookup: (name: string) => {
            const emoji = emojiLookup.get(name as EmojiKey)
            // NOTE: this should be guranteed due to validate
            return emoji!.alt
          },
        },
      ],
    ],
    rehypePlugins: [
      rehypeMarkExcerpt,
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["anchor"],
          },
        },
      ],
    ],
  },
})
