import fs from "fs"
import path from "path"
import { globbySync } from "globby"
import matter from "gray-matter"
import { remark } from "remark"
import {
  ContentFrontmatterSchema,
  type ContentData,
  type ContentLdType,
  type ContentSource,
} from "../schemas/content"
import { remarkExcerptExport } from "./mdx-plugins/remark-excerpt"
import { remarkTocExport } from "./mdx-plugins/remark-toc"
import { existPredicate } from "./utils"

const projectRoot = process.cwd()
const contentDir = path.join(projectRoot, "content")
// TODO: turn this into `"**/page*.mdx"` when dealing with i18n
// eg page.es.mdx will be spanish
const contentPatterns = ["**/*.md", "**/*.mdx"]

function getContentSource(slug: string): ContentSource {
  if (slug.startsWith("writings")) return "writings"
  if (slug.startsWith("projects")) return "projects"
  return "root"
}

const defaultContentType: Record<ContentSource, ContentLdType> = {
  root: "WebPage",
  writings: "BlogPosting",
  projects: "CollectionPage",
}

const defaultShowToc = {
  root: true,
  writings: true,
  projects: false,
}

export function getContentData(filePath: string): ContentData {
  const absFilePath = path.join(contentDir, filePath)
  if (!fs.existsSync(absFilePath)) {
    throw new Error(`File path is missing: ${absFilePath}`)
  }

  const fileContent = fs.readFileSync(absFilePath, "utf-8")

  const slug = filePath.split("/").slice(0, -1).join("/")
  const source = getContentSource(slug)

  const { data, content } = matter(fileContent)
  const prefilledData = {
    showToc: defaultShowToc[source],
    ...data,
    ld: { type: defaultContentType[source], ...data.ld },
  }

  const computedData = remark().use(remarkExcerptExport).use(remarkTocExport).processSync(content)

  return {
    content,
    slug,
    source,
    computed: {
      // NOTE: this is guaranteed because of remarkExcerptExport
      excerpt: (computedData?.data?.excerpt ?? "") as string,
      // NOTE: this is guaranteed because of remarkTocExport
      toc: (computedData?.data?.toc ?? []) as ContentData["computed"]["toc"],
      baseName: path.basename(filePath),
    },
    frontmatter: ContentFrontmatterSchema.parse(prefilledData),
  }
}

export function getAllContentData(getContentDataFromFilePath = getContentData) {
  const filePaths = globbySync(contentPatterns, { cwd: contentDir })
  const allContentData = filePaths.map((filePath) => {
    try {
      return getContentDataFromFilePath(filePath)
    } catch (err) {
      return null
    }
  })

  const allValidContentData = allContentData.filter(existPredicate)
  return allValidContentData
}

export function getContentDataBySource(source: ContentSource) {
  const contentData = getAllContentData()
  return contentData.filter((content) => content.source === source)
}
