import type { Root as MdastRoot } from "mdast"
import { toString } from "mdast-util-to-string"
import type { Transformer } from "unified"
import { EXIT, visit } from "unist-util-visit"
import { setNodeProperty } from "./utils"

type Options = {
  id: string
}

const defaultOptions: Options = {
  id: "excerpt",
}

// prettier-ignore
export function remarkMarkFirstParagraph(options?: Options): Transformer<MdastRoot, MdastRoot> {
  const settings = options || defaultOptions

  return function transformer(tree) {
    visit(tree, "paragraph", function (node) {
      node = setNodeProperty(node, "id", settings.id)
      return EXIT
    })
  }
}

// prettier-ignore
export function remarkExcerptExport(): Transformer<MdastRoot, MdastRoot> {
  return function transformer(tree, vfile) {
    vfile.data = vfile.data || {}
    vfile.data.excerpt = ""
    visit(tree, "paragraph", function (node) {
      vfile.data.excerpt = toString(node)
      return EXIT
    })
  }
}
