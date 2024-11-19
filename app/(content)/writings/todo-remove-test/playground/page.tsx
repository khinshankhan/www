import fs from "fs"
import path from "path"
import React from "react"
import { Toc } from "@/components/section/toc"
import { ContentLayout } from "@/components/template/content-layout"
import { MDXRenderer } from "@/components/template/mdx-renderer"
import { remarkExcerptExport } from "@/lib/mdx-plugins/remark-excerpt"
import { remarkPrependTopHeading } from "@/lib/mdx-plugins/remark-prepend-top-heading"
import { remarkTocExport, type TocItem } from "@/lib/mdx-plugins/remark-toc-export"
import { ContentFrontmatterSchema, getContentSource } from "@/lib/schemas/content"
import { cn } from "@/lib/utils"
import matter from "gray-matter"
import { remark } from "remark"

const projectRoot = process.cwd()
const projectDir = path.join(projectRoot)

export default async function Page() {
  const filePath = path.join("content", "writings", "todo-remove-test", "playground", "page.md")
  const absFilePath = path.join(projectDir, filePath)
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

  const showToc = metadata.frontmatter.showToc

  return (
    <ContentLayout
      title={data.title}
      subtitle={data.subtitle}
      ghPath={`/${filePath}`}
      childrenWrappingClass={cn("prose", showToc && "mt-6 xl:mt-2")}
      sidebar={showToc && <Toc headings={metadata.computed.toc} />}
    >
      <MDXRenderer source={content} />
    </ContentLayout>
  )
}
