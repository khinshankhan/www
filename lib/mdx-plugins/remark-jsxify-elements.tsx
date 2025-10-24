/* eslint-disable */

// TODO: review and rewrite this logic with new available types and constructs

import type { RootContent as MdastContent, Node as MdastNode, Root as MdastRoot } from "mdast"
import type { Transformer } from "unified"
import { CONTINUE, SKIP, visit } from "unist-util-visit"

export interface Attribute {
  type?: string
  name: string
  value: string
}

export interface MdxJsxFlowElement {
  type: "mdxJsxFlowElement"
  name: string | null
  attributes: NonNullable<Attribute>[]
  children: MdastContent[]
  data?: {
    _mdxExplicitJsx?: boolean
  }
}

export function createMdxJsxFlowElement(
  name: string | null,
  attributes: Attribute[],
  children: MdastContent[] = []
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

export type MatchFunction<P, T> = (node: P) => T

export interface RemarkJsxifyElementOptions {
  elementMatcher: MatchFunction<MdastNode, string | null>
  isSandbox?: MatchFunction<Attribute, boolean>

  elementModifier?: (jsxName: string, mdxJsxFlowElement: MdxJsxFlowElement) => MdxJsxFlowElement
}

const defaultIsSandbox: NonNullable<RemarkJsxifyElementOptions["isSandbox"]> = (
  attribute: Attribute
) => {
  return attribute.name === "data-sandbox" && attribute.value === "true"
}

const defaultElementModifier: NonNullable<RemarkJsxifyElementOptions["elementModifier"]> = (
  jsxName,
  element
) => {
  return element
}

export function remarkJsxifyElements(
  options: RemarkJsxifyElementOptions
): Transformer<MdastRoot, MdastRoot> {
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
