import React from "react"
import type { MDXComponents } from "mdx/types"
import { MDXRemote } from "next-mdx-remote/rsc"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import remarkGfm from "remark-gfm"
import remarkUnwrapImages from "remark-unwrap-images"
import { rehypeSlug } from "@/lib/mdx-plugins/rehype-slug"
import { remarkMarkFirstParagraph } from "@/lib/mdx-plugins/remark-except"
import { remarkJsxifyElements, type MdastNode } from "@/lib/mdx-plugins/remark-jsxify-elements"
import { cn } from "@/lib/utils"
import { Code } from "@/components/codeblock"
import { SmartImage } from "@/components/primitives/image"
import { Link } from "@/components/primitives/link"
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
  blockquote: MDXBlockquote,

  // @ts-expect-error: all the props are probably compatible, we'll burn that bridge when we get there
  code: Code,
  // @ts-expect-error: all the props are probably compatible, we'll burn that bridge when we get there
  img: SmartImage,
  video: Video,

  // custom components
  SmartImage,
  Video,
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
            remarkMarkFirstParagraph,
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
          ],
        },
      }}
    />
  )
}
