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

// eslint-disable-line no-unused-vars
export type MatchFunction<T> = (node: MdastNode) => T

export interface RemarkJsxifyElementsOptions {
  allowModifications?: MatchFunction<boolean>
  replaceNodeName?: MatchFunction<string | null>
}

export function remarkJsxifyElements(
  options: RemarkJsxifyElementsOptions
): Transformer<MdastRoot, MdastRoot> {
  const allowModifications = options.allowModifications ?? (() => false)
  const replaceNodeName = options.replaceNodeName ?? (() => null)

  return function transformer(tree) {
    visit(tree, (node, index, parent) => {
      const shouldModify = allowModifications(node)
      // @ts-ignore: maybe it exists
      if (shouldModify && node?.data?._mdxExplicitJsx) {
        // @ts-ignore: definitely exists
        node.data._mdxExplicitJsx = false
      }

      const jsxName = replaceNodeName(node)
      if (!parent || !index || !jsxName) return

      // TODO: this might break on certain node types
      // @ts-expect-error
      parent.children[index] = createMdxJsxFlowElement(
        jsxName,
        // @ts-expect-error
        (node.attributes as Attribute[]) ?? [],
        // @ts-expect-error
        node.children ?? []
      )
      return [SKIP, index + 1]
    })
  }
}
