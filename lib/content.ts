import fs from "fs"
import path from "path"
import { globSync } from "fast-glob"
import matter from "gray-matter"
import { remark } from "remark"
import { ContentDataSchema, type ContentSource } from "../schemas/content"
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

export function getContentData(filePath: string) {
  const absFilePath = path.join(contentDir, filePath)
  if (!fs.existsSync(absFilePath)) {
    throw new Error(`File path is missing: ${absFilePath}`)
  }

  const fileContent = fs.readFileSync(absFilePath, "utf-8")

  const slug = filePath.split("/").slice(0, -1).join("/")
  const { data, content } = matter(fileContent)

  let computedData = remark().use(remarkExtractFirstParagraph).processSync(content)
  // NOTE: this is guaranteed to be a string because of remarkExtractFirstParagraph
  const excerpt = (computedData?.data?.excerpt ?? "") as string

  const contentData = {
    slug,
    source: getContentSource(slug),
    frontmatter: data,
    computed: {
      excerpt,
    },
    content,
  }

  const parsedContentData = ContentDataSchema.parse(contentData)
  console.log({ parsedContentData })
  return parsedContentData
}

export function getAllContentData(getContentDataFromFilePath = getContentData) {
  const filePaths = globSync(contentPatterns, { cwd: contentDir })
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
