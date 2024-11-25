import type { RootContent as MdastContent, Node as MdastNode } from "mdast"
import type { Transformer } from "unified"
import { CONTINUE, SKIP, visit } from "unist-util-visit"

export interface Attribute {
  type?: string
  name: string
  value: string
}

export interface MdxJsxFlowElement {
  type: "mdxJsxFlowElement"
  name: string
  // prettier-ignore
  attributes: NonNullable<Attribute>[]
  children: MdastContent[]
  data?: {
    _mdxExplicitJsx?: boolean
  }
}

export function createMdxJsxFlowElement(
  name: string,
  attributes: Attribute[],
  children = []
): MdxJsxFlowElement {
  return {
    type: "mdxJsxFlowElement",
    name,
    attributes: attributes.map(({ name, value }) => ({ type: "mdxJsxAttribute", name, value })),
    children,
    // https://github.com/orgs/mdx-js/discussions/1969#discussioncomment-2329613
    data: { _mdxExplicitJsx: true },
  }
}

// eslint-disable-line no-unused-vars
export type MatchFunction<P, T> = (node: P) => T

export type RemarkJsxifyElementOptions = {
  // prettier-ignore
  elementMatcher: MatchFunction<MdastNode, string | null>
  // prettier-ignore
  isSandbox?: MatchFunction<Attribute, boolean>
  // prettier-ignore
  // eslint-disable-line no-unused-vars
  elementModifier?: (jsxName: string, mdxJsxFlowElement: MdxJsxFlowElement) => MdxJsxFlowElement
}

// prettier-ignore
const defaultIsSandbox: NonNullable<RemarkJsxifyElementOptions["isSandbox"]> = (attribute: Attribute) => {
  return attribute.name === "data-sandbox" && attribute.value === "true"
}

// prettier-ignore
const defaultElementModifier: NonNullable<RemarkJsxifyElementOptions["elementModifier"]> = (
// eslint-disable-next-line @typescript-eslint/no-unused-vars
  jsxName,
  element
) => {
  return element
}

export function remarkJsxifyElements(
  options: RemarkJsxifyElementOptions
  // prettier-ignore
): Transformer {
  const elementMatcher = options.elementMatcher
  const isSandbox = options.isSandbox ?? defaultIsSandbox
  const elementModifier = options.elementModifier ?? defaultElementModifier

  return function transformer(tree) {
    visit(tree, (node, index, parent) => {
      // @ts-expect-error: technically we shouldn't be looking at mdxJsxFlowElement
      const shouldSkipElement = (node.attributes as Attribute[])?.some(isSandbox)
      if (shouldSkipElement) {
        return SKIP
      }

      const jsxName = elementMatcher(node)
      if (!parent || index === undefined || !jsxName) {
        return CONTINUE
      }

      const mdxJsxFlowElement = createMdxJsxFlowElement(
        jsxName,
        // @ts-expect-error: technically we shouldn't be looking at mdxJsxFlowElement
        (node.attributes as Attribute[]) ?? [],
        // @ts-expect-error: technically we shouldn't be looking at mdxJsxFlowElement
        node.children ?? []
      )
      const modifiedElement = elementModifier(jsxName, mdxJsxFlowElement)

      // TODO: this might break on certain node types?
      // @ts-expect-error: technically we shouldn't be modifying mdxJsxFlowElement
      parent.children[index] = modifiedElement

      return [SKIP, index]
    })
  }
}
