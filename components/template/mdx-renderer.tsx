import React, { Children } from "react"
import { Code } from "@/components/base/code"
import { Figcaption } from "@/components/base/figure"
import { Sun } from "@/components/base/icon"
import { Image } from "@/components/base/image"
import { Spoiler } from "@/components/base/spoiler"
import { typographyVariants } from "@/components/base/typography"
import { Callout, calloutIcons, type CalloutProps } from "@/components/composite/callout"
import { SmartLink } from "@/components/composite/smart-link"
import { Pre } from "@/components/section/pre"
import { SmartVideo } from "@/components/section/smart-video"
import { Tabbify } from "@/components/section/tabbify"
import { rehypeSectionizeByHeading } from "@/lib/mdx-plugins/rehype-sectionize-by-heading"
import { rehypeSlug } from "@/lib/mdx-plugins/rehype-slug"
import { remarkMarkFirstParagraph } from "@/lib/mdx-plugins/remark-excerpt"
import {
  createMdxJsxFlowElement,
  RemarkJsxifyElementOptions,
  remarkJsxifyElements,
} from "@/lib/mdx-plugins/remark-jsxify-elements"
import { remarkPrependTopHeading } from "@/lib/mdx-plugins/remark-prepend-top-heading"
import { cn } from "@/lib/utils"
import { toString } from "mdast-util-to-string"
import type { MDXComponents } from "mdx/types"
import { MDXRemote } from "next-mdx-remote/rsc"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeMdxCodeProps from "rehype-mdx-code-props"
import remarkGfm from "remark-gfm"

// prettier-ignore
export const calloutKeywords = Object.keys(calloutIcons) as NonNullable<CalloutProps["variant"]>[]

// prettier-ignore
export function isCalloutKeyword(keyword: string): keyword is NonNullable<CalloutProps["variant"]> {
  //@ts-expect-error: silly object can't be indexed by string error
  return calloutKeywords.includes(keyword)
}

// match blockquotes `> [!variant] heading`
const mdxBlockquoteMetaRegex = /\[!([^\]]+)\]\s*(.*)/

const components: MDXComponents = {
  a: ({ href = "#", children = null, ...props }) => (
    <SmartLink href={href} {...props}>
      {children}
    </SmartLink>
  ),
  // TODO: look into why heading component isn't compatible with MDX headings
  h2: ({ className = "", children, ...props }) => (
    <h2 {...props} className={cn("scroll-mt-5", typographyVariants({ variant: "h2" }), className)}>
      {children}
    </h2>
  ),
  h3: ({ className = "", children, ...props }) => (
    <h3 {...props} className={cn("scroll-mt-5", typographyVariants({ variant: "h3" }), className)}>
      {children}
    </h3>
  ),
  h4: ({ className = "", children, ...props }) => (
    <h4 {...props} className={cn("scroll-mt-5", typographyVariants({ variant: "h4" }), className)}>
      {children}
    </h4>
  ),
  h5: ({ className = "", children, ...props }) => (
    <h5 {...props} className={cn("scroll-mt-5", typographyVariants({ variant: "h5" }), className)}>
      {children}
    </h5>
  ),
  h6: ({ className = "", children, ...props }) => (
    <h6 {...props} className={cn("scroll-mt-5", typographyVariants({ variant: "h6" }), className)}>
      {children}
    </h6>
  ),
  // refs are incompatible
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  code: ({ ref: _ref, children, ...props }) => {
    // surely there's a better way to do this?
    const language =
      props.className
        ?.split(" ")
        .find((c) => c.startsWith("language-"))
        ?.split("language-")
        .pop() || "plaintext"

    return (
      <Code language={language} {...props}>
        {children as string}
      </Code>
    )
  },
  // refs are incompatible
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  pre: ({ ref: _ref, ...props }) => {
    // @ts-expect-error: it's fine, this is how mdx codeblocks work supposedly
    const text = props.children?.props?.children as string

    return <Pre {...props} text={text} />
  },

  Spoiler,
  Tabbify,
  Image,
  SmartVideo,
  Figcaption,
  Callout: ({
    variant,
    firstChildIsTitle: mdxFirstChildIsTitle,
    children,
  }: CalloutProps & {
    // this lets us leverage the default mdx parsing to parse the title in case it has any other elements
    firstChildIsTitle: "true" | "false" | undefined
  }) => {
    const firstChildIsTitle = mdxFirstChildIsTitle === "true"
    const title = !firstChildIsTitle ? null : Children.toArray(children).filter((_, i) => i === 0)
    const content = !firstChildIsTitle
      ? children
      : Children.toArray(children).filter((_, i) => i !== 0)

    return (
      <Callout variant={variant} title={title?.length !== 0 ? title : null}>
        {content}
      </Callout>
    )
  },
  Sun,

  Test: ({ className = "" }) => <div className={cn(className)}>this was a test and you passed</div>,
}

