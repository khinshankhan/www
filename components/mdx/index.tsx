import React from "react"
import { remarkSimpleEmoji } from "@khinshankhan/emoji-helper-remark"
import type { MDXComponents } from "mdx/types"
import { MDXRemote } from "next-mdx-remote/rsc"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeMdxCodeProps from "rehype-mdx-code-props"
import remarkGfm from "remark-gfm"
import remarkUnwrapImages from "remark-unwrap-images"
import { EmojiKey, emojiLookup } from "@/lib/emoji"
import { rehypeSlug } from "@/lib/mdx-plugins/rehype-slug"
import { remarkMarkFirstParagraph } from "@/lib/mdx-plugins/remark-excerpt"
import { remarkJsxifyElements, type MdastNode } from "@/lib/mdx-plugins/remark-jsxify-elements"
import { cn } from "@/lib/utils"
import { Codeblock } from "@/components/codeblock"
import { SpotifyEmbed, YouTubeEmbed } from "@/components/embeds"
import { Emoji } from "@/components/emoji"
import { Checkbox } from "@/components/primitives/checkbox"
import { Code, Pre } from "@/components/primitives/code"
import { SmartImage } from "@/components/primitives/image"
import { Link } from "@/components/primitives/link"
import { Spoiler } from "@/components/primitives/spoiler"
import { typographyVariants } from "@/components/primitives/typography"
import { Video } from "@/components/primitives/video"
import { MDXBlockquote } from "./blockquote"

const baseComponents: MDXComponents = {
  a: ({ href = "#", children = null, ...props }) => (
    <Link href={href} {...props}>
      {children}
    </Link>
  ),
  h3: ({ className = "", ...props }) => (
    <h3
      {...props}
      className={cn("scroll-mt-5", typographyVariants({ variant: "h3", className }))}
    />
  ),
  h4: ({ className = "", ...props }) => (
    <h4
      {...props}
      className={cn("scroll-mt-5", typographyVariants({ variant: "h4", className }))}
    />
  ),
  h5: ({ className = "", ...props }) => (
    <h5
      {...props}
      className={cn("scroll-mt-5", typographyVariants({ variant: "h5", className }))}
    />
  ),
  h6: ({ className = "", ...props }) => (
    <h6
      {...props}
      className={cn("scroll-mt-5", typographyVariants({ variant: "h6", className }))}
    />
  ),
  blockquote: MDXBlockquote,
  input: ({ type: checkboxType = "checkbox", checked, disabled, ...props }) => {
    if (checkboxType === "checkbox") {
      return <Checkbox checked={checked} disabled={disabled} />
    }

    return <input type={checkboxType} {...props} />
  },

  code: ({ ref: _ref, children, ...props }) => {
    // surely there's a better way to do this?
    const language =
      props.className
        ?.split(" ")
        .find((c) => c.startsWith("language-"))
        ?.split("language-")
        .pop() || "plaintext"

    // can't find an edge case where children isn't a string so this should be fine?
    return (
      <Code language={language} {...props}>
        {children as string}
      </Code>
    )
  },
  pre: ({ ref: _ref, children, ...props }) => {
    // @ts-expect-error: these are custom props passed to the pre tag
    const { title = undefined, showLineNumbers = undefined, allowCopy = true, ...rest } = props

    // @ts-ignore: it's fine, this is how mdx codeblocks work
    const text = children?.props?.children

    return (
      <Codeblock title={title} text={Boolean(allowCopy) ? text : undefined}>
        <Pre
          {...rest}
          showLineNumbers={showLineNumbers !== undefined}
          start={
            typeof showLineNumbers === "number" || typeof showLineNumbers === "string"
              ? showLineNumbers
              : 1
          }
        >
          {children}
        </Pre>
      </Codeblock>
    )
  },
  // @ts-expect-error: all the props are probably compatible, we'll burn that bridge when we get there
  img: SmartImage,
  video: Video,

  // custom components
  SmartImage,
  Video,
  Spoiler,
  Emoji,
  YouTubeEmbed,
  SpotifyEmbed,
}

// @ts-expect-error
const isImageMdastNode = (node: MdastNode) => node?.type === "image" || node?.name === "img"
// @ts-expect-error
const isVideoMdastNode = (node: MdastNode) => node?.type === "video" || node?.name === "video"

export function MDXContent({
  source,
  components = {},
}: {
  source: string
  components?: MDXComponents
}) {
  const allComponents = { ...baseComponents, ...components }

  return (
    <MDXRemote
      source={source}
      components={allComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [
            remarkGfm,
            [
              remarkJsxifyElements,
              {
                allowModifications: (node: MdastNode) =>
                  [isImageMdastNode, isVideoMdastNode].some((fn) => fn(node)),
                replaceNodeName: (node: MdastNode) => {
                  if (isImageMdastNode(node)) {
                    return "SmartImage"
                  }
                  if (isVideoMdastNode(node)) {
                    return "Video"
                  }

                  return null
                },
              },
            ],
            remarkUnwrapImages,
            [
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
            remarkMarkFirstParagraph,
          ],
          rehypePlugins: [
            [
              rehypeSlug,
              {
                reservedIds: ["excerpt"],
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
