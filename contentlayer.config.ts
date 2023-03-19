import { makeSource } from "contentlayer/source-files"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"

import * as documentTypes from "./lib/contentlayer/documents"
import { rehypeMarkExcerpt } from "./lib/contentlayer/plugins"

export default makeSource({
  contentDirPath: "data",
  documentTypes,
  mdx: {
    esbuildOptions(options) {
      options.target = "esnext"
      return options
    },
    remarkPlugins: [[remarkGfm]],
    rehypePlugins: [
      [rehypeSlug],
      [rehypeAutolinkHeadings, { behavior: "wrap", properties: { className: ["anchor"] } }],
      [rehypeMarkExcerpt],
    ],
  },
})
