import type { RootContent as MdastContent, Root as MdastRoot } from "mdast"
import type { Transformer } from "unified"
import { SKIP, visit } from "unist-util-visit"

export interface Attribute {
  name: string
  value: string
}
export function createMdxJsxFlowElement(name: string, attributes: Attribute[], children = []) {
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

export type MatchFunction = (node: MdastNode) => boolean
export interface RemarkJsxifyElement {
  matcher: MatchFunction // eslint-disable-line no-unused-vars
  jsxName: string
}

export interface RemarkJsxifyElementsOptions {
  elements?: RemarkJsxifyElement[]
  allowedModifications?: MatchFunction[]
}

export function remarkJsxifyElements(
  options: RemarkJsxifyElementsOptions
): Transformer<MdastRoot, MdastRoot> {
  const elements = options.elements
  const allowedModifications = options.allowedModifications

  return function transformer(tree) {
    visit(tree, (node, index, parent) => {
      const foundElement = elements?.find((element) => element.matcher(node))
      const allowModification = allowedModifications?.find((matcher) => matcher(node))

      // @ts-ignore: maybe it exists
      if (allowModification && node?.data?._mdxExplicitJsx) {
        console.log({ node })
        // @ts-ignore: definitely exists
        node.data._mdxExplicitJsx = false
      }
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
