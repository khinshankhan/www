import { remarkPrependTopHeading } from "@/lib/mdx-plugins/remark-prepend-top-heading"
import { remarkTocExport, type TocItem } from "@/lib/mdx-plugins/remark-toc-export"
import matter from "gray-matter"
import { remark } from "remark"
import remarkSmartypants from "remark-smartypants"
import {
  calculateSegmentsFromFilePath,
  calculateSlugFromSegments,
  findContentFilesAbsolutePaths,
  getContentMetaByAbsolutePath,
  type ContentMeta,
} from "./fs"
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
    toc: (computedData.data.toc ?? []) as TocItem[],
  }
}

function getContentDataByContentMeta(contentMeta: ContentMeta): ContentData {
  const { segments, fileContent, slug, baseName, ghSlug, groups } = contentMeta

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
}

export async function getAllContentData(): Promise<ContentData[]> {
  const contentFileAbsolutePaths = await findContentFilesAbsolutePaths()
  const allPossibleContentData = await Promise.all(
    contentFileAbsolutePaths.map(async (filePath) => {
      const contentMeta = await getContentMetaByAbsolutePath(filePath)
      const contentData = getContentDataByContentMeta(contentMeta)
      return contentData
    })
  )

  return allPossibleContentData.sort((a, b) => {
    // Compare by datePublished in descending order
    if (a.frontmatter.datePublished.getTime() !== b.frontmatter.datePublished.getTime()) {
      return b.frontmatter.datePublished.getTime() - a.frontmatter.datePublished.getTime()
    }

    // Compare by priority, from lowest to highest
    if (a.frontmatter.nice !== b.frontmatter.nice) {
      return a.frontmatter.nice - b.frontmatter.nice
    }

    // Compare by dateCreated in descending order
    if (a.frontmatter.dateCreated.getTime() !== b.frontmatter.dateCreated.getTime()) {
      return b.frontmatter.dateCreated.getTime() - a.frontmatter.dateCreated.getTime()
    }

    // Compare by title in reverse alphabetical order
    return b.frontmatter.title.localeCompare(a.frontmatter.title)
  })
}

export async function getContentDataBySlug(slug: string): Promise<ContentData | null> {
  const contentFileAbsolutePaths = await findContentFilesAbsolutePaths()
  const relevantFilePath = contentFileAbsolutePaths.find((filePath) => {
    const segments = calculateSegmentsFromFilePath(filePath)
    const calculatedSlug = calculateSlugFromSegments(segments)
    return calculatedSlug === slug
  })

  if (!relevantFilePath) {
    return null
  }

  const contentMeta = await getContentMetaByAbsolutePath(relevantFilePath)
  const contentData = getContentDataByContentMeta(contentMeta)
  return contentData
}
