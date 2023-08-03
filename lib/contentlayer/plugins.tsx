import { type Root as HastRoot } from "hast"
import type { Root as MdastRoot } from "mdast"
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

interface Attribute {
  name: string
  value: string
}
function createMdxNode(name: string, attributes: Attribute[]) {
  return {
    type: "mdxJsxTextElement",
    name,
    attributes: attributes.map(({ name, value }) => ({
      type: "mdxJsxAttribute",
      name,
      value,
    })),
    children: [],
    data: { _mdxExplicitJsx: true },
  }
}

interface RemarkJsxifyElement {
  name: string
  jsxName: string
}
export function remarkJsxifyElements(
  options = { elements: [] as RemarkJsxifyElement[] }
): Transformer<MdastRoot, MdastRoot> {
  return function (tree) {
    visit(tree, (node, index, parent) => {
      const foundElement = options.elements.find(
        // @ts-expect-error
        (element) => element.name === (node?.name as string)
      )
      if (parent === null || index === null || !foundElement) return

      const newNode = createMdxNode(
        foundElement.jsxName,
        // @ts-expect-error
        (node.attributes as Attribute[]) ?? []
      )

      // TODO: this might break on certain node types
      // @ts-expect-error
      parent.children[index] = newNode
      return [SKIP, index + 1]
    })
  }
}
