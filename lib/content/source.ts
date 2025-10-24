import { remarkPrependTopHeading } from "@/lib/mdx-plugins/remark-prepend-top-heading"
import { remarkTocExport, type TocItem } from "@/lib/mdx-plugins/remark-toc-export"
import matter from "gray-matter"
import { remark } from "remark"
import remarkSmartypants from "remark-smartypants"
import { findContentFilesAbsolutePaths, getContentDataByAbsolutePath } from "./fs"
import {
  ContentDataSchema,
  ContentFrontmatterSchema,
  getContentSource,
  type ContentData,
} from "./schema"

export function processMarkdown(content: string) {
  // TODO: possibly rehype with emoji support?
  const computedData = remark()
    .use(remarkSmartypants, {
      backticks: false,
      ellipses: false,
      quotes: false,
    })
    .use(remarkPrependTopHeading, {
      depth: 2,
      text: "Introduction",
      properties: {},
    })
    .use(remarkTocExport, { reservedIds: ["excerpt"] })
    .processSync(content)

  return {
    // NOTE: this is guaranteed because of remarkTocExport
    toc: (computedData?.data?.toc ?? []) as TocItem[],
  }
}

export async function getAllContentData(): Promise<ContentData[]> {
  const contentFileAbsolutePaths = await findContentFilesAbsolutePaths()
  return Promise.all(
    contentFileAbsolutePaths.map(async (filePath) => {
      const { segments, fileContent, slug, baseName, ghSlug, groups } =
        await getContentDataByAbsolutePath(filePath)

      const source = getContentSource(segments)
      const { data: rawFrontmatter, content } = matter(fileContent)
      const frontmatter = ContentFrontmatterSchema.parse({ source, ...rawFrontmatter })

      const { toc } = processMarkdown(content)

      return ContentDataSchema.parse({
        slug: slug,
        source,
        frontmatter,
        computed: {
          baseName,
          ghSlug,
          groups,
          toc,
        },
        content,
      })
    })
  )
}

const _allContentData = await getAllContentData()

export function getCachedAllContentData(): ContentData[] {
  return _allContentData
}

const _allContentDataBySlug = ((data) => {
  const out: Record<string, ContentData> = {}
  data.forEach((contentData) => {
    out[contentData.slug] = contentData
  })
  return out
})(_allContentData)

export function getCachedContentDataBySlug(slug: string): ContentData | null {
  return _allContentDataBySlug[slug] ?? null
}
