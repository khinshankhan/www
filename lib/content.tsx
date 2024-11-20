import fs from "fs"
import path from "path"
import { remarkExcerptExport } from "@/lib/mdx-plugins/remark-excerpt"
import { remarkPrependTopHeading } from "@/lib/mdx-plugins/remark-prepend-top-heading"
import { remarkTocExport, type TocItem } from "@/lib/mdx-plugins/remark-toc-export"
import { ContentFrontmatterSchema, getContentSource } from "@/lib/schemas/content"
import matter from "gray-matter"
import { remark } from "remark"

const projectRoot = process.cwd()
const contentDir = path.join(projectRoot, "content")

export async function getContentDataBySlug(fileSlug: string | string[], basePath = contentDir) {
  const fileSlugParts = Array.isArray(fileSlug) ? fileSlug : [fileSlug]
  const filePath = path.join(basePath, ...fileSlugParts)
  const fileContent = await fs.promises.readFile(filePath, "utf8")
  const { data, content } = matter(fileContent)

  const slug = path
    .join(...fileSlugParts)
    .split("/")
    .slice(0, -1)
    .join("/")
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

  const contentData = {
    slug,
    source,
    frontmatter: parsedFrontmatter,
    computed: {
      baseName: path.basename(filePath),
      toc,
    },
    content,
  }

  return contentData
}
