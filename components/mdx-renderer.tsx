import React, { Children } from "react"
import { Emoji } from "@/components/emoji"
import { emojiLookup, type EmojiKey } from "@/lib/emoji"
import { rehypeSectionizeByHeading } from "@/lib/mdx-plugins/rehype-sectionize-by-heading"
import { rehypeSlug } from "@/lib/mdx-plugins/rehype-slug"
import { remarkMarkFirstParagraph } from "@/lib/mdx-plugins/remark-excerpt"
import {
  createMdxJsxFlowElement,
  remarkJsxifyElements,
  type RemarkJsxifyElementOptions,
} from "@/lib/mdx-plugins/remark-jsxify-elements"
import { remarkPrependTopHeading } from "@/lib/mdx-plugins/remark-prepend-top-heading"
import { cn } from "@/quicksilver/lib/classname"
import { SpotifyEmbed } from "@/quicksilver/react/embeds/spotify"
import { YouTubeEmbed } from "@/quicksilver/react/embeds/youtube"
import { Blockquote, type BlockquoteProps } from "@/quicksilver/react/primitives/blockquote"
import { Callout, calloutIcons, type CalloutProps } from "@/quicksilver/react/primitives/callout"
import { Code } from "@/quicksilver/react/primitives/code"
import { Figcaption } from "@/quicksilver/react/primitives/figcaption"
import { Figure } from "@/quicksilver/react/primitives/figure"
import { Image } from "@/quicksilver/react/primitives/image"
import { Link } from "@/quicksilver/react/primitives/link"
import { Pre } from "@/quicksilver/react/primitives/pre"
import { Spoiler } from "@/quicksilver/react/primitives/spoiler"
import { H2, H3, H4, H5, H6 } from "@/quicksilver/react/primitives/text"
import { SmartVideo } from "@/quicksilver/react/primitives/video"
import type { RootContent as MdastContent } from "mdast"
import { toString } from "mdast-util-to-string"
import type { MDXComponents } from "mdx/types"
import { MDXRemote } from "next-mdx-remote/rsc"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import remarkGfm from "remark-gfm"
import remarkSmartypants from "remark-smartypants"
import { z } from "zod"
import { remarkSimpleEmoji } from "@khinshankhan/emoji-helper-remark"

export const calloutKeywords = Object.keys(calloutIcons) as NonNullable<CalloutProps["variant"]>[]

export function isCalloutKeyword(keyword: string): keyword is NonNullable<CalloutProps["variant"]> {
  // @ts-expect-error: silly object can't be indexed by string error
  return calloutKeywords.includes(keyword)
}

// match blockquotes `> [!variant] heading`
const mdxBlockquoteMetaRegex = /\[!([^\]]+)\]\s*(.*)/

const mdxHeadingClasses = "scroll-mt-28"

function getSafeClassName(className: unknown): string {
  const parsedClassName = z.string().safeParse(className)
  return parsedClassName.success ? parsedClassName.data : ""
}

const components: MDXComponents = {
  a: ({ className = "", ...props }) => {
    return <Link className={cn("prose", getSafeClassName(className))} {...props} />
  },
  h2: ({ className = "", ...props }) => {
    return <H2 className={cn(mdxHeadingClasses, getSafeClassName(className))} {...props} />
  },
  h3: ({ className = "", ...props }) => {
    return <H3 className={cn(mdxHeadingClasses, getSafeClassName(className))} {...props} />
  },
  h4: ({ className = "", ...props }) => {
    return <H4 className={cn(mdxHeadingClasses, getSafeClassName(className))} {...props} />
  },
  h5: ({ className = "", ...props }) => {
    return <H5 className={cn(mdxHeadingClasses, getSafeClassName(className))} {...props} />
  },
  h6: ({ className = "", ...props }) => {
    return <H6 className={cn(mdxHeadingClasses, getSafeClassName(className))} {...props} />
  },
  pre: ({ className = "", ...props }) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const givenLanguage = getSafeClassName(props?.children?.props?.className)
      .split(" ")
      .find((c) => c.startsWith("language-"))
      ?.split("language-")
      .pop()

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const text = props?.children?.props?.children as string

    // TODO: add support for better inline vs fenced code detection
    const isFenced = givenLanguage && givenLanguage.length > 0
    return (
      <Pre
        className={cn("h-full w-full", getSafeClassName(className))}
        textToCopy={isFenced ? text : undefined}
        {...props}
      />
    )
  },
  code: ({ className = "", children, ...props }) => {
    const givenLanguage = getSafeClassName(className)
      .split(" ")
      .find((c) => c.startsWith("language-"))
      ?.split("language-")
      .pop()
    const language = givenLanguage ?? "plaintext"

    // TODO: add support for better inline vs fenced code detection
    const isFenced = givenLanguage && givenLanguage.length > 0
    return (
      <Code language={language} isFenced={isFenced} {...props}>
        {children as string}
      </Code>
    )
  },

  Emoji,
  Spoiler,
  Figure,
  Figcaption,
  Image,
  SmartVideo,
  YouTubeEmbed,
  SpotifyEmbed,
  Blockquote: ({
    variant,
    children,
  }: BlockquoteProps & {
    // extend from callout because too lazy to separate the logic that processes it with callout
    firstChildIsTitle: "true" | "false" | undefined
  }) => {
    return <Blockquote variant={variant}>{children}</Blockquote>
  },
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
}

