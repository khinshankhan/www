import Slugger from "github-slugger"
import type { Root as MdastRoot } from "mdast"
import { toString } from "mdast-util-to-string"
import type { Transformer } from "unified"
import { SKIP, visit } from "unist-util-visit"

export interface TocItem {
  id: string
  title: string
  depth: number
}

// only need one slugger instance for the entire build
const slugger = new Slugger()

type Options = {
  reservedIds?: string[]
}

const defaultOptions = {
  reservedIds: [],
} satisfies Options

// prettier-ignore
export function remarkTocExport(options?: Options): Transformer<MdastRoot, MdastRoot> {
  const settings = {
    reservedIds: options?.reservedIds ?? defaultOptions.reservedIds,
  }

  return function transformer(tree, vfile) {
    const toc: TocItem[] = []
    vfile.data.toc = toc

    // slugger is reset per file so that the same heading text in different files can have the same slug
    slugger.reset()
    settings.reservedIds.forEach((reservedId) => slugger.slug(reservedId))

    /**
     * NOTE:
     * "heading" is a node type in mdast representing markdown headings such as #, ##, ###, etc.
     * This node type does not refer to the <h1>, <h2>, <h3>, etc. HTML tags at the mdast level.
     * At the mdast level, <h1>, <h2>, <h3>, etc. are considered "html" nodes, and this plugin won't support them.
     */
    visit(tree, "heading", function (node) {
      const value = toString(node, { includeImageAlt: false })

      toc.push({
        id: slugger.slug(value),
        title: value,
        depth: node.depth,
      })

      return SKIP
    })

    vfile.data.toc = toc
  }
}
