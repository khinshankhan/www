import { remarkSimpleEmoji } from "@khinshankhan/emoji-helper-remark"
import { makeSource } from "contentlayer/source-files"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import remarkUnwrapImages from "remark-unwrap-images"
import { Page, Writing } from "./lib/contentlayer/documents"
import { rehypeMarkExcerpt, remarkJsxifyElements, type MdastNode } from "./lib/contentlayer/plugins"
import { EmojiKey, emojiLookup } from "./lib/emoji"

export default makeSource({
  contentDirPath: "data",
  documentTypes: [Page, Writing],
  mdx: {
    esbuildOptions(options) {
      options.target = "esnext"
      return options
    },
    remarkPlugins: [
      [
        remarkSimpleEmoji,
        {
          validate: (name: string) => emojiLookup.get(name as EmojiKey),
          lookup: (name: string) => {
            const emoji = emojiLookup.get(name as EmojiKey)
            // NOTE: this should be guranteed due to validate
            return emoji!.alt
          },
        },
      ],
      [remarkGfm],
      [remarkUnwrapImages],
      [
        remarkJsxifyElements,
        {
          elements: [
            {
              matcher: (node: MdastNode) =>
                // @ts-expect-error
                (node?.name as string) === "img",
              jsxName: "SmartImage",
            },
            {
              matcher: (node: MdastNode) =>
                // @ts-expect-error
                (node?.name as string) === "video",
              jsxName: "Video",
            },
          ],
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
