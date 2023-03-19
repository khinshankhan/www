import { EXIT, SKIP, visit } from "unist-util-visit"

// TODO: add types
export function rehypeMarkExcerpt() {
  return (tree: any) => {
    visit(tree, "element", (node) => {
      if (node.tagName != "p") return [SKIP]

      node.properties.id = "excerpt"
      return [EXIT]
    })
  }
}
