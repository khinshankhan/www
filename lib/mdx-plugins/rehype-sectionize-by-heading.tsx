import type { Element as HastElement, Root as HastRoot } from "hast"
import { headingRank } from "hast-util-heading-rank"
import type { Transformer } from "unified"
import { u } from "unist-builder"
import { SKIP, visit } from "unist-util-visit"

// prettier-ignore
export function rehypeSectionizeByHeading(): Transformer<HastRoot, HastRoot>  {
  return (tree) => {
    const sections: HastElement[] = []

    visit(tree, (node, index) => {
      // the root is what acts as the parent of everything
      if (node.type === "root") return

      const isHeading = node.type === "element" && node.tagName.match(/^h[1-6]$/)

      if (isHeading) {
        const depth = headingRank(node)

        const newSection = u(
          'element',
          {
            tagName: 'section',
            properties: {
              // NOTE: this assumes headings have ids, which can be done by running rehypeSlug beforehand
              'aria-labelledby': node.properties.id,
              'data-depth': depth,
            }
          },
          [node]
        )

        sections.push(newSection)
        // @ts-expect-error: unsure about the types
        return [SKIP, index + 1]
      }

      const currentSection = sections[sections.length - 1]
      // @ts-expect-error: unsure about the types
      currentSection.children.push(node)

      // @ts-expect-error: unsure about the types
      return [SKIP, index + 1]
    })

    tree.children = sections
  }
}
