import Slugger from "github-slugger"
import type { Root as HastRoot } from "hast"
import { headingRank } from "hast-util-heading-rank"
import { toString } from "hast-util-to-string"
import type { Transformer } from "unified"
import { visit } from "unist-util-visit"

// only need one slugger instance for the entire build
const slugger = new Slugger()

interface Options {
  prefix?: string
  reservedIds?: string[]
}

const defaultOptions = {
  prefix: "",
  reservedIds: [],
} satisfies Options

export function rehypeSlug(options?: Options): Transformer<HastRoot, HastRoot> {
  const settings = {
    prefix: options?.prefix ?? defaultOptions.prefix,
    reservedIds: options?.reservedIds ?? defaultOptions.reservedIds,
  }

  return function (tree) {
    // slugger is reset per file so that the same heading text in different files can have the same slug
    slugger.reset()
    settings.reservedIds.forEach((reservedId) => slugger.slug(reservedId))

    // NOTE: by transversing "element" nodes, we can ensure that we only add ids to headings
    // that are coming from markdown and not HTML literals
    visit(tree, "element", function (node) {
      if (headingRank(node) && !node.properties.id) {
        node.properties.id = settings.prefix + slugger.slug(toString(node))
      }
    })
  }
}
