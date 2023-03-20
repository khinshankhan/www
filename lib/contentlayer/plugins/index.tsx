// @ts-nocheck
import { type Root as HastRoot } from "hast"
import { type Root as MdastRoot } from "mdast"
import { Transformer } from "unified"
import find from "unist-util-find"
import { EXIT, SKIP, visit } from "unist-util-visit"

// TODO: add types
export function rehypeMarkExcerpt(): Transformer<HastRoot, HastRoot> {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node?.tagName !== "p") return [SKIP]

      node!.properties!.id = "excerpt"
      return [EXIT]
    })
  }
}

export function remarkSetExcerpt(): Transformer<MdastRoot, MdastRoot> {
  return (tree) => {
    const found = find(tree, { type: "paragraph" })
    tree.children = [found]
  }
}
