import { createMdxJsxFlowElement } from "@/lib/mdx-plugins/remark-jsxify-elements"
import type { Code as MdastCode, Root as MdastRoot } from "mdast"
import type { Transformer } from "unified"
import { visit } from "unist-util-visit"

function parseMetaAttributes(meta: string) {
  const attributes = new Map<string, string>()

  for (const match of meta.matchAll(/(\w+)="([^"]*)"/g)) {
    const [, key, value] = match
    if (!key) {
      continue
    }

    attributes.set(key, value ?? "")
  }

  return attributes
}

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

      const meta = node.meta?.trim() ?? ""
      const attributes = parseMetaAttributes(meta)
      const title = attributes.get("title")
      const description = attributes.get("description")

      if (!title || !description) {
        const location = node.position?.start
        const position = location ? `${location.line}:${location.column}` : "unknown position"
        throw new Error(
          `Rendered Mermaid blocks require title and description metadata at ${position}.`
        )
      }

      // @ts-expect-error: local helper type is compatible with mdxJsxFlowElement at runtime
      parent.children[index] = createMdxJsxFlowElement("MermaidDiagram", [
        {
          name: "code",
          value: node.value,
        },
        {
          name: "title",
          value: title,
        },
        {
          name: "description",
          value: description,
        },
      ])
    })
  }
}
