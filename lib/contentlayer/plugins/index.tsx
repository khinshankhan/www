// @ts-nocheck
import { type Root as HastRoot } from "hast"
import { type Root as MdastRoot } from "mdast"
import { Transformer } from "unified"
import find from "unist-util-find"
import { EXIT, SKIP, visit } from "unist-util-visit"

import { braidArrays, extractEmoji } from "../../utils"

function createTextNode(value: string) {
  return { type: "text", value }
}

function createMdxNode(name: string, attributes: { name: string; value: string }[]) {
  return {
    type: "mdxJsxTextElement",
    name,
    attributes: attributes.map(({ name, value }) => ({ type: "mdxJsxAttribute", name, value })),
    children: [],
    data: { _mdxExplicitJsx: true },
  }
}

// TODO: add types
export function rehypeMarkExcerpt(): Transformer<HastRoot, HastRoot> {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName !== "p") return [SKIP]

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

export function remarkSimpleEmoji(
  options = {
    jsx: true,
    jsxElement: "Emoji",
    jsxAttribute: "name",
    lookup: (name: string) => name,
  }
): Transformer<MdastRoot, MdastRoot> {
  return (tree) => {
    visit(tree, (node, index, parent) => {
      if (!node.value) return

      const matches = [...node.value.matchAll(extractEmoji)]
      if (matches.length === 0) return

      const emptied = [...matches].reverse().reduce(
        (stored, match) => {
          const i = stored[0].lastIndexOf(match[1])
          const before = stored[0].slice(0, i)
          const after = stored[0].slice(i + match[1].length)
          return [before, after, ...stored.slice(1)]
        },
        [node.value]
      )

      const baseTexts = emptied.map((text) => createTextNode(text))

      const intertwineWith = matches.map((match) =>
        options.jsx
          ? createMdxNode(options.jsxElement, [{ name: options.jsxAttribute, value: match[0] }])
          : createTextNode(options.lookup(match[0]))
      )

      const newNodes = braidArrays(baseTexts, intertwineWith)
      // replace text node with the injected emoji nodes
      parent.children.splice(index, 1, ...newNodes)
      return [SKIP, index]
    })
  }
}
