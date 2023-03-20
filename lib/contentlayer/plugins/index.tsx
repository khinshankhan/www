// @ts-nocheck
import { type Root as HastRoot } from "hast"
import { type Root as MdastRoot } from "mdast"
import { Transformer } from "unified"
import find from "unist-util-find"
import { EXIT, SKIP, visit } from "unist-util-visit"

import { braidArrays, extractEmoji } from "../../utils"

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

      const baseTexts = emptied.map((text) => {
        return {
          type: "text",
          value: text,
        }
      })

      const intertwineWith = matches.map((match) => {
        return options.jsx
          ? {
              type: "mdxJsxTextElement",
              name: options.jsxElement,
              attributes: [
                { type: "mdxJsxAttribute", name: options.jsxAttribute, value: match[0] },
              ],
              children: [],
              data: { _mdxExplicitJsx: true },
            }
          : {
              type: "text",
              value: options.lookup(match[0]),
            }
      })

      const newNodes = braidArrays(baseTexts, intertwineWith)

      // replace text node with the injected emoji nodes
      parent.children.splice(index, 1, ...newNodes)
      return [SKIP, index]
    })
  }
}
