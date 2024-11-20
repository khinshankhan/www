import fs from "fs"
import path from "path"
import { remarkExcerptExport } from "@/lib/mdx-plugins/remark-excerpt"
import { remarkPrependTopHeading } from "@/lib/mdx-plugins/remark-prepend-top-heading"
import { remarkTocExport, type TocItem } from "@/lib/mdx-plugins/remark-toc-export"
import {
  ContentDataSchema,
  ContentFrontmatterSchema,
  getContentSource,
} from "@/lib/schemas/content"
import { globby } from "globby"
import matter from "gray-matter"
import { remark } from "remark"

const projectRoot = process.cwd()
const contentDir = path.join(projectRoot, "content")

function resolveFilePath(fileSlug: string | string[], basePath: string): string {
  const fileSlugParts = Array.isArray(fileSlug) ? fileSlug : [fileSlug]
  return path.join(basePath, ...fileSlugParts)
}

function processMarkdown(content: string) {
  const computedData = remark()
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

interface ContentDataProps {
  fileSlug: string | string[]
  basePath?: string
}

export async function getContentDataBySlug({ fileSlug, basePath = contentDir }: ContentDataProps) {
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

  return ContentDataSchema.parse(contentData)
}

// NOTE: we will be able to turn this into `"**/page*.mdx"` when dealing with i18n once i18n support evolves
// eg page.mdx -> english, page.es.mdx -> spanish
const contentPatterns = ["**/*.md", "**/*.mdx"]

interface ListAllContentDataProps {
  basePath?: string
  extPatterns?: string[]
}

export async function listAllContentData({
  basePath = contentDir,
  extPatterns = contentPatterns,
}: ListAllContentDataProps) {
  const fileSlugs = await globby(contentPatterns, { cwd: basePath })

  const allPossibleContentData = await Promise.all(
    fileSlugs.map(async (fileSlug) => {
      return getContentDataBySlug({ fileSlug })
    })
  )

  // TODO: add filtering here
  // TODO: add sorting here

  return allPossibleContentData
}