export async function MDXRenderer({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [
            remarkMarkFirstParagraph,
            [
              remarkPrependTopHeading,
              {
                depth: 2,
                text: "Introduction",
                properties: {
                  className: "sr-only m-0",
                },
              },
            ],
            [remarkGfm, { singleTilde: false }],
            [
              remarkJsxifyElements,
              {
                elementMatcher: (node) => {
                  // @ts-expect-error: technically we shouldn't be modifying mdxJsxFlowElement
                  if (node?.name === "img") {
                    return "Image"
                  }

                  // @ts-expect-error: technically we shouldn't be modifying mdxJsxFlowElement
                  if (node?.name === "video") {
                    return "SmartVideo"
                  }

                  // NOTE: I wonder if it's worth investigating around the node so different versions
                  // of figcaption can be rendered if it's preceded by an img vs blockquote
                  // @ts-expect-error: technically we shouldn't be modifying mdxJsxFlowElement
                  if (node?.name === "figcaption") {
                    return "Figcaption"
                  }

                  if (node.type === "blockquote") {
                    // @ts-expect-error: seems the node type doesn't account for MdxJsxFlowElements
                    const firstChildText = toString(node?.children?.[0] ?? "")
                    const match = mdxBlockquoteMetaRegex.exec(firstChildText)
                    // TODO: check if we need to handle blockquotes differently
                    if (match) {
                      return "Callout"
                    }
                  }

                  return null
                },
                elementModifier: (jsxName, element) => {
                  if (jsxName === "Callout") {
                    const possibleHeadingTree = element?.children?.[0]?.children || []
                    const possibleHeadingText = toString(possibleHeadingTree)

                    const match = mdxBlockquoteMetaRegex.exec(possibleHeadingText)
                    if (!match) {
                      return element
                    }

                    const [, keyword, partialTitle] = match
                    const variant = keyword.toLowerCase()
                    if (!isCalloutKeyword(variant)) {
                      return element
                    }

                    const firstChildIsTitle =
                      Boolean(partialTitle) || possibleHeadingTree.length > 1

                    const updatedAttributes = [
                      ...element.attributes,
                      { name: "variant", value: variant },
                      { name: "firstChildIsTitle", value: firstChildIsTitle },
                    ]
                    if (!firstChildIsTitle) {
                      return createMdxJsxFlowElement(
                        element.name,
                        updatedAttributes,
                        // the first child would have the meta info for the callout
                        element.children.slice(1)
                      )
                    }

                    const titleElement = createMdxJsxFlowElement(
                      null,
                      [],
                      // we remove the variant info from the start of the title and keep the rest
                      [{ type: "text", value: partialTitle }, ...possibleHeadingTree.slice(1)]
                    )

                    return createMdxJsxFlowElement(element.name, updatedAttributes, [
                      titleElement,
                      ...element.children.slice(1),
                    ])
                  }
                  return element
                },
              } satisfies RemarkJsxifyElementOptions,
            ],
          ],
          rehypePlugins: [
            [
              rehypeSlug,
              {
                reservedIds: ["excerpt"],
              },
            ],
            [
              rehypeSectionizeByHeading,
              {
                isFlat: false,
                sectionProperties: {
                  className: "prose",
                },
              },
            ],
            [
              rehypeAutolinkHeadings,
              {
                behavior: "wrap",
                properties: {
                  className: ["anchor-link"],
                },
              },
            ],
            rehypeMdxCodeProps,
          ],
        },
      }}
    />
  )
}
