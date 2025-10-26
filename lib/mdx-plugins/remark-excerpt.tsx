import type { Root as MdastRoot } from "mdast"
import { toString } from "mdast-util-to-string"
import type { Transformer } from "unified"
import { EXIT, visit } from "unist-util-visit"

interface Options {
  id: string
}

const defaultOptions: Options = {
  id: "excerpt",
}

export function remarkMarkFirstParagraph(options?: Options): Transformer<MdastRoot, MdastRoot> {
  const settings = options ?? defaultOptions

  return function transformer(tree) {
    visit(tree, "paragraph", function (node, _, parent) {
      // elements like callouts may contain p tags but they don't count as excerpts
      // only the direct descendant of root would be considered the excerpt
      if (parent?.type !== "root") {
        return
      }

      node.data = node.data ?? {}
      node.data.hProperties = node.data.hProperties ?? {}

      // NOTE: types are dumb, Data represents information associated by the ecosystem with the node.
      // This space is guaranteed to never be specified by unist or specifications implementing unist.
      // Would be nice if the types were like Record<string, unknown> instead but it's not.
      // https://github.com/syntax-tree/unist/blob/main/readme.md#data
      // @ts-expect-error: variable attributes is not in the Data type
      node.data.id = settings.id
      node.data.hProperties.id = settings.id
      return EXIT
    })
  }
}

export function remarkExcerptExport(): Transformer<MdastRoot, MdastRoot> {
  return function transformer(tree, vfile) {
    vfile.data.excerpt = ""
    visit(tree, "paragraph", function (node, _, parent) {
      // elements like callouts may contain p tags but they don't count as excerpts
      // only the direct descendant of root would be considered the excerpt
      if (parent?.type !== "root") {
        return
      }

      vfile.data.excerpt = toString(node)
      return EXIT
    })
  }
}
