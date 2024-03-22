import fs from "fs"
import path from "path"
import { globbySync } from "globby"
import matter from "gray-matter"
import { remark } from "remark"
import { ContentFrontmatterSchema, type ContentData, type ContentSource } from "../schemas/content"
import { remarkExtractFirstParagraph } from "./mdx-plugins/remark-excerpt"
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

export function getContentData(filePath: string): ContentData {
  const absFilePath = path.join(contentDir, filePath)
  if (!fs.existsSync(absFilePath)) {
    throw new Error(`File path is missing: ${absFilePath}`)
  }

  const fileContent = fs.readFileSync(absFilePath, "utf-8")

  const slug = filePath.split("/").slice(0, -1).join("/")
  const { data, content } = matter(fileContent)

  const computedData = remark().use(remarkExtractFirstParagraph).processSync(content)

  return {
    content,
    slug,
    source: getContentSource(slug),
    computed: {
      // NOTE: this is guaranteed to be a string because of remarkExtractFirstParagraph
      excerpt: (computedData?.data?.excerpt ?? "") as string,
    },
    frontmatter: ContentFrontmatterSchema.parse(data),
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
