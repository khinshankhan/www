import { makeSource } from "contentlayer/source-files"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeSlug from "rehype-slug"

import * as documentTypes from "./lib/contentlayer/documents"

export default makeSource({
  contentDirPath: "data",
  documentTypes,
  mdx: {
    esbuildOptions(options) {
      options.target = "esnext"
      return options
    },
    remarkPlugins: [],
    rehypePlugins: [
      [rehypeSlug],
      [rehypeAutolinkHeadings, { behavior: "wrap", properties: { className: ["anchor"] } }],
    ],
  },
})
