import React, { Children } from "react"
import { remarkSimpleEmoji } from "@khinshankhan/emoji-helper-remark"
import type { MDXComponents } from "mdx/types"
import { MDXRemote } from "next-mdx-remote/rsc"
import { filter, onlyText } from "react-children-utilities"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeSlug from "rehype-slug"
import { EmojiKey, emojiLookup } from "@/lib/emoji"
import { remarkMarkFirstParagraph } from "@/lib/mdx-plugins/remark-excerpt"
import { remarkJsxifyElements, type MdastNode } from "@/lib/mdx-plugins/remark-jsxify-elements"
import { cn } from "@/lib/utils"
import { Callout, isCalloutKeyword } from "@/components/blocks/callout"
import { Code, Pre } from "@/components/blocks/codeblock"
import { Emoji } from "@/components/emoji"
import { Blockquote } from "@/components/primitives/components"
import { SmartImage } from "@/components/primitives/image"
import { Link } from "@/components/primitives/link"
import { typographyVariants } from "@/components/primitives/typography"
import { Video } from "@/components/primitives/video"

// match blockquotes `> [!variant] heading`
const mdxBlockquoteMetaRegex = /\[!([^\]]+)\]\s*(.*)/

function getBlockquoteInfo(children: React.ReactNode[]) {
  const noMatch = { variant: undefined, heading: undefined, children }
  if (!children?.length || children.length < 1) {
    return noMatch
  }

  const text = onlyText(children[0]).trim()
  const match = mdxBlockquoteMetaRegex.exec(text)
  if (!match) {
    return noMatch
  }

  return {
    variant: match?.[1]?.toLowerCase(),
    heading: match?.[2] || undefined,
    // exclude the first child for callout since it has variant/ heading info
    children: children.slice(1),
  }
}

const baseComponents: MDXComponents = {
  a: ({ href = "#", children = null, ...props }) => (
    <Link href={href} {...props}>
      {children}
    </Link>
  ),
  h3: ({ className = "", ...props }) => (
    <h3 {...props} className={cn(typographyVariants({ variant: "h3", className }))} />
  ),
  h4: ({ className = "", ...props }) => (
    <h4 {...props} className={cn(typographyVariants({ variant: "h4", className }))} />
  ),
  h5: ({ className = "", ...props }) => (
    <h5 {...props} className={cn(typographyVariants({ variant: "h5", className }))} />
  ),
  h6: ({ className = "", ...props }) => (
    <h6 {...props} className={cn(typographyVariants({ variant: "h6", className }))} />
  ),
  blockquote: (props) => {
    // blockquote seems to interweave newlines which mess with interpretting variants
    // though the newline between the meta and actual quotation is necessary
    const givenChildren = filter(Children.toArray(props.children), (child) => child !== "\n")
    const { variant, heading, children } = getBlockquoteInfo(givenChildren)

    if (variant && isCalloutKeyword(variant)) {
      return (
        <Callout variant={variant} heading={heading}>
          <blockquote {...props} data-variant={variant} className="italic">
            {children}
          </blockquote>
        </Callout>
      )
    }

    const blockquoteVariant = variant ?? "blockquote"
    return (
      <Blockquote {...props} data-variant={blockquoteVariant} variant={blockquoteVariant}>
        {children}
      </Blockquote>
    )
  },
  pre: Pre,
  // @ts-ignore: not getting into the weeds of this
  code: Code,
  // @ts-expect-error: all the props are probably compatible, we'll burn that bridge when we get there
  img: SmartImage,
}

const customComponents: MDXComponents = {
  Emoji,
  SmartImage,
  Video,
}

export function MDXContent({
  source,
  components = {},
}: {
  source: string
  components?: MDXComponents
}) {
  const allComponents = { ...baseComponents, ...customComponents, ...components }

  return (
    <MDXRemote
      source={source}
      components={allComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [
            [
              // @ts-expect-error: silly compatibility issue
              remarkSimpleEmoji,
              {
                validate: (name: string) => emojiLookup.get(name as EmojiKey),
                lookup: (name: string) => {
                  const emoji = emojiLookup.get(name as EmojiKey)
                  // NOTE: this should be guranteed due to validate
                  return emoji!.alt
                },
              },
            ],
            // @ts-expect-error: silly compatibility issue
            remarkMarkFirstParagraph,
            [
              // @ts-expect-error: silly compatibility issue
              remarkJsxifyElements,
              {
                elements: [
                  {
                    matcher: (node: MdastNode) =>
                      // @ts-expect-error
                      (node?.name as string) === "img",
                    jsxName: "SmartImage",
                  },
                  {
                    matcher: (node: MdastNode) =>
                      // @ts-expect-error
                      (node?.name as string) === "video",
                    jsxName: "Video",
                  },
                ],
              },
            ],
          ],
          rehypePlugins: [
            rehypeSlug,
            [
              rehypeAutolinkHeadings,
              {
                behavior: "wrap",
                properties: {
                  "data-nav": "true",
                  "data-underline": "false",
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
