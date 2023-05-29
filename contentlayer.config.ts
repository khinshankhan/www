import { makeSource } from "contentlayer/source-files"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeSlug from "rehype-slug"
import { Page } from "./lib/contentlayer/documents"
import { rehypeMarkExcerpt } from "./lib/contentlayer/plugins"

export default makeSource({
  contentDirPath: "data",
  documentTypes: [Page],
  mdx: {
    esbuildOptions(options) {
      options.target = "esnext"
      return options
    },
    remarkPlugins: [],
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
