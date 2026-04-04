import { createMdxJsxFlowElement } from "@/lib/mdx-plugins/remark-jsxify-elements"
import type { Code as MdastCode, Root as MdastRoot } from "mdast"
import type { Transformer } from "unified"
import { visit } from "unist-util-visit"

function shouldRenderMermaid(node: MdastCode) {
  if (node.lang !== "mermaid") {
    return false
  }

  const meta = node.meta?.trim()
  if (!meta) {
    return false
  }

  return meta.split(/\s+/).includes("render")
}

export function remarkMermaidRender(): Transformer<MdastRoot, MdastRoot> {
  return function transformer(tree) {
    visit(tree, "code", (node, index, parent) => {
      if (!parent || index === undefined || !shouldRenderMermaid(node)) {
        return
      }

      // @ts-expect-error: local helper type is compatible with mdxJsxFlowElement at runtime
      parent.children[index] = createMdxJsxFlowElement("MermaidDiagram", [
        {
          name: "code",
          value: node.value,
        },
      ])
    })
  }
}
