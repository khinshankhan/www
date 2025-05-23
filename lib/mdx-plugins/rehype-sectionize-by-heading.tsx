import type { Element as HastElement, Root as HastRoot, RootContent as HastRootContent } from "hast"
import { headingRank } from "hast-util-heading-rank"
import type { Transformer } from "unified"
import { u } from "unist-builder"
import { SKIP, visit } from "unist-util-visit"

type Options = {
  isFlat: boolean
  sectionProperties: Record<string, unknown>
}

const defaultOptions = {
  isFlat: false,
  sectionProperties: {},
} satisfies Options

export function rehypeSectionizeByHeading(options?: Options): Transformer<HastRoot, HastRoot> {
  const settings = {
    isFlat: options?.isFlat ?? defaultOptions.isFlat,
    sectionProperties: options?.sectionProperties ?? defaultOptions.sectionProperties,
  }

  return function transform(tree) {
    const sections: HastRootContent[] = []
    let currentSection: HastElement | null = null

    visit(tree, (node, index) => {
      // the root is what acts as the parent of everything
      if (node.type === "root") return

      // NOTE: by transversing "element" nodes, we can ensure that we only sectionize headings
      // that are coming from markdown and not HTML literals
      const isHeading = node.type === "element" && node.tagName.match(/^h[1-6]$/)

      if (isHeading) {
        const depth = headingRank(node) ?? 0

        const newSection: HastRootContent = u(
          "element",
          {
            tagName: "section",
            properties: {
              // NOTE: this assumes headings have ids, which can be done by running rehypeSlug beforehand
              "aria-labelledby": node.properties.id,
              "data-depth": depth,
              ...settings.sectionProperties,
            },
          },
          [node]
        )

        if (currentSection === null) {
          currentSection = newSection
        } else {
          if (
            settings.isFlat ||
            // @ts-expect-error: data-depth is not in the types
            depth <= currentSection?.properties?.["data-depth"]
          ) {
            sections.push(currentSection)
            currentSection = newSection
          } else {
            let relevantSection = currentSection
            while (
              relevantSection.children.length > 0 &&
              // @ts-expect-error: unsure about the types
              relevantSection.children[relevantSection.children.length - 1].tagName === "section" &&
              // @ts-expect-error: unsure about the types
              relevantSection.children[relevantSection.children.length - 1].properties[
                "data-depth"
              ] < depth
            ) {
              relevantSection = relevantSection.children[
                relevantSection.children.length - 1
              ] as HastElement
            }

            relevantSection.children.push(newSection)
          }
        }

        // @ts-expect-error: unsure about the types
        return [SKIP, index + 1]
      }

      let relevantSection = currentSection
      if (!settings.isFlat) {
        while (
          relevantSection &&
          relevantSection.children.length > 0 &&
          // @ts-expect-error: unsure about the types
          relevantSection.children[relevantSection.children.length - 1].tagName === "section"
        ) {
          relevantSection = relevantSection.children[
            relevantSection.children.length - 1
          ] as HastElement
        }
      }

      // @ts-expect-error: unsure about the types
      relevantSection.children.push(node)

      // @ts-expect-error: unsure about the types
      return [SKIP, index + 1]
    })

    if (currentSection !== null) {
      sections.push(currentSection)
    }

    tree.children = sections
  }
}
