import type { Heading as MdastHeading, Root as MdastRoot } from "mdast"
import type { Transformer } from "unified"
import { u } from "unist-builder"

type Options = {
  depth: 1 | 2 | 3 | 4 | 5 | 6
  text: string
  properties: Record<string, unknown>
}

const defaultOptions: Options = {
  depth: 2,
  text: "Introduction",
  properties: {},
}

export function remarkPrependTopHeading(options?: Options): Transformer<MdastRoot, MdastRoot> {
  const settings: Options = {
    depth: options?.depth ?? defaultOptions.depth,
    text: options?.text ?? defaultOptions.text,
    properties: options?.properties ?? defaultOptions.properties,
  }

  return (tree) => {
    // @ts-expect-error: data hProperties is not in the types
    const node: MdastHeading = u(
      "heading",
      {
        depth: settings.depth,
        data: {
          hProperties: settings.properties,
        },
      },
      [u("text", settings.text)]
    )

    // insert the heading node at the beginning of the document
    tree.children.unshift(node)
  }
}
