import type { Root as MdastRoot } from "mdast"
import type { Transformer } from "unified"
import { EXIT, visit } from "unist-util-visit"
import { setNodeProperty } from "./utils"

type Options = {
  id: string
}

const defaultOptions: Options = {
  id: "excerpt",
}

export function remarkMarkFirstParagraph(options?: Options): Transformer<MdastRoot, MdastRoot> {
  const settings = options || defaultOptions

  return function transformer(tree: MdastRoot) {
    visit(tree, "paragraph", function (node) {
      node = setNodeProperty(node, "id", settings.id)
      return EXIT
    })
  }
}
