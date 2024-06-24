import fs from "fs"
import path from "path"
import { globby } from "globby"
import matter from "gray-matter"
import { remark } from "remark"
import { remarkExcerptExport } from "@/lib/mdx-plugins/remark-except"
import { remarkTocExport, type TocItem } from "@/lib/mdx-plugins/remark-toc"
import { existPredicate } from "@/lib/utils"
import {
  ContentFrontmatterSchema,
  getContentSource,
  type ContentData,
  type ContentSource,
} from "../schemas/content"

const projectRoot = process.cwd()
const contentDir = path.join(projectRoot, "content")
// TODO: turn this into `"**/page*.mdx"` when dealing with i18n
// eg page.es.mdx will be spanish
const contentPatterns = ["**/*.md", "**/*.mdx"]

export async function getContentDataByFilePath(filePath: string): Promise<ContentData> {
  const absFilePath = path.join(contentDir, filePath)
  if (!fs.existsSync(absFilePath)) {
    throw new Error(`File path is missing: ${absFilePath}`)
  }

  const fileContent = await fs.promises.readFile(absFilePath, "utf8")

  const slug = filePath.split("/").slice(0, -1).join("/")
  const source = getContentSource(slug)

  const { data, content } = matter(fileContent)

  const computedData = remark()
    .use(remarkExcerptExport)
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

  return {
    slug,
    source,
    content,
    frontmatter: parsedFrontmatter,
    computed: {
      baseName: path.basename(filePath),
      toc,
    },
  }
}

export async function getAllContentData(getContentDataFromFilePath = getContentDataByFilePath) {
  const filePaths = await globby(contentPatterns, { cwd: contentDir })
  const allPossibleContentDataPromises = filePaths.map(async (filePath) => {
    try {
      return getContentDataFromFilePath(filePath)
    } catch (err) {
      return null
    }
  })
  const allPossibleContentData = await Promise.all(allPossibleContentDataPromises)

  const allContentData = allPossibleContentData.filter(existPredicate).sort((a, b) => {
    if (a.frontmatter.datePublished.getTime() !== b.frontmatter.datePublished.getTime()) {
      return a.frontmatter.datePublished.getTime() - b.frontmatter.datePublished.getTime()
    }

    if (a.frontmatter.priority !== b.frontmatter.priority) {
      return a.frontmatter.priority - b.frontmatter.priority
    }

    if (a.frontmatter.dateCreated.getTime() !== b.frontmatter.dateCreated.getTime()) {
      return a.frontmatter.dateCreated.getTime() - b.frontmatter.dateCreated.getTime()
    }

    return a.frontmatter.title.localeCompare(b.frontmatter.title)
  })

  return allContentData
}

export async function getContentDataBySource(source: ContentSource) {
  const contentData = await getAllContentData()
  return contentData.filter((content) => content.source === source)
}
