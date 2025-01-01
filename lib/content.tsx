import fs from "fs"
import path from "path"
import { remarkExcerptExport } from "@/lib/mdx-plugins/remark-excerpt"
import { remarkPrependTopHeading } from "@/lib/mdx-plugins/remark-prepend-top-heading"
import { remarkTocExport, type TocItem } from "@/lib/mdx-plugins/remark-toc-export"
import {
  ContentDataSchema,
  ContentFrontmatterSchema,
  getContentSource,
  type ContentData,
} from "@/lib/schemas/content"
import { globby } from "globby"
import matter from "gray-matter"
import { remark } from "remark"
import remarkSmartypants from "remark-smartypants"

export const projectRoot = process.cwd()
export const contentDir = path.join(projectRoot, "content")

export function resolveFilePath(
  fileSlug: string | string[],
  basePath: string = contentDir
): string {
  const fileSlugParts = Array.isArray(fileSlug) ? fileSlug : [fileSlug]
  return path.join(basePath, ...fileSlugParts)
}

export function processMarkdown(content: string) {
  // TODO: possibly rehype with emoji support?
  const computedData = remark()
    .use(remarkSmartypants, {
      backticks: false,
      ellipses: false,
      quotes: false,
    })
    .use(remarkExcerptExport)
    .use(remarkPrependTopHeading, {
      depth: 2,
      text: "Introduction",
      properties: {},
    })
    .use(remarkTocExport, { reservedIds: ["excerpt"] })
    .processSync(content)

  return {
    // NOTE: this is guaranteed because of remarkExcerptExport
    excerpt: (computedData?.data?.excerpt ?? "") as string,
    // NOTE: this is guaranteed because of remarkTocExport
    toc: (computedData?.data?.toc ?? []) as TocItem[],
  }
}

interface GetContentDataBySlugProps {
  fileSlug: string | string[]
  basePath?: string
}

type GetContentDataBySlugReturn = Promise<ContentData>

export async function getContentDataBySlug({
  fileSlug,
  basePath = contentDir,
}: GetContentDataBySlugProps): GetContentDataBySlugReturn {
  const filePath = resolveFilePath(fileSlug, basePath)
  const fileContent = await fs.promises.readFile(filePath, "utf8")

  const { data, content } = matter(fileContent)
  const slug = filePath.replace(contentDir, "").split("/").slice(1, -1).join("/")

  const source = getContentSource(slug)

  const { excerpt, toc } = processMarkdown(content)

  const parsedFrontmatter = ContentFrontmatterSchema.parse({
    slug,
    excerpt,
    ...data,
  })

  // probably unnecessary, but just in case the description is not via excerpt and has markdown? Shouldn't be too costly
  const description = processMarkdown(parsedFrontmatter.description).excerpt

  const contentData = {
    slug,
    source,
    frontmatter: {
      ...parsedFrontmatter,
      description,
    },
    computed: {
      baseName: path.basename(filePath),
      toc,
    },
    content,
  }

  return ContentDataSchema.parse(contentData)
}

// NOTE: we will be able to turn this into `"**/page*.mdx"` when dealing with i18n once i18n support evolves
// eg page.mdx -> english, page.es.mdx -> spanish
const contentPatterns = ["**/*.md", "**/*.mdx"]

interface ListAllContentDataProps {
  basePath?: string
  extPatterns?: string[]
  filter?: (data: ContentData) => boolean
}

export async function listAllContentData({
  basePath = contentDir,
  extPatterns = contentPatterns,
  filter = () => true,
}: ListAllContentDataProps) {
  const fileSlugs = await globby(extPatterns, { cwd: basePath })

  const allPossibleContentData = await Promise.all(
    fileSlugs.map(async (fileSlug) => {
      return getContentDataBySlug({ fileSlug })
    })
  )

  // TODO: add sorting here
  const relevantPossibleContentData = allPossibleContentData.filter(filter).sort((a, b) => {
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

  return relevantPossibleContentData
}
