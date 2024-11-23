import React from "react"
import { Code } from "@/components/base/code"
import { Figcaption } from "@/components/base/figure"
import { Image } from "@/components/base/image"
import { Spoiler } from "@/components/base/spoiler"
import { typographyVariants } from "@/components/base/typography"
import { SmartLink } from "@/components/composite/smart-link"
import { Pre } from "@/components/section/pre"
import { Tabbify } from "@/components/section/tabbify"
import { rehypeSectionizeByHeading } from "@/lib/mdx-plugins/rehype-sectionize-by-heading"
import { rehypeSlug } from "@/lib/mdx-plugins/rehype-slug"
import { remarkMarkFirstParagraph } from "@/lib/mdx-plugins/remark-excerpt"
import {
  RemarkJsxifyElementOptions,
  remarkJsxifyElements,
} from "@/lib/mdx-plugins/remark-jsxify-elements"
import { remarkPrependTopHeading } from "@/lib/mdx-plugins/remark-prepend-top-heading"
import { cn } from "@/lib/utils"
import type { MDXComponents } from "mdx/types"
import { MDXRemote } from "next-mdx-remote/rsc"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeMdxCodeProps from "rehype-mdx-code-props"
import remarkGfm from "remark-gfm"

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
  Figcaption,

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

                  // NOTE: I wonder if it's worth investigating around the node so different versions
                  // of figcaption can be rendered if it's preceded by an img vs blockquote
                  // @ts-expect-error: technically we shouldn't be modifying mdxJsxFlowElement
                  if (node?.name === "figcaption") {
                    return "Figcaption"
                  }

                  return null
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
