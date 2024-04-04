import type { RootContent as MdastContent, Root as MdastRoot } from "mdast"
import type { Transformer } from "unified"
import { SKIP, visit } from "unist-util-visit"

interface Attribute {
  name: string
  value: string
}
function createMdxJsxFlowElement(name: string, attributes: Attribute[], children = []) {
  return {
    type: "mdxJsxFlowElement",
    name,
    attributes: attributes.map(({ name, value }) => ({ type: "mdxJsxAttribute", name, value })),
    children,
    // https://github.com/orgs/mdx-js/discussions/1969#discussioncomment-2329613
    data: { _mdxExplicitJsx: true },
  }
}

export type MdastNode = MdastRoot | MdastContent

interface RemarkJsxifyElement {
  matcher: (node: MdastNode) => boolean // eslint-disable-line no-unused-vars
  jsxName: string
}

export function remarkJsxifyElements(
  options = { elements: [] as RemarkJsxifyElement[] }
): Transformer<MdastRoot, MdastRoot> {
  return function transformer(tree) {
    visit(tree, (node, index, parent) => {
      const foundElement = options.elements.find((element) => element.matcher(node))
      if (!parent || !index || !foundElement) return

      // TODO: this might break on certain node types
      // @ts-expect-error
      parent.children[index] = createMdxJsxFlowElement(
        foundElement.jsxName,
        // @ts-expect-error
        (node.attributes as Attribute[]) ?? [],
        // @ts-expect-error
        node.children ?? []
      )
      return [SKIP, index + 1]
    })
  }
}
