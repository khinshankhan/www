import { makeSource } from "contentlayer/source-files";
import * as documentTypes from "./lib/contentlayer/documents";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import remarkUnwrapImages from "remark-unwrap-images";
import type { Options } from "rehype-pretty-code";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeMarkExcerpt from "./lib/rehype/rehypeMarkExcerpt";

let count = 0;
const rehypePrettyCodeOptions: Partial<Options> = {
  // Use one of Shiki's packaged themes
  theme: {
    light: "github-light",
    dark: "github-dark-dimmed",
  },
  onVisitLine: (node) => {
    // Prevent lines from collapsing in `display: grid` mode, and
    // allow empty lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
    count = 0;
  },
  onVisitHighlightedLine: (node) => {
    node.properties.className.push("highlighted");
  },
  onVisitHighlightedWord: (node) => {
    node.properties.style = ""; // inline has more specificity than class names, so just reset
    node.properties.className = [`word-highlighted-${count}`];
    count += 1;
  },
};

export default makeSource({
  contentDirPath: `data`,
  documentTypes,
  mdx: {
    esbuildOptions(options) {
      options.target = "esnext";
      return options;
    },
    remarkPlugins: [[remarkGfm], [remarkUnwrapImages]],
    rehypePlugins: [[rehypeSlug], [rehypePrettyCode, rehypePrettyCodeOptions], [rehypeMarkExcerpt]],
  },
});
