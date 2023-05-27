import { makeSource } from "contentlayer/source-files"
import { Page } from "./lib/contentlayer/documents"

export default makeSource({
  contentDirPath: "data",
  documentTypes: [Page],
  mdx: {
    esbuildOptions(options) {
      options.target = "esnext"
      return options
    },
    remarkPlugins: [],
    rehypePlugins: [],
  },
})