export function MDXRenderer({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [
            [
              remarkSmartypants,
              {
                backticks: false,
                ellipses: false,
                quotes: false,
              },
            ],
            [
              remarkSimpleEmoji,
              {
                validate: (name: string) => emojiLookup.get(name as EmojiKey),
                lookup: (name: string) => {
                  const emoji = emojiLookup.get(name as EmojiKey)
                  // NOTE: this should be guranteed due to validate but TS doesn't know that
                  const alt = emoji?.alt
                  if (!alt) {
                    throw new Error(`Emoji alt text not found for name: ${name}`)
                  }
                  return alt
                },
              },
            ],
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
                  if (node.type === "figure") {
                    return "Figure"
                  }

                  // NOTE: I wonder if it's worth investigating around the node so different versions
                  // of figcaption can be rendered if it's preceded by an img vs blockquote
                  // @ts-expect-error: technically we shouldn't be modifying mdxJsxFlowElement
                  if (node.name === "figcaption") {
                    return "Figcaption"
                  }

                  // @ts-expect-error: technically we shouldn't be modifying mdxJsxFlowElement
                  if (node.name === "img") {
                    return "Image"
                  }

                  // @ts-expect-error: technically we shouldn't be modifying mdxJsxFlowElement
                  if (node.name === "video") {
                    return "SmartVideo"
                  }

                  if (node.type === "blockquote") {
                    // @ts-expect-error: seems the node type doesn't account for MdxJsxFlowElements
                    const firstChildText = toString(node.children?.[0] ?? "") // eslint-disable-line @typescript-eslint/no-unsafe-member-access
                    const match = mdxBlockquoteMetaRegex.exec(firstChildText)
                    const [, keyword] = match ?? []
                    const variant = (keyword ?? "").toLowerCase()

                    return isCalloutKeyword(variant) ? "Callout" : "Blockquote"
                  }

                  return null
                },
                elementModifier: (jsxName, element) => {
                  if (["Blockquote", "Callout"].includes(jsxName)) {
                    // @ts-expect-error: we're extracting the element from the auto p tag
                    const possibleHeadingTree = (element.children[0]?.children ??
                      []) as MdastContent[]
                    const possibleHeadingText = toString(possibleHeadingTree)

                    const match = mdxBlockquoteMetaRegex.exec(possibleHeadingText)
                    if (!match) {
                      return element
                    }

                    const [, keyword, partialTitle] = match
                    const variant = keyword?.toLowerCase()

                    const firstChildIsTitle =
                      Boolean(partialTitle) || possibleHeadingTree.length > 1

                    const updatedAttributes = [
                      ...element.attributes,
                      { name: "variant", value: variant },
                      { name: "firstChildIsTitle", value: firstChildIsTitle.toString() },
                    ]
                    if (!firstChildIsTitle) {
                      return createMdxJsxFlowElement(
                        element.name,
                        // @ts-expect-error: seems the types are iffy around mdxJsxFlowElement
                        updatedAttributes,
                        // the first child would have the meta info for the callout
                        element.children.slice(1)
                      )
                    }

                    const titleElement = createMdxJsxFlowElement(
                      null,
                      [],
                      // we remove the variant info from the start of the title and keep the rest
                      [
                        {
                          type: "text",
                          // @ts-expect-error: seems the types are iffy around mdxJsxFlowElement
                          value: partialTitle,
                        },
                        ...possibleHeadingTree.slice(1),
                      ]
                    )

                    return createMdxJsxFlowElement(
                      element.name,
                      // @ts-expect-error: seems the types are iffy around mdxJsxFlowElement
                      updatedAttributes,
                      [titleElement, ...element.children.slice(1)]
                    )
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
          ],
        },
      }}
    />
  )
}
