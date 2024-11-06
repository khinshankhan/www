import type { Element as HastElement, Root as HastRoot } from "hast"
import type { Transformer } from "unified"
import { u } from "unist-builder"
import { visit } from "unist-util-visit"

// prettier-ignore
export function rehypeSectionizeByHeading(): Transformer<HastRoot, HastRoot>  {
  return (tree) => {
    // This will accumulate the transformed tree
    const newChildren: HastElement[] = []
    let sectionNode: HastElement | null = null

    visit(tree, "element", (node) => {
      // If the node is a heading, close any open section and start a new one
      if (node.tagName.match(/^h[1-6]$/)) {
        // If there is an open section, add it to newChildren and start a new one
        if (sectionNode) {
          newChildren.push(sectionNode)
        }

        console.log({ node1: node })

        // Start a new section with the current heading
        sectionNode = u(
          'element',
          {
            tagName: 'section',
            properties: {
              // NOTE: this assumes headings have ids, which can be done by running rehypeSlug beforehand
              'aria-labelledby': node.properties.id,
            }
          },
          [node]
        )
      } else if (sectionNode) {
        // Add non-heading nodes to the current section
        sectionNode.children.push(node)
        console.log({ node2: node })
      } else {
        // If we haven't started a section, push nodes directly
        newChildren.push(node)
        console.log({ node3: node })
      }
    })

    // Push the last open section if it exists
    if (sectionNode) {
      newChildren.push(sectionNode)
    }

    tree.children = newChildren
  }
}
