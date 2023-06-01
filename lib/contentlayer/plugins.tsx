import { type Root as HastRoot } from "hast"
import type { Transformer } from "unified"
import { EXIT, SKIP, visit } from "unist-util-visit"

// NOTE: all of my content will definitely have at least 1 paragraph, take it to be guranteed
export function rehypeMarkExcerpt(): Transformer<HastRoot, HastRoot> {
  return function (tree) {
    visit(tree, "element", (node) => {
      if (node.tagName !== "p") return [SKIP]
      node!.properties!.id = "excerpt"
      return [EXIT]
    })
  }
}
