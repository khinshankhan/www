import { createMdxJsxFlowElement } from "@/lib/mdx-plugins/remark-jsxify-elements"
import type { Code as MdastCode, Root as MdastRoot } from "mdast"
import type { Transformer } from "unified"
import { visit } from "unist-util-visit"

function shouldRenderLatex(node: MdastCode) {
  if (!["latex", "tex"].includes(node.lang ?? "")) {
    return false
  }

  const meta = node.meta?.trim()
  if (!meta) {
    return false
  }

  return meta.split(/\s+/).includes("render")
}

export function remarkLatexRender(): Transformer<MdastRoot, MdastRoot> {
  return function transformer(tree) {
    visit(tree, "code", (node, index, parent) => {
      if (!parent || index === undefined || !shouldRenderLatex(node)) {
        return
      }

      // @ts-expect-error: local helper type is compatible with mdxJsxFlowElement at runtime
      parent.children[index] = createMdxJsxFlowElement("LatexBlock", [
        {
          name: "code",
          value: node.value,
        },
      ])
    })
  }
}
