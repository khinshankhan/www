import fs from "fs"
import path from "path"
import React from "react"
import { typographyVariants } from "@/components/base/typography"
import { SmartLink } from "@/components/composite/smart-link"
import { Toc } from "@/components/section/toc"
import { ContentLayout } from "@/components/template/content-layout"
import { rehypeSectionizeByHeading } from "@/lib/mdx-plugins/rehype-sectionize-by-heading"
import { rehypeSlug } from "@/lib/mdx-plugins/rehype-slug"
import { remarkExcerptExport, remarkMarkFirstParagraph } from "@/lib/mdx-plugins/remark-excerpt"
import { remarkPrependTopHeading } from "@/lib/mdx-plugins/remark-prepend-top-heading"
import { remarkTocExport, type TocItem } from "@/lib/mdx-plugins/remark-toc-export"
import { ContentFrontmatterSchema, getContentSource } from "@/lib/schemas/content"
import { cn } from "@/lib/utils"
import matter from "gray-matter"
import type { MDXComponents } from "mdx/types"
import { MDXRemote } from "next-mdx-remote/rsc"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import { remark } from "remark"

const projectRoot = process.cwd()
const thisDir = path.join(projectRoot, "app", "(content)")

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

  Test: ({ className = "" }) => <div className={cn(className)}>this was a test and you passed</div>,
}

export default async function Page() {
  const filePath = path.join("writings", "todo-remove-test", "playground", "content.md")
  const absFilePath = path.join(thisDir, filePath)
  const fileContent = await fs.promises.readFile(absFilePath, "utf8")
  const { data, content } = matter(fileContent)

  const slug = filePath.split("/").slice(0, -1).join("/")
  const source = getContentSource(slug)

  const computedData = remark()
    .use(remarkExcerptExport)
    .use(remarkPrependTopHeading, {
      depth: 2,
      text: "Introduction",
      properties: {},
    })
    .use(remarkTocExport, { reservedIds: ["excerpt"] })
    .processSync(content)
  // NOTE: this is guaranteed because of remarkExcerptExport
  const excerpt = (computedData?.data?.excerpt ?? "") as string

  // NOTE: this is guaranteed because of remarkTocExport
  const toc = (computedData?.data?.toc ?? []) as TocItem[]

  const parsedFrontmatter = ContentFrontmatterSchema.parse({
    slug,
    excerpt,
    ...data,
  })

  const metadata = {
    slug,
    source,
    content,
    frontmatter: parsedFrontmatter,
    computed: {
      baseName: path.basename(filePath),
      toc,
    },
  }

  console.log({ metadata, toc })

  return (
    <ContentLayout
      title={data.title}
      subtitle={data.subtitle}
      ghPath="/app/(content)/writings/todo-remove-test/playground/content.tsx"
      sidebar={metadata.frontmatter.showToc && <Toc headings={metadata.computed.toc} />}
    >
      <MDXRemote
        source={content}
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
                  // @ts-expect-error: unsure about the types
                  test: (element) => element.properties.id !== "introduction",
                },
              ],
            ],
          },
        }}
      />
    </ContentLayout>
  )
}
